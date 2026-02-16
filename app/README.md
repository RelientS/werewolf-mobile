# 🐺 狼人杀移动端 - Werewolf Mobile App

React Native + Expo 移动端应用，与 AI 玩家一起玩狼人杀。

## 🚀 快速开始

### 1. 确保后端正在运行

```bash
cd /home/ubuntu/clawd/werewolf-live/backend
npm start
```

后端会在 `http://localhost:4000` 启动。

### 2. 启动移动端

```bash
cd /home/ubuntu/clawd/werewolf-mobile/app
npm start
```

### 3. 选择平台

启动后会显示二维码和选项：
- 按 `w` - 在浏览器中打开（推荐测试）
- 按 `a` - 启动 Android 模拟器
- 按 `i` - 启动 iOS 模拟器（需要 Mac）

## 📱 功能

### 已实现
- ✅ 创建/加入房间
- ✅ 实时 WebSocket 连接
- ✅ 玩家列表显示
- ✅ 准备系统
- ✅ 游戏阶段显示
- ✅ 角色展示（狼人、预言家、女巫等）
- ✅ 夜晚行动
- ✅ 白天投票
- ✅ 消息聊天

### 待完善
- ⏳ 女巫解药/毒药选择界面
- ⏳ 守卫守护界面
- ⏳ 猎人开枪机制
- ⏳ 白痴翻牌
- ⏳ 游戏结果页面
- ⏳ 语音聊天（可选）

## 🎨 UI 设计

### 配色方案
- 主色: `#1a1a2e` (深蓝黑)
- 强调色: `#ffd700` (金色)
- 背景: `#2a2a3e` (深灰紫)
- 文字: `#ffffff` (白色)
- 次要文字: `#95a5a6` (灰色)

### 页面结构
1. **首页 (HomeScreen)**
   - 输入昵称
   - 快速开始 / 加入房间
   - 服务器状态检查

2. **房间 (RoomScreen)**
   - 玩家列表
   - 准备状态
   - 开始游戏按钮

3. **游戏 (GameScreen)**
   - 当前阶段显示
   - 角色信息
   - 存活玩家
   - 消息聊天
   - 行动按钮

## 🔧 技术栈

- **React Native** - 移动端框架
- **Expo** - 开发工具
- **TypeScript** - 类型安全
- **Zustand** - 状态管理
- **Socket.io-client** - WebSocket 通信
- **React Navigation** - 页面导航

## 📂 项目结构

```
app/
├── App.tsx                 # 应用入口
├── src/
│   ├── screens/           # 页面组件
│   │   ├── HomeScreen.tsx
│   │   ├── RoomScreen.tsx
│   │   └── GameScreen.tsx
│   ├── components/        # UI 组件
│   │   └── PlayerCard.tsx
│   ├── hooks/             # 自定义 Hooks
│   │   └── useWebSocket.ts
│   ├── store/             # 状态管理
│   │   └── gameStore.ts
│   ├── types/             # TypeScript 类型
│   │   └── game.ts
│   └── utils/             # 工具函数
│       └── api.ts
```

## 🐛 调试

### 查看日志
- Web: 浏览器开发者工具
- React Native: `console.log` 会显示在终端

### 常见问题

**Q: 无法连接到服务器？**
A: 确保后端在 `http://localhost:4000` 运行，或修改 `src/hooks/useWebSocket.ts` 和 `src/utils/api.ts` 中的 URL。

**Q: WebSocket 连接失败？**
A: 检查防火墙设置，确保 4000 端口可访问。

**Q: 页面白屏？**
A: 查看终端错误信息，可能是依赖问题，尝试 `npm install` 重新安装。

## 📝 下一步

1. **完善角色特殊能力界面**
2. **添加音效和动画**
3. **优化 UI/UX**
4. **添加成就系统**
5. **支持自定义房间配置**

## 🤝 与 AI 玩家配合

启动 AI 玩家：

```bash
cd /home/ubuntu/clawd/werewolf-mobile/openclaw-agents
npm start
```

AI 会自动加入房间并准备。

## 📄 许可证

MIT
