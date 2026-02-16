import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Player, Role } from '../types/game';

interface PlayerCardProps {
  player: Player;
  showRole?: boolean;
  selected?: boolean;
  onPress?: () => void;
}

const ROLE_EMOJI: Record<Role, string> = {
  [Role.WEREWOLF]: '🐺',
  [Role.VILLAGER]: '👤',
  [Role.SEER]: '🔮',
  [Role.WITCH]: '🧪',
  [Role.HUNTER]: '🔫',
  [Role.GUARD]: '🛡️',
  [Role.IDIOT]: '🤡',
};

const ROLE_NAMES: Record<Role, string> = {
  [Role.WEREWOLF]: '狼人',
  [Role.VILLAGER]: '平民',
  [Role.SEER]: '预言家',
  [Role.WITCH]: '女巫',
  [Role.HUNTER]: '猎人',
  [Role.GUARD]: '守卫',
  [Role.IDIOT]: '白痴',
};

export function PlayerCard({ player, showRole, selected, onPress }: PlayerCardProps) {
  const emoji = player.role && showRole ? ROLE_EMOJI[player.role] : '❓';
  const roleName = player.role && showRole ? ROLE_NAMES[player.role] : '未知';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !player.isAlive && styles.dead,
        selected && styles.selected,
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.info}>
          <Text style={styles.name}>{player.name}</Text>
          {showRole && player.role && (
            <Text style={styles.role}>{roleName}</Text>
          )}
        </View>
      </View>
      
      {!player.isAlive && (
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>💀 已死亡</Text>
        </View>
      )}
      
      {player.isReady && player.isAlive && (
        <View style={[styles.statusBadge, styles.readyBadge]}>
          <Text style={styles.statusText}>✅ 已准备</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a3e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: '#ffd700',
    backgroundColor: '#3a3a4e',
  },
  dead: {
    opacity: 0.5,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 32,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#95a5a6',
  },
  statusBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  readyBadge: {
    backgroundColor: '#2ecc71',
  },
  statusText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
});
