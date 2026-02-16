# 🚀 快速开始指南

## 📦 克隆项目

```bash
git clone https://github.com/RelientS/werewolf-mobile.git
cd werewolf-mobile
```

## 🔧 安装依赖

### 1. 安装移动端依赖

```bash
cd app
npm install
```

### 2. 安装 AI 玩家依赖

```bash
cd ../openclaw-agents
npm install
```

## 🎮 启动游戏

### 方案 A: 完整体验（推荐）

**需要 3 个终端窗口：**

#### 终端 1: 启动后端服务器

```bash
# 克隆 werewolf-live 后端（如果还没有）
git clone https://github.com/RelientS/werewolf-live.git
cd werewolf-live/backend
npm install
npm start
```

后端会在 `http://localhost:4000` 启动。

#### 终端 2: 启动移动端

```bash
cd werewolf-mobile/app
npm start

# 然后选择：
# - 按 'w' 在浏览器打开（推荐开发测试）
# - 按 'a' 启动 Android 模拟器
# - 按 'i' 启动 iOS 模拟器
```

#### 终端 3: 启动 AI 玩家

```bash
cd werewolf-mobile/openclaw-agents
npm start
```

默认启动 4 个 AI 玩家：
- 🕵️ 福尔摩斯（侦探型）
- 🤐 沉默者（谨慎型）
- ⚔️ 战狼（激进型）
- 🕊️ 和平使者（中立型）

### 方案 B: 仅测试移动端 UI

如果你只想看 UI，不需要后端：

```bash
cd app
npm start
```

按 `w` 在浏览器打开，UI 会显示但无法连接服务器。

## 📱 使用流程

### 1. 打开应用
在浏览器打开 `http://localhost:19006`（Expo 会自动打开）

### 2. 创建/加入房间
- 输入你的昵称
- 点击「快速开始」创建新房间
- 或输入房间 ID 加入现有房间

### 3. 等待玩家
- AI 玩家会自动加入并准备
- 你也需要点击「准备」按钮
- 至少需要 6 名玩家

### 4. 开始游戏
- 所有玩家准备后，房主点击「开始游戏」
- 进入游戏界面

### 5. 游戏流程
- **夜晚**: 根据你的角色执行特殊能力
- **白天讨论**: 查看消息和发言
- **投票**: 选择要放逐的玩家

## 🎭 角色说明

- 🐺 **狼人** - 每晚杀死一名玩家，互相认识
- 🔮 **预言家** - 每晚查验一名玩家身份
- 🧪 **女巫** - 解药救人（1次），毒药杀人（1次）
- 🔫 **猎人** - 被杀时可以开枪带走一人
- 🛡️ **守卫** - 每晚守护一人，不能连续守同一人
- 🤡 **白痴** - 被投票时可以翻牌免疫
- 👤 **平民** - 无特殊能力

## 🔧 配置说明

### 修改后端地址

如果后端不在 localhost，修改以下文件：

**app/src/hooks/useWebSocket.ts:**
```typescript
const WS_URL = 'ws://YOUR_SERVER:4000/ws';
```

**app/src/utils/api.ts:**
```typescript
const API_URL = 'http://YOUR_SERVER:4000';
```

### 修改 AI 玩家数量

**openclaw-agents/agent-runner.js:**
```javascript
const NUM_AGENTS = process.env.NUM_AGENTS || '4'; // 改成你想要的数量
```

或者启动时设置环境变量：
```bash
NUM_AGENTS=6 npm start
```

## 🐛 常见问题

### Q: 无法连接到服务器？
**A:** 确保后端在运行：
```bash
curl http://localhost:4000/health
```
应该返回 `{"status":"ok",...}`

### Q: npm start 报错？
**A:** 删除 node_modules 重新安装：
```bash
rm -rf node_modules package-lock.json
npm install
```

### Q: Expo 打开后白屏？
**A:** 
1. 检查浏览器控制台是否有错误
2. 尝试清除缓存后重新启动
3. 检查 Node.js 版本（推荐 v18+）

### Q: AI 玩家无法加入？
**A:** 确保：
1. 后端已启动
2. 房间 ID 正确（默认是 'default-room'）
3. 检查 AI 启动日志是否有错误

### Q: 如何在手机上测试？
**A:** 
1. 确保手机和电脑在同一网络
2. 修改后端地址为电脑的 IP（不是 localhost）
3. 使用 Expo Go 扫描二维码

## 📚 更多资源

- **完整文档**: 查看 `README.md`
- **游戏规则**: 查看 `RULES.md`
- **设计文档**: 查看 `DESIGN.md`
- **开发状态**: 查看 `DEVELOPMENT_STATUS.md`

## 🤝 获取帮助

遇到问题？
1. 查看 GitHub Issues
2. 查看后端日志
3. 查看浏览器控制台

## 🎉 开始游戏！

一切就绪后，享受与 AI 的狼人杀对决吧！🐺

---

**祝游戏愉快！** 🎮
