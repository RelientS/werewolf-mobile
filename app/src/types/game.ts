/**
 * 游戏类型定义
 */

export enum Role {
  WEREWOLF = 'werewolf',
  VILLAGER = 'villager',
  SEER = 'seer',
  WITCH = 'witch',
  HUNTER = 'hunter',
  GUARD = 'guard',
  IDIOT = 'idiot',
}

export enum GamePhase {
  WAITING = 'waiting',
  NIGHT = 'night',
  DAY_DISCUSS = 'day_discuss',
  DAY_VOTE = 'day_vote',
  GAME_OVER = 'game_over',
}

export enum NightSubPhase {
  WEREWOLF = 'werewolf',
  GUARD = 'guard',
  SEER = 'seer',
  WITCH = 'witch',
}

export interface Player {
  id: string;
  name: string;
  isAlive: boolean;
  isReady: boolean;
  role?: Role | null;
}

export interface RoleInfo {
  name: string;
  nameEn: string;
  team: 'werewolf' | 'villager';
  description: string;
  descriptionEn: string;
  nightAction: boolean;
  canSeeTeammates: boolean;
}

export interface GameConfig {
  minPlayers: number;
  maxPlayers: number;
  discussionTime: number;
  votingTime: number;
  autoAdvance: boolean;
}

export interface Room {
  id: string;
  name: string;
  config: GameConfig;
  playerCount: number;
  spectatorCount: number;
  phase: GamePhase;
  createdAt: number;
}

export interface GameState {
  phase: GamePhase;
  nightSubPhase?: NightSubPhase | null;
  round: number;
  players: Player[];
  myRole: Role | null;
  roleInfo: RoleInfo | null;
  speeches: Speech[];
  canAct: boolean;
  votes: Record<string, number> | null;
}

export interface Speech {
  playerId: string;
  playerName: string;
  content: string;
  timestamp: number;
}

export interface Message {
  type: string;
  [key: string]: any;
}
