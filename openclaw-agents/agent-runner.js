import 'dotenv/config';
import { WerewolfAgent } from 'werewolf-agent-sdk';
import { DetectiveStrategy, CautiousStrategy, AggressiveStrategy, NeutralStrategy } from './strategies/index.js';

// AI 性格配置
const AI_PERSONALITIES = [
  {
    name: '福尔摩斯',
    emoji: '🕵️',
    strategy: new DetectiveStrategy(),
    talkFrequency: 0.8,
    description: '逻辑严密的侦探型玩家',
  },
  {
    name: '沉默者',
    emoji: '🤐',
    strategy: new CautiousStrategy(),
    talkFrequency: 0.3,
    description: '谨慎观察，不轻易表态',
  },
  {
    name: '战狼',
    emoji: '⚔️',
    strategy: new AggressiveStrategy(),
    talkFrequency: 0.9,
    description: '强势激进，快速下判断',
  },
  {
    name: '和平使者',
    emoji: '🕊️',
    strategy: new NeutralStrategy(),
    talkFrequency: 0.6,
    description: '寻求平衡，调和矛盾',
  },
];

// 从环境变量或默认值获取配置
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';
const ROOM_ID = process.env.ROOM_ID || 'default-room';
const NUM_AGENTS = parseInt(process.env.NUM_AGENTS || '4');

console.log('🤖 Starting OpenClaw Werewolf Agents...');
console.log(`📍 Backend: ${BACKEND_URL}`);
console.log(`🏠 Room: ${ROOM_ID}`);
console.log(`👥 Number of agents: ${NUM_AGENTS}`);

// 启动 AI 代理
const agents = [];

async function startAgents() {
  for (let i = 0; i < NUM_AGENTS; i++) {
    const personality = AI_PERSONALITIES[i % AI_PERSONALITIES.length];
    
    const agent = new WerewolfAgent({
      name: `${personality.emoji} ${personality.name}${i > 3 ? ` ${Math.floor(i/4)+1}` : ''}`,
      roomId: ROOM_ID,
      serverUrl: BACKEND_URL,
      strategy: personality.strategy,
      talkFrequency: personality.talkFrequency,
    });

    try {
      await agent.connect();
      agents.push(agent);
      
      console.log(`✅ ${agent.name} connected`);
      
      // 监听游戏事件
      agent.on('game_started', ({ role }) => {
        console.log(`🎮 ${agent.name} role: ${role}`);
      });

      agent.on('game_over', ({ winner, reason }) => {
        console.log(`🏁 Game Over! Winner: ${winner.team} - ${reason}`);
      });

      agent.on('error', (error) => {
        console.error(`❌ ${agent.name} error:`, error.message);
      });

      // 自动准备
      setTimeout(() => {
        agent.setReady(true);
        console.log(`🟢 ${agent.name} is ready`);
      }, 1000 * (i + 1)); // 错开准备时间

    } catch (error) {
      console.error(`❌ Failed to start ${personality.name}:`, error.message);
    }
  }

  console.log(`\n🎉 All ${agents.length} agents started successfully!\n`);
}

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down agents...');
  agents.forEach(agent => agent.disconnect());
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down agents...');
  agents.forEach(agent => agent.disconnect());
  process.exit(0);
});

// 启动
startAgents().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
