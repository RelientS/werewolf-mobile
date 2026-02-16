import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { gameAPI } from '../utils/api';
import { useGameStore } from '../store/gameStore';

interface HomeScreenProps {
  navigation: any;
}

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isServerOnline, setIsServerOnline] = useState(false);

  const setRoomIdStore = useGameStore((state) => state.setRoomId);
  const setPlayer = useGameStore((state) => state.setPlayer);

  // Check server status on mount
  useEffect(() => {
    checkServer();
  }, []);

  const checkServer = async () => {
    try {
      const online = await gameAPI.healthCheck();
      setIsServerOnline(online);
      if (!online) {
        Alert.alert('服务器离线', '无法连接到游戏服务器，请稍后再试。');
      }
    } catch (error) {
      setIsServerOnline(false);
    }
  };

  const handleQuickStart = async () => {
    if (!playerName.trim()) {
      Alert.alert('提示', '请输入玩家昵称');
      return;
    }

    setIsLoading(true);
    try {
      // Create a new room
      const room = await gameAPI.createRoom(`${playerName} 的房间`);
      setRoomIdStore(room.id);
      
      // Navigate to room
      navigation.navigate('Room', {
        roomId: room.id,
        playerName: playerName.trim(),
      });
    } catch (error: any) {
      Alert.alert('错误', error.message || '创建房间失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinRoom = () => {
    if (!playerName.trim()) {
      Alert.alert('提示', '请输入玩家昵称');
      return;
    }

    if (!roomId.trim()) {
      Alert.alert('提示', '请输入房间 ID');
      return;
    }

    setRoomIdStore(roomId.trim());
    navigation.navigate('Room', {
      roomId: roomId.trim(),
      playerName: playerName.trim(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🐺</Text>
        <Text style={styles.title}>狼人杀</Text>
        <Text style={styles.subtitle}>Werewolf Mobile</Text>
      </View>

      {!isServerOnline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>⚠️ 服务器离线</Text>
          <TouchableOpacity onPress={checkServer} style={styles.retryButton}>
            <Text style={styles.retryText}>重试</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.form}>
        <Text style={styles.label}>玩家昵称</Text>
        <TextInput
          style={styles.input}
          placeholder="输入你的昵称..."
          placeholderTextColor="#95a5a6"
          value={playerName}
          onChangeText={setPlayerName}
          maxLength={20}
        />

        <Text style={styles.label}>房间 ID（加入房间时需要）</Text>
        <TextInput
          style={styles.input}
          placeholder="输入房间 ID..."
          placeholderTextColor="#95a5a6"
          value={roomId}
          onChangeText={setRoomId}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleQuickStart}
          disabled={isLoading || !isServerOnline}
        >
          {isLoading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>🚀 快速开始</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleJoinRoom}
          disabled={isLoading || !isServerOnline}
        >
          <Text style={styles.buttonText}>🚪 加入房间</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          与 AI 玩家一起玩狼人杀
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#95a5a6',
  },
  offlineBanner: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offlineText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  retryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#c0392b',
    borderRadius: 4,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  form: {
    marginBottom: 30,
  },
  label: {
    color: '#ffffff',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#2a2a3e',
    color: '#ffffff',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3a3a4e',
  },
  buttons: {
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#ffd700',
  },
  secondaryButton: {
    backgroundColor: '#3a3a4e',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#95a5a6',
    fontSize: 14,
  },
});
