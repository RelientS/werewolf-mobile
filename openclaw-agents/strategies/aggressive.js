/**
 * 激进型策略 - 强势发言，快速下判断
 */
export class AggressiveStrategy {
  constructor() {
    this.target = null; // 锁定的目标
    this.accusations = [];
  }

  decideNightAction(gameState) {
    const { myRole, alivePlayers } = gameState;

    switch (myRole) {
      case 'werewolf':
        // 优先杀掉发言最多的玩家
        return this.findMostTalkative(alivePlayers);
      
      case 'seer':
        // 查验自己怀疑的目标
        return this.target || this.pickRandomTarget(alivePlayers);
      
      case 'doctor':
        // 救自己
        return 'self';
      
      default:
        return null;
    }
  }

  generateSpeech(gameState) {
    const { phase, alivePlayers, lastNightResult } = gameState;

    if (phase === 'day_discussion') {
      // 强势发言，直接指认
      if (!this.target || !alivePlayers.find(p => p.id === this.target)) {
        this.target = this.pickRandomTarget(alivePlayers);
      }

      const phrases = [
        `我强烈建议投 ${this.getPlayerName(this.target)}！`,
        `${this.getPlayerName(this.target)} 的发言明显有问题，我认为就是他！`,
        `不用再讨论了，直接投 ${this.getPlayerName(this.target)}！`,
        `我百分百确定 ${this.getPlayerName(this.target)} 有问题！`,
      ];

      if (lastNightResult?.killed) {
        phrases.push(`昨晚 ${lastNightResult.killed.name} 被杀，凶手肯定是 ${this.getPlayerName(this.target)}！`);
      }

      return phrases[Math.floor(Math.random() * phrases.length)];
    }

    return null;
  }

  decideVote(gameState) {
    // 坚持投自己锁定的目标
    return this.target;
  }

  findMostTalkative(players) {
    // 简化：随机选择（实际应该统计发言次数）
    return this.pickRandomTarget(players);
  }

  pickRandomTarget(players) {
    const validPlayers = players.filter(p => p.id !== 'self');
    return validPlayers[Math.floor(Math.random() * validPlayers.length)]?.id;
  }

  getPlayerName(playerId) {
    return `Player_${playerId}`;
  }
}
