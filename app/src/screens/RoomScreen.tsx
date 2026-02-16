import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useWebSocket } from '../hooks/useWebSocket';
import { useGameStore } from '../store/gameStore';
import { PlayerCard } from '../components/PlayerCard';
import { GamePhase } from '../types/game';

interface RoomScreenProps {
  navigation: any;
  route: any;
}

export function RoomScreen({ navigation, route }: RoomScreenProps) {
  const { roomId, playerName } = route.params;
  const [isReady, setIsReady] = useState(false);

  const gameState = useGameStore((state) => state.gameState);
  const playerId = useGameStore((state) => state.playerId);

  const {
    isConnected,
    isConnecting,
    error,
    setReady,
    startGame,
  } = useWebSocket({
    roomId,
    playerName,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('连接错误', error);
    }
  }, [error]);

  // Navigate to game screen when game starts
  useEffect(() => {
    if (gameState?.phase === GamePhase.NIGHT || 
        gameState?.phase === GamePhase.DAY_DISCUSS ||
        gameState?.phase === GamePhase.DAY_VOTE) {
      navigation.replace('Game', { roomId, playerName });
    }
  }, [gameState?.phase]);

  const handleReadyToggle = () => {
    setReady(!isReady);
    setIsReady(!isReady);
  };

  const handleStartGame = () => {
    const playerCount = gameState?.players.length || 0;
    if (playerCount < 6) {
      Alert.alert('人数不足', '至少需要 6 名玩家才能开始游戏');
      return;
    }

    Alert.alert(
      '开始游戏',
      '确定要开始游戏吗？',
      [
        { text: '取消', style: 'cancel' },
        { text: '开始', onPress: () => startGame() },
      ]
    );
  };

  if (isConnecting) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#ffd700" />
        <Text style={styles.loadingText}>连接中...</Text>
      </View>
    );
  }

  if (!isConnected) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorText}>连接失败</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>返回</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const players = gameState?.players || [];
  const readyCount = players.filter(p => p.isReady).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>房间: {roomId}</Text>
        <Text style={styles.subtitle}>
          玩家: {players.length} | 准备: {readyCount}/{players.length}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          💡 至少需要 6 名玩家才能开始游戏
        </Text>
        <Text style={styles.infoText}>
          📢 所有玩家准备后，房主可以开始游戏
        </Text>
      </View>

      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlayerCard player={item} showRole={false} />
        )}
        style={styles.playerList}
        contentContainerStyle={styles.playerListContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>等待玩家加入...</Text>
          </View>
        }
      />

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.button,
            isReady ? styles.readyButton : styles.unreadyButton,
          ]}
          onPress={handleReadyToggle}
        >
          <Text style={styles.buttonText}>
            {isReady ? '✅ 已准备' : '⏸️ 准备'}
          </Text>
        </TouchableOpacity>

        {players[0]?.id === playerId && (
          <TouchableOpacity
            style={[
              styles.button,
              styles.startButton,
              (players.length < 6 || readyCount < players.length) && styles.disabledButton,
            ]}
            onPress={handleStartGame}
            disabled={players.length < 6 || readyCount < players.length}
          >
            <Text style={styles.buttonText}>🎮 开始游戏</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
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
    padding: 20,
    backgroundColor: '#2a2a3e',
    borderBottomWidth: 2,
    borderBottomColor: '#ffd700',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#95a5a6',
  },
  info: {
    padding: 16,
    backgroundColor: '#2a2a3e',
    margin: 16,
    borderRadius: 8,
  },
  infoText: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 4,
  },
  playerList: {
    flex: 1,
  },
  playerListContent: {
    padding: 16,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#95a5a6',
    fontSize: 16,
  },
  actions: {
    padding: 16,
    backgroundColor: '#2a2a3e',
    borderTopWidth: 1,
    borderTopColor: '#3a3a4e',
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  unreadyButton: {
    backgroundColor: '#3a3a4e',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  readyButton: {
    backgroundColor: '#2ecc71',
  },
  startButton: {
    backgroundColor: '#ffd700',
  },
  disabledButton: {
    backgroundColor: '#555',
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 16,
  },
  errorEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 18,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#3a3a4e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
