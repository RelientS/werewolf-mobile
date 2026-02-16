import axios from 'axios';
import { Room } from '../types/game';

const API_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const gameAPI = {
  // Get room list
  getRooms: async (): Promise<Room[]> => {
    const response = await api.get('/api/rooms');
    return response.data.rooms;
  },

  // Create a room
  createRoom: async (name: string): Promise<Room> => {
    const response = await api.post('/api/rooms', { name });
    return response.data.room;
  },

  // Get room details
  getRoom: async (roomId: string): Promise<Room> => {
    const response = await api.get(`/api/rooms/${roomId}`);
    return response.data.room;
  },

  // Delete room
  deleteRoom: async (roomId: string): Promise<boolean> => {
    const response = await api.delete(`/api/rooms/${roomId}`);
    return response.data.deleted;
  },

  // Health check
  healthCheck: async (): Promise<boolean> => {
    try {
      const response = await api.get('/health');
      return response.data.status === 'ok';
    } catch {
      return false;
    }
  },
};
