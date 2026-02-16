/**
 * 谨慎型策略 - 不轻易表态，观察为主
 */
export class CautiousStrategy {
  constructor() {
    this.observations = [];
    this.trustMap = new Map(); // playerId -> trust level
  }

  decideNightAction(gameState) {
    const { myRole, alivePlayers } = gameState;

    switch (myRole) {
      case 'werewolf':
        // 选择一个随机目标，避免暴露策略
        return this.pickRandomTarget(alivePlayers);
      
      case 'seer':
        // 查验说话最少的玩家（可能隐藏身份）
        return this.findQuietestPlayer(alivePlayers);
      
      case 'doctor':
        // 救自己或随机
        return Math.random() > 0.5 ? 'self' : this.pickRandomTarget(alivePlayers);
      
      default:
        return null;
    }
  }

  generateSpeech(gameState) {
    const { phase, round } = gameState;

    if (phase === 'day_discussion') {
      // 谨慎发言，不轻易下结论
      const phrases = [
        '我还需要更多信息才能做判断。',
        '目前还不太清楚，继续观察吧。',
        '我同意大家的看法，先听听其他人怎么说。',
        '这一轮信息太少，我倾向于弃票。',
      ];
      
      // 前期更谨慎，后期稍微主动
      if (round > 3) {
        phrases.push('根据前面几轮，我觉得可以考虑...');
      }
      
      return phrases[Math.floor(Math.random() * phrases.length)];
    }

    return null;
  }

  decideVote(gameState) {
    const { alivePlayers, votes } = gameState;

    // 跟随大多数人的投票
    if (votes && votes.length > 0) {
      const voteCount = new Map();
      votes.forEach(v => {
        voteCount.set(v.target, (voteCount.get(v.target) || 0) + 1);
      });

      const sorted = Array.from(voteCount.entries()).sort((a, b) => b[1] - a[1]);
      return sorted[0]?.[0];
    }

    // 如果没人投票，弃票或随机
    return Math.random() > 0.7 ? null : this.pickRandomTarget(alivePlayers);
  }

  pickRandomTarget(players) {
    const validPlayers = players.filter(p => p.id !== 'self');
    return validPlayers[Math.floor(Math.random() * validPlayers.length)]?.id;
  }

  findQuietestPlayer(players) {
    // 简化：随机选择
    return this.pickRandomTarget(players);
  }
}
