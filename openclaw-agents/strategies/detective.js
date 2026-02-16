/**
 * 侦探型策略 - 逻辑严密，擅长推理
 */
export class DetectiveStrategy {
  constructor() {
    this.suspicionMap = new Map(); // playerId -> suspicion level (0-100)
    this.observations = []; // 观察记录
  }

  /**
   * 夜间行动决策
   */
  decideNightAction(gameState) {
    const { myRole, alivePlayers, history } = gameState;

    switch (myRole) {
      case 'werewolf':
        // 狼人：优先杀掉发言最有逻辑的玩家（可能是预言家）
        return this.findMostLogicalPlayer(alivePlayers, history);
      
      case 'seer':
        // 预言家：查验最可疑的玩家
        return this.findMostSuspicious(alivePlayers);
      
      case 'doctor':
        // 医生：救最有价值的玩家（发言多且逻辑强的）
        return this.findMostValuable(alivePlayers, history);
      
      default:
        return null;
    }
  }

  /**
   * 白天发言内容生成
   */
  generateSpeech(gameState) {
    const { phase, lastNightResult, myRole } = gameState;

    if (phase === 'day_discussion') {
      // 基于逻辑推理发言
      if (lastNightResult?.killed) {
        const killed = lastNightResult.killed;
        return `昨晚 ${killed.name} 被杀了，根据之前的发言，我怀疑 ${this.getMostSuspicious().name}，因为他在第 ${this.getInconsistentRound()} 轮的发言有矛盾。`;
      }
      
      // 总结发言
      return this.summarizeObservations();
    }

    return null;
  }

  /**
   * 投票决策
   */
  decideVote(gameState) {
    const { alivePlayers } = gameState;
    
    // 投给最可疑的玩家
    const mostSuspicious = this.findMostSuspicious(alivePlayers);
    
    return mostSuspicious?.id;
  }

  /**
   * 更新怀疑度
   */
  updateSuspicion(playerId, delta, reason) {
    const current = this.suspicionMap.get(playerId) || 50;
    const newValue = Math.max(0, Math.min(100, current + delta));
    this.suspicionMap.set(playerId, newValue);
    
    this.observations.push({
      playerId,
      suspicion: newValue,
      reason,
      timestamp: Date.now(),
    });
  }

  /**
   * 分析发言逻辑性
   */
  analyzeLogic(speech) {
    const logicKeywords = ['因为', '所以', '根据', '推理', '证据', '昨晚'];
    const hasLogic = logicKeywords.some(kw => speech.includes(kw));
    return hasLogic ? 0.8 : 0.3;
  }

  /**
   * 找到最有逻辑的玩家
   */
  findMostLogicalPlayer(players, history) {
    let maxLogic = 0;
    let target = players[0];

    for (const player of players) {
      const speeches = history.filter(h => h.playerId === player.id && h.type === 'speech');
      const avgLogic = speeches.reduce((sum, s) => sum + this.analyzeLogic(s.content), 0) / (speeches.length || 1);
      
      if (avgLogic > maxLogic) {
        maxLogic = avgLogic;
        target = player;
      }
    }

    return target?.id;
  }

  /**
   * 找到最可疑的玩家
   */
  findMostSuspicious(players) {
    let maxSuspicion = 0;
    let target = players[0];

    for (const player of players) {
      const suspicion = this.suspicionMap.get(player.id) || 50;
      if (suspicion > maxSuspicion) {
        maxSuspicion = suspicion;
        target = player;
      }
    }

    return target;
  }

  /**
   * 找到最有价值的玩家
   */
  findMostValuable(players, history) {
    // 发言多且逻辑强的玩家
    return this.findMostLogicalPlayer(players, history);
  }

  /**
   * 总结观察
   */
  summarizeObservations() {
    const recent = this.observations.slice(-3);
    if (recent.length === 0) {
      return '我还在观察，暂时没有明确的判断。';
    }

    const mostSuspicious = recent.reduce((max, obs) => 
      obs.suspicion > max.suspicion ? obs : max
    );

    return `根据我的观察，${mostSuspicious.playerId} 的行为最可疑，${mostSuspicious.reason}。`;
  }

  /**
   * 获取发言矛盾的轮次
   */
  getInconsistentRound() {
    // 简化实现：随机返回一个轮次
    return Math.floor(Math.random() * 3) + 1;
  }

  /**
   * 获取最可疑的玩家
   */
  getMostSuspicious() {
    const sorted = Array.from(this.suspicionMap.entries())
      .sort((a, b) => b[1] - a[1]);
    
    return { id: sorted[0]?.[0], name: `Player_${sorted[0]?.[0]}` };
  }
}
