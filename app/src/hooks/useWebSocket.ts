import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGameStore } from '../store/gameStore';

const WS_URL = 'ws://localhost:4000/ws';

interface UseWebSocketProps {
  roomId: string;
  playerName: string;
  onMessage?: (data: any) => void;
}

export function useWebSocket({ roomId, playerName, onMessage }: UseWebSocketProps) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const setConnected = useGameStore((state) => state.setConnected);
  const setPlayer = useGameStore((state) => state.setPlayer);
  const setGameState = useGameStore((state) => state.setGameState);
  const addMessage = useGameStore((state) => state.addMessage);

  useEffect(() => {
    if (!roomId || !playerName) return;

    setIsConnecting(true);
    setError(null);

    // Create socket connection
    const url = `${WS_URL}?roomId=${encodeURIComponent(roomId)}&name=${encodeURIComponent(playerName)}&role=player`;
    
    console.log(`[WebSocket] Connecting to ${url}`);
    
    const socket = io(WS_URL, {
      query: {
        roomId,
        name: playerName,
        role: 'player',
      },
      transports: ['websocket'],
    });

    socketRef.current = socket;

    // Connection events
    socket.on('connect', () => {
      console.log('[WebSocket] Connected');
      setConnected(true);
      setIsConnecting(false);
    });

    socket.on('disconnect', () => {
      console.log('[WebSocket] Disconnected');
      setConnected(false);
    });

    socket.on('connect_error', (err) => {
      console.error('[WebSocket] Connection error:', err);
      setError(err.message);
      setIsConnecting(false);
    });

    // Game events
    socket.on('init', (data) => {
      console.log('[WebSocket] Init:', data);
      setPlayer(data.playerId, playerName);
      if (data.state) {
        setGameState(data.state);
      }
    });

    socket.on('state_update', (data) => {
      console.log('[WebSocket] State update:', data);
      setGameState(data);
    });

    socket.on('game_started', (data) => {
      console.log('[WebSocket] Game started:', data);
      if (data.state) {
        setGameState(data.state);
      }
    });

    socket.on('speech', (data) => {
      console.log('[WebSocket] Speech:', data);
      addMessage({
        playerId: data.playerId,
        playerName: data.playerName,
        content: data.content,
        timestamp: Date.now(),
      });
    });

    socket.on('game_over', (data) => {
      console.log('[WebSocket] Game over:', data);
      if (data.state) {
        setGameState(data.state);
      }
    });

    // Custom message handler
    if (onMessage) {
      socket.onAny((eventName, ...args) => {
        onMessage({ type: eventName, data: args[0] });
      });
    }

    // Cleanup
    return () => {
      console.log('[WebSocket] Disconnecting');
      socket.disconnect();
    };
  }, [roomId, playerName]);

  // Helper functions
  const sendMessage = (event: string, data?: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    } else {
      console.warn('[WebSocket] Cannot send message: not connected');
    }
  };

  const setReady = (ready: boolean) => {
    sendMessage(ready ? 'ready' : 'unready');
  };

  const startGame = () => {
    sendMessage('start_game');
  };

  const speak = (content: string) => {
    sendMessage('speak', { content });
  };

  const vote = (targetId: string) => {
    sendMessage('vote', { targetId });
  };

  const nightAction = (action: string, targetId: string) => {
    sendMessage('night_action', { action, targetId });
  };

  return {
    isConnected: useGameStore((state) => state.isConnected),
    isConnecting,
    error,
    sendMessage,
    setReady,
    startGame,
    speak,
    vote,
    nightAction,
  };
}
