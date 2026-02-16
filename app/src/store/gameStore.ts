import { create } from 'zustand';
import { Room, GameState, Player, Speech, Role, GamePhase } from '../types/game';

interface GameStore {
  // Room state
  roomId: string | null;
  room: Room | null;
  
  // Player state
  playerId: string | null;
  playerName: string | null;
  
  // Game state
  gameState: GameState | null;
  
  // Messages
  messages: Speech[];
  
  // Connection state
  isConnected: boolean;
  
  // Actions
  setRoom: (room: Room) => void;
  setRoomId: (roomId: string) => void;
  setPlayer: (playerId: string, playerName: string) => void;
  setGameState: (gameState: GameState) => void;
  addMessage: (message: Speech) => void;
  clearMessages: () => void;
  setConnected: (connected: boolean) => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  // Initial state
  roomId: null,
  room: null,
  playerId: null,
  playerName: null,
  gameState: null,
  messages: [],
  isConnected: false,
  
  // Actions
  setRoom: (room) => set({ room }),
  
  setRoomId: (roomId) => set({ roomId }),
  
  setPlayer: (playerId, playerName) => set({ playerId, playerName }),
  
  setGameState: (gameState) => set({ gameState }),
  
  addMessage: (message) => 
    set((state) => ({ 
      messages: [...state.messages, message].slice(-50) // Keep last 50 messages
    })),
  
  clearMessages: () => set({ messages: [] }),
  
  setConnected: (connected) => set({ isConnected: connected }),
  
  reset: () => set({
    roomId: null,
    room: null,
    playerId: null,
    playerName: null,
    gameState: null,
    messages: [],
    isConnected: false,
  }),
}));
