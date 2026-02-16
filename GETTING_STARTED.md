# 🚀 Getting Started - Werewolf Mobile

## 项目结构

```
werewolf-mobile/
├── README.md              # 项目概述
├── DESIGN.md              # 详细设计文档
├── GETTING_STARTED.md     # 本文件
├── package.json           # 主项目配置
├── app.json               # Expo 配置
├── .env.example           # 环境变量示例
├── openclaw-agents/       # AI 代理
│   ├── package.json
│   ├── agent-runner.js    # AI 启动器
│   └── strategies/        # AI 策略
│       ├── detective.js
│       ├── cautious.js
│       ├── aggressive.js
│       └── neutral.js
└── app/                   # React Native App (待创建)
    └── (Expo 项目文件)
```

## 快速开始

### 1. 安装依赖

```bash
cd /home/ubuntu/clawd/werewolf-mobile

# 安装主项目依赖
pnpm install

# 安装 AI 代理依赖
cd openclaw-agents
pnpm install
cd ..
```

### 2. 配置环境

```bash
# 复制环境变量
cp .env.example .env

# 编辑配置（如果需要）
nano .env
```

### 3. 启动后端服务器

```bash
# 使用 werewolf-live 的后端
cd ../werewolf-live/backend
pnpm install  # 如果还没安装
pnpm dev
```

后端会在 `http://localhost:4000` 启动。

### 4. 启动 AI 代理

```bash
# 回到 werewolf-mobile 目录
cd /home/ubuntu/clawd/werewolf-mobile/openclaw-agents

# 启动 AI 代理
pnpm start
```

你会看到 4 个 AI 玩家连接到游戏服务器：
- 🕵️ 福尔摩斯 (侦探型)
- 🤐 沉默者 (谨慎型)
- ⚔️ 战狼 (激进型)
- 🕊️ 和平使者 (中立型)

### 5. 初始化 Expo 项目

```bash
# 回到主目录
cd /home/ubuntu/clawd/werewolf-mobile

# 使用 Expo CLI 创建项目
npx create-expo-app app --template blank-typescript

# 或者如果已经安装了 expo-cli
expo init app
```

### 6. 启动移动端开发

```bash
cd app
pnpm start
```

然后：
- 按 `a` 启动 Android 模拟器
- 按 `i` 启动 iOS 模拟器
- 按 `w` 在浏览器中打开

## 开发流程

### 同时启动所有服务

使用 `concurrently` 同时启动后端、AI 和前端：

```bash
# 在 werewolf-mobile 目录
pnpm dev:all
```

这会启动：
1. 后端服务器 (port 4000)
2. AI 代理 (4个)
3. Expo 开发服务器

### 测试 AI 代理

```bash
# 修改 AI 数量
export NUM_AGENTS=6
cd openclaw-agents
pnpm start

# 或者修改房间
export ROOM_ID=test-room-1
pnpm start
```

## 下一步

### 1. 创建基础 UI 组件

在 `app/` 目录创建：
- `screens/HomeScreen.tsx` - 首页
- `screens/RoomScreen.tsx` - 房间大厅
- `screens/GameScreen.tsx` - 游戏界面
- `components/PlayerCard.tsx` - 玩家卡片
- `components/ChatPanel.tsx` - 聊天面板

### 2. 实现 WebSocket 连接

创建 `app/hooks/useWebSocket.ts`：

```typescript
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

export function useWebSocket(url: string) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = io(url);
    
    ws.on('connect', () => {
      setConnected(true);
      console.log('Connected to server');
    });

    ws.on('disconnect', () => {
      setConnected(false);
      console.log('Disconnected from server');
    });

    setSocket(ws);

    return () => {
      ws.disconnect();
    };
  }, [url]);

  return { socket, connected };
}
```

### 3. 创建游戏状态管理

使用 Zustand 管理全局状态：

```typescript
// app/store/gameStore.ts
import { create } from 'zustand';

interface GameState {
  roomId: string | null;
  players: Player[];
  myRole: string | null;
  gamePhase: 'waiting' | 'night' | 'day' | 'vote' | 'result';
  
  setRoom: (roomId: string) => void;
  setPlayers: (players: Player[]) => void;
  setRole: (role: string) => void;
  setPhase: (phase: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  roomId: null,
  players: [],
  myRole: null,
  gamePhase: 'waiting',
  
  setRoom: (roomId) => set({ roomId }),
  setPlayers: (players) => set({ players }),
  setRole: (myRole) => set({ myRole }),
  setPhase: (gamePhase) => set({ gamePhase }),
}));
```

## 调试技巧

### 查看后端日志

```bash
cd /home/ubuntu/clawd/werewolf-live/backend
tail -f logs/server.log
```

### 查看 AI 代理行为

AI 代理会打印所有事件到控制台：
- 🎮 游戏开始
- 💬 发言内容
- 🗳️ 投票决策
- 🏁 游戏结束

### React Native 调试

- 摇晃设备/按 `Cmd+D` (iOS) 或 `Cmd+M` (Android) 打开开发菜单
- 选择 "Debug JS Remotely" 在 Chrome 中调试
- 使用 React DevTools 查看组件树

## 常见问题

### Q: AI 代理无法连接？

**A**: 检查后端是否正在运行：
```bash
curl http://localhost:4000/health
```

### Q: Expo 无法启动？

**A**: 清除缓存：
```bash
cd app
pnpm start -- --clear
```

### Q: WebSocket 连接失败？

**A**: 确认 URL 配置正确：
- 开发环境: `ws://localhost:4000/ws`
- 生产环境: `wss://your-domain.com/ws`

## 推荐资源

- [React Native 文档](https://reactnative.dev/)
- [Expo 文档](https://docs.expo.dev/)
- [Socket.io 文档](https://socket.io/docs/)
- [Zustand 文档](https://github.com/pmndrs/zustand)

## 联系方式

有问题？查看 `DESIGN.md` 了解详细架构，或在项目中提 Issue。
