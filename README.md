# 数学小天才

[一个面向5-7岁小朋友的数字运算教育游戏，支持加法和减法两种运算类型，通过有趣的界面和互动方式帮助儿童学习数学运算。](https://github.com/boryleeya/math-game.git)

## 功能特性

### 运算练习
- **加法练习**: 从10以内到100以内的加法运算
- **减法练习**: 从10以内到100以内的减法运算
- **固定选项**: 每道题提供10个数字选项
- **即时反馈**: 选择后立即显示正确/错误提示

### 关卡系统
- 每关连续答对10题即可通关
- 答错题会重置连续答对计数
- 通关后可选择进入下一关或继续练习
- 完成所有关卡后可重新开始

### 答案解析
- 点击"解析答案"查看图形化解析
- 加法：用方块直观展示合并过程
- 减法：用方块直观展示减去过程

## 难度等级

| 难度 | 范围 |
|------|------|
| 入门 | 10以内 |
| 初级 | 20以内 |
| 中级 | 30-50以内 |
| 高级 | 60-80以内 |
| 专家 | 90以内 |
| 大师 | 100以内 |

## 技术栈

- **框架**: React 18
- **构建工具**: Vite
- **路由**: React Router DOM
- **样式**: Tailwind CSS
- **语言**: TypeScript

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
src/
├── pages/               # 页面组件
│   ├── DifficultySelect.tsx    # 运算类型和难度选择
│   ├── MathGame.tsx            # 加法练习
│   └── SubtractionGame.tsx     # 减法练习
├── components/          # 公共组件
│   ├── DifficultyButton.tsx    # 难度按钮
│   ├── NumberButton.tsx         # 数字按钮
│   ├── QuestionDisplay.tsx      # 题目展示
│   ├── FeedbackMessage.tsx     # 反馈消息
│   ├── LevelCompleteMessage.tsx # 关卡完成弹窗
│   ├── GameCompleteMessage.tsx # 通关弹窗
│   └── AnswerExplanation.tsx   # 答案解析弹窗
├── hooks/               # 自定义Hooks
│   ├── useMathGame.ts          # 加法游戏逻辑
│   └── useSubtractionGame.ts    # 减法游戏逻辑
├── utils/               # 工具函数
│   └── mathUtils.ts            # 数学工具
└── App.tsx              # 应用入口
```

## 路由说明

| 路由 | 页面 |
|------|------|
| `/` | 运算类型选择页面 |
| `/game` | 加法练习页面 |
| `/subtraction` | 减法练习页面 |

## 设计特点

- **儿童友好**: 明亮活泼的配色，圆润的按钮设计
- **移动优先**: 触控友好的大按钮，适配各种屏幕
- **即时反馈**: 正确答案弹跳庆祝，错误答案抖动提示
- **趣味动画**: 按钮弹出动画，星星漂浮装饰

## License

MIT
