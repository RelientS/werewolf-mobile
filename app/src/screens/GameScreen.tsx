import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useGameStore } from '../store/gameStore';
import { PlayerCard } from '../components/PlayerCard';
import { GamePhase, Role } from '../types/game';
import { useWebSocket } from '../hooks/useWebSocket';

interface GameScreenProps {
  navigation: any;
  route: any;
}

const PHASE_NAMES = {
  [GamePhase.NIGHT]: '🌙 夜晚',
  [GamePhase.DAY_DISCUSS]: '☀️ 白天讨论',
  [GamePhase.DAY_VOTE]: '🗳️ 投票阶段',
  [GamePhase.GAME_OVER]: '🏁 游戏结束',
  [GamePhase.WAITING]: '⏸️ 等待中',
};

export function GameScreen({ navigation, route }: GameScreenProps) {
  const { roomId, playerName } = route.params;
  const gameState = useGameStore((state) => state.gameState);
  const messages = useGameStore((state) => state.messages);

  const { nightAction, vote, speak } = useWebSocket({
    roomId,
    playerName,
  });

  if (!gameState) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  const phaseName = PHASE_NAMES[gameState.phase] || '未知';
  const myPlayer = gameState.players.find(p => p.role);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.phaseText}>{phaseName}</Text>
        <Text style={styles.roundText}>第 {gameState.round} 天</Text>
        {myPlayer && gameState.myRole && (
          <Text style={styles.roleText}>
            你的角色: {getRoleEmoji(gameState.myRole)} {getRoleName(gameState.myRole)}
          </Text>
        )}
      </View>

      {/* Players */}
      <View style={styles.playersSection}>
        <Text style={styles.sectionTitle}>存活玩家</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.playersRow}>
            {gameState.players
              .filter(p => p.isAlive)
              .map(player => (
                <View key={player.id} style={styles.miniCard}>
                  <Text style={styles.miniEmoji}>
                    {player.role && shouldShowRole(gameState.myRole, player.role)
                      ? getRoleEmoji(player.role)
                      : '❓'}
                  </Text>
                  <Text style={styles.miniName} numberOfLines={1}>
                    {player.name}
                  </Text>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>

      {/* Messages */}
      <View style={styles.messagesSection}>
        <Text style={styles.sectionTitle}>消息</Text>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => `${item.timestamp}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.message}>
              <Text style={styles.messageName}>{item.playerName}:</Text>
              <Text style={styles.messageContent}>{item.content}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>暂无消息</Text>
          }
        />
      </View>

      {/* Actions */}
      {gameState.canAct && (
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>你的行动</Text>
          {renderActions(gameState.phase, gameState.myRole, gameState.players, nightAction, vote)}
        </View>
      )}
    </View>
  );
}

function getRoleEmoji(role: Role): string {
  const EMOJIS: Record<Role, string> = {
    [Role.WEREWOLF]: '🐺',
    [Role.VILLAGER]: '👤',
    [Role.SEER]: '🔮',
    [Role.WITCH]: '🧪',
    [Role.HUNTER]: '🔫',
    [Role.GUARD]: '🛡️',
    [Role.IDIOT]: '🤡',
  };
  return EMOJIS[role] || '❓';
}

function getRoleName(role: Role): string {
  const NAMES: Record<Role, string> = {
    [Role.WEREWOLF]: '狼人',
    [Role.VILLAGER]: '平民',
    [Role.SEER]: '预言家',
    [Role.WITCH]: '女巫',
    [Role.HUNTER]: '猎人',
    [Role.GUARD]: '守卫',
    [Role.IDIOT]: '白痴',
  };
  return NAMES[role] || '未知';
}

function shouldShowRole(myRole: Role | null, otherRole: Role): boolean {
  // Werewolves can see each other
  if (myRole === Role.WEREWOLF && otherRole === Role.WEREWOLF) {
    return true;
  }
  return false;
}

function renderActions(
  phase: GamePhase,
  myRole: Role | null,
  players: any[],
  nightAction: (action: string, targetId: string) => void,
  vote: (targetId: string) => void
) {
  if (phase === GamePhase.NIGHT) {
    return (
      <View style={styles.actions}>
        <Text style={styles.actionsHint}>选择一个目标</Text>
        {players.filter(p => p.isAlive).map(player => (
          <TouchableOpacity
            key={player.id}
            style={styles.actionButton}
            onPress={() => nightAction('action', player.id)}
          >
            <Text style={styles.actionButtonText}>
              选择 {player.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (phase === GamePhase.DAY_VOTE) {
    return (
      <View style={styles.actions}>
        <Text style={styles.actionsHint}>投票放逐一名玩家</Text>
        {players.filter(p => p.isAlive).map(player => (
          <TouchableOpacity
            key={player.id}
            style={styles.actionButton}
            onPress={() => vote(player.id)}
          >
            <Text style={styles.actionButtonText}>
              投票给 {player.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    backgroundColor: '#2a2a3e',
    borderBottomWidth: 2,
    borderBottomColor: '#ffd700',
  },
  phaseText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 4,
  },
  roundText: {
    fontSize: 14,
    color: '#95a5a6',
    marginBottom: 8,
  },
  roleText: {
    fontSize: 16,
    color: '#ffffff',
  },
  playersSection: {
    padding: 16,
    backgroundColor: '#2a2a3e',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  playersRow: {
    flexDirection: 'row',
    gap: 12,
  },
  miniCard: {
    width: 80,
    alignItems: 'center',
    backgroundColor: '#3a3a4e',
    padding: 12,
    borderRadius: 8,
  },
  miniEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  miniName: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
  },
  messagesSection: {
    flex: 1,
    padding: 16,
  },
  message: {
    backgroundColor: '#2a2a3e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  messageName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 4,
  },
  messageContent: {
    fontSize: 14,
    color: '#ffffff',
  },
  emptyText: {
    color: '#95a5a6',
    fontSize: 14,
    textAlign: 'center',
    padding: 20,
  },
  actionsSection: {
    padding: 16,
    backgroundColor: '#2a2a3e',
    borderTopWidth: 1,
    borderTopColor: '#3a3a4e',
  },
  actions: {
    gap: 8,
  },
  actionsHint: {
    fontSize: 14,
    color: '#95a5a6',
    marginBottom: 8,
  },
  actionButton: {
    backgroundColor: '#ffd700',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
