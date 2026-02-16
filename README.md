# 🐺 Werewolf Mobile - 狼人杀移动端 App

与 AI 玩家（OpenClaw）一起玩狼人杀的移动端应用。

## 项目概述

- **平台**: React Native (iOS + Android)
- **后端**: 复用 werewolf-live 的 WebSocket 服务器
- **AI 集成**: OpenClaw agents 作为 AI 玩家
- **特色**: 语音对话、智能推理、流畅 UI

## 技术栈

### 移动端
- **React Native** - 跨平台移动框架
- **Expo** - 快速开发和部署
- **React Navigation** - 页面导航
- **Socket.io-client** - WebSocket 实时通信
- **React Native Voice** - 语音输入（可选）
- **Zustand** - 状态管理

### 后端（复用）
- werewolf-live backend (Express + WebSocket)
- OpenClaw SDK for AI players

## 核心功能

### 1. 游戏模式
- **单人 vs AI** - 1 个真人 + 多个 OpenClaw AI
- **多人 vs AI** - 多个真人 + 少量 AI 补位
- **自定义房间** - 自由配置角色数量

### 2. 角色系统
- 狼人 (Werewolf)
- 平民 (Villager)
- 预言家 (Seer)
- 女巫 (Witch) - 新增
- 猎人 (Hunter) - 新增

### 3. AI 特性
- **个性化 AI**: 每个 AI 有独特性格和说话风格
- **智能推理**: 基于 OpenClaw 的逻辑推理能力
- **自然对话**: AI 的发言更像真人

### 4. 移动端特性
- 简洁直观的 UI
- 实时语音/文字交流
- 游戏进程可视化
- 历史记录回顾
- 成就系统

## 项目结构

```
werewolf-mobile/
├── app/                    # Expo App
│   ├── screens/           # 页面
│   │   ├── HomeScreen.tsx
│   │   ├── RoomScreen.tsx
│   │   ├── GameScreen.tsx
│   │   └── ResultScreen.tsx
│   ├── components/        # 组件
│   │   ├── PlayerCard.tsx
│   │   ├── ChatPanel.tsx
│   │   ├── VotePanel.tsx
│   │   └── RoleCard.tsx
│   ├── hooks/            # Hooks
│   │   ├── useWebSocket.ts
│   │   └── useGameState.ts
│   ├── store/            # 状态管理
│   │   └── gameStore.ts
│   └── utils/            # 工具函数
│       └── api.ts
├── backend/              # 后端（符号链接到 werewolf-live）
├── openclaw-agents/      # OpenClaw AI 玩家
│   ├── personalities/    # AI 性格配置
│   │   ├── detective.ts  # 侦探型
│   │   ├── cautious.ts   # 谨慎型
│   │   ├── aggressive.ts # 激进型
│   │   └── neutral.ts    # 中立型
│   └── agent-runner.ts   # AI 启动器
└── docs/                 # 文档
    ├── API.md
    ├── GAME_RULES.md
    └── DESIGN.md
```

## 开发计划

### Phase 1: 基础框架 (Week 1)
- [ ] 初始化 Expo 项目
- [ ] 设计 UI/UX 原型
- [ ] 实现基础页面导航
- [ ] WebSocket 连接测试

### Phase 2: 游戏逻辑 (Week 2)
- [ ] 复用 werewolf-live backend
- [ ] 实现房间创建/加入
- [ ] 实现游戏状态同步
- [ ] 实现投票和夜间行动

### Phase 3: AI 集成 (Week 3)
- [ ] 集成 OpenClaw SDK
- [ ] 创建 AI 性格配置
- [ ] 实现 AI 自动发言
- [ ] 实现 AI 策略引擎

### Phase 4: 优化 (Week 4)
- [ ] UI/UX 优化
- [ ] 性能优化
- [ ] 添加音效和动画
- [ ] 测试和 bug 修复

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动后端（复用 werewolf-live）
cd backend
pnpm dev

# 启动移动端
cd app
pnpm start

# 启动 AI 玩家
cd openclaw-agents
pnpm start
```

## AI 性格设计

### 1. 侦探型 (Detective)
- 逻辑严密，擅长推理
- 发言条理清晰
- 倾向于主导讨论

### 2. 谨慎型 (Cautious)
- 不轻易表态
- 倾向于观察和跟随
- 投票时会犹豫

### 3. 激进型 (Aggressive)
- 强势发言
- 快速下判断
- 容易引发冲突

### 4. 中立型 (Neutral)
- 平衡各方意见
- 寻求共识
- 较难被识破

## API 设计

### REST API
```
GET  /api/rooms          # 获取房间列表
POST /api/rooms          # 创建房间
GET  /api/rooms/:id      # 获取房间详情
POST /api/rooms/:id/join # 加入房间
```

### WebSocket Events
```
Client → Server:
- join_room        # 加入房间
- ready            # 准备
- start_game       # 开始游戏
- chat_message     # 聊天消息
- night_action     # 夜间行动
- vote             # 投票

Server → Client:
- room_state       # 房间状态更新
- game_started     # 游戏开始
- phase_change     # 阶段变化
- player_action    # 玩家行动
- game_over        # 游戏结束
```

## 许可证

MIT
