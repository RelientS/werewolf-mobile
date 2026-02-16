/**
 * 中立型策略 - 平衡各方意见，寻求共识
 */
export class NeutralStrategy {
  constructor() {
    this.alliances = new Map(); // playerId -> alliance score
  }

  decideNightAction(gameState) {
    const { myRole, alivePlayers, votes } = gameState;

    switch (myRole) {
      case 'werewolf':
        // 杀掉投票最分散的玩家（制造混乱）
        return this.findMostControversial(alivePlayers, votes);
      
      case 'seer':
        // 查验中立玩家（容易被忽视的）
        return this.findMostNeutral(alivePlayers);
      
      case 'doctor':
        // 救可能被杀的玩家
        return this.findMostVulnerable(alivePlayers);
      
      default:
        return null;
    }
  }

  generateSpeech(gameState) {
    const { phase, alivePlayers } = gameState;

    if (phase === 'day_discussion') {
      const phrases = [
        '我们需要冷静分析，不要被情绪左右。',
        '两边的观点都有道理，我们综合一下。',
        '与其争论，不如先整理一下线索。',
        '大家说的都有一定道理，我倾向于寻求共识。',
        '我觉得我们应该平衡各方面的信息。',
      ];

      return phrases[Math.floor(Math.random() * phrases.length)];
    }

    return null;
  }

  decideVote(gameState) {
    const { alivePlayers, votes } = gameState;

    // 投票给得票第二多的玩家（平衡局势）
    if (votes && votes.length > 0) {
      const voteCount = new Map();
      votes.forEach(v => {
        voteCount.set(v.target, (voteCount.get(v.target) || 0) + 1);
      });

      const sorted = Array.from(voteCount.entries()).sort((a, b) => b[1] - a[1]);
      
      // 如果有明显领先的，投第二名
      if (sorted.length > 1 && sorted[0][1] > sorted[1][1] + 1) {
        return sorted[1][0];
      }
      
      // 否则跟随大多数
      return sorted[0]?.[0];
    }

    // 随机投票
    return this.pickRandomTarget(alivePlayers);
  }

  findMostControversial(players, votes) {
    // 简化：随机选择
    return this.pickRandomTarget(players);
  }

  findMostNeutral(players) {
    // 简化：随机选择
    return this.pickRandomTarget(players);
  }

  findMostVulnerable(players) {
    // 简化：随机选择
    return this.pickRandomTarget(players);
  }

  pickRandomTarget(players) {
    const validPlayers = players.filter(p => p.id !== 'self');
    return validPlayers[Math.floor(Math.random() * validPlayers.length)]?.id;
  }
}
