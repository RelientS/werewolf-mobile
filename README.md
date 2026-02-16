# 🐺 狼人杀移动端 | Werewolf Mobile

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

> 🎮 与 AI 玩家一起玩狼人杀的 React Native 移动应用

[English](#) | [中文](#)

## ✨ 特色功能

- 🤖 **AI 玩家** - 4 种不同性格的 OpenClaw AI 玩家（侦探型、谨慎型、激进型、中立型）
- 🎭 **7 种角色** - 狼人、预言家、女巫、猎人、守卫、白痴、平民
- 🌙 **完整规则** - 标准狼人杀规则，夜晚行动、白天讨论、投票放逐
- 📱 **跨平台** - iOS、Android、Web 一套代码
- ⚡ **实时通信** - WebSocket 实时同步游戏状态
- 🎨 **精美 UI** - 深色主题，金色点缀，舒适体验

## 🚀 快速开始

### 前置要求

- Node.js 18+
- npm 或 pnpm
- Expo CLI

### 安装

```bash
# 克隆项目
git clone https://github.com/RelientS/werewolf-mobile.git
cd werewolf-mobile

# 安装依赖
cd app && npm install
cd ../openclaw-agents && npm install
```

### 启动

详细步骤请查看 **[快速开始指南](QUICKSTART.md)** 📖

**简要步骤：**

```bash
# 1. 启动后端（需要 werewolf-live 项目）
cd werewolf-live/backend && npm start

# 2. 启动移动端
cd werewolf-mobile/app && npm start

# 3. 启动 AI 玩家（可选）
cd werewolf-mobile/openclaw-agents && npm start
```

然后按 `w` 在浏览器打开，或扫描二维码在手机上打开。

## 📱 截图

### 首页
输入昵称，快速开始或加入房间

### 房间大厅
查看玩家，准备状态，开始游戏

### 游戏界面
实时显示游戏阶段、角色信息、玩家状态

## 🎭 角色系统

| 角色 | 能力 | 阵营 |
|-----|------|------|
| 🐺 狼人 | 每晚杀死一名玩家，互相认识 | 狼人 |
| 🔮 预言家 | 每晚查验一名玩家身份 | 好人 |
| 🧪 女巫 | 解药救人（1次），毒药杀人（1次） | 好人 |
| 🔫 猎人 | 被杀时可以开枪带走一人 | 好人 |
| 🛡️ 守卫 | 每晚守护一人，不能连续守同一人 | 好人 |
| 🤡 白痴 | 被投票时可以翻牌免疫 | 好人 |
| 👤 平民 | 无特殊能力 | 好人 |

完整规则请查看 **[游戏规则](RULES.md)** 📚

## 🤖 AI 玩家

4 种独特性格的 AI 玩家：

- 🕵️ **福尔摩斯** (侦探型) - 逻辑严密，擅长推理
- 🤐 **沉默者** (谨慎型) - 谨慎观察，不轻易表态  
- ⚔️ **战狼** (激进型) - 强势发言，快速下判断
- 🕊️ **和平使者** (中立型) - 寻求平衡，调和矛盾

## 🏗️ 技术栈

### 前端
- [React Native](https://reactnative.dev/) - 跨平台移动框架
- [Expo](https://expo.dev/) - 开发工具
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Zustand](https://github.com/pmndrs/zustand) - 状态管理
- [React Navigation](https://reactnavigation.org/) - 页面导航
- [Socket.io-client](https://socket.io/) - WebSocket 通信

### 后端
- [Node.js](https://nodejs.org/) - 运行时
- [Express](https://expressjs.com/) - Web 框架
- [WebSocket](https://github.com/websockets/ws) - 实时通信

## 📂 项目结构

```
werewolf-mobile/
├── app/                    # React Native 应用
│   ├── src/
│   │   ├── screens/       # 页面组件
│   │   ├── components/    # UI 组件
│   │   ├── hooks/         # 自定义 Hooks
│   │   ├── store/         # 状态管理
│   │   ├── types/         # TypeScript 类型
│   │   └── utils/         # 工具函数
│   └── App.tsx            # 应用入口
├── openclaw-agents/       # AI 玩家
│   ├── strategies/        # AI 策略
│   └── agent-runner.js    # AI 启动器
├── RULES.md              # 游戏规则
├── DESIGN.md             # 设计文档
├── QUICKSTART.md         # 快速开始
└── README.md             # 本文件
```

## 🎯 开发路线图

### ✅ 已完成 (v0.1.0)
- [x] 项目架构搭建
- [x] 基础 UI 组件
- [x] WebSocket 实时通信
- [x] 房间创建/加入
- [x] 游戏状态同步
- [x] AI 玩家集成

### 🚧 进行中 (v0.2.0)
- [ ] 女巫双药界面
- [ ] 守卫守护逻辑
- [ ] 猎人开枪机制
- [ ] 白痴翻牌功能
- [ ] 游戏结果页面

### 📋 计划中 (v0.3.0+)
- [ ] 音效和动画
- [ ] 成就系统
- [ ] 历史记录
- [ ] 自定义房间配置
- [ ] 语音聊天（可选）

## 📖 文档

- **[快速开始指南](QUICKSTART.md)** - 5 分钟上手教程
- **[游戏规则](RULES.md)** - 完整的狼人杀规则说明
- **[设计文档](DESIGN.md)** - UI/UX 设计和技术架构
- **[开发状态](DEVELOPMENT_STATUS.md)** - 当前开发进度

## 🤝 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md)

## 📝 许可证

[MIT License](LICENSE)

## 🙏 致谢

- [werewolf-live](https://github.com/RelientS/werewolf-live) - 游戏后端
- [OpenClaw](https://openclaw.com) - AI 框架
- [Expo](https://expo.dev/) - 开发工具
- 所有贡献者 ❤️

## 📮 联系

有问题或建议？
- 提交 [Issue](https://github.com/RelientS/werewolf-mobile/issues)
- 发起 [Discussion](https://github.com/RelientS/werewolf-mobile/discussions)

---

⭐ 如果这个项目对你有帮助，请给个 Star！

Made with ❤️ by [Relient](https://github.com/RelientS) & [Cetow](https://github.com/cetow) (AI)
