# NovelFlow AI - 智能对话小说创作平台

> 基于AI的小说全流程辅助创作系统，让每个人都能写出好故事

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/python-3.11+-blue)
![React](https://img.shields.io/badge/react-18+-cyan)

## ✨ 特性

### 🎯 核心功能

- **💡 灵感采集器** - 捕捉、分类、扩展创意灵感
- **🏗️ 结构建筑师** - 设计三幕式、英雄之旅等故事结构
- **👤 角色塑造师** - 应用7要素法则创建立体角色
- **🎬 情节编织机** - 设计场景蓝图、节拍和转折
- **💬 对话生成器** - 创作有潜台词的高质量对话
- **🖼️ 场景渲染器** - 营造身临其境的场景氛围
- **⏱️ 节奏调音师** - 控制叙事节奏和悬念
- **✨ 文字打磨匠** - "展示而非讲述"优化
- **🔍 质检验收员** - 全方位质量诊断

### 🤖 AI能力

- 支持 Claude 和 GPT-4 双引擎
- 智能对话式创作交互
- 流式响应，实时生成
- 上下文记忆，深度理解

### 📚 创作方法论

系统内置完整的小说创作方法论：

1. **冲突公式**：日常 + 反常 = 戏剧性
2. **三幕式结构**：建置(25%) + 对抗(50%) + 结局(25%)
3. **角色立体7要素**：重复行为、反差细节、成长轨迹、独特观察、特殊天赋、真实缺陷、强烈动机
4. **只呈现不叙述**：调动五感，增强画面感
5. **节奏节拍**：角色克服障碍的尝试序列

## 🚀 快速开始

### 使用Docker（推荐）

```bash
# 克隆仓库
git clone https://github.com/yourusername/novelflow-ai.git
cd novelflow-ai

# 复制环境变量文件
cp .env.example .env

# 编辑.env文件，添加你的API密钥
# ANTHROPIC_API_KEY=your_key_here
# OPENAI_API_KEY=your_key_here

# 启动所有服务
docker-compose up -d

# 访问应用
# 前端：http://localhost:3000
# 后端API：http://localhost:8000
# API文档：http://localhost:8000/api/docs
```

### 手动安装

#### 后端

```bash
cd backend

# 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp ../.env.example .env

# 运行数据库迁移（需要先启动PostgreSQL）
# alembic upgrade head

# 启动开发服务器
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### 前端

```bash
cd frontend

# 安装依赖
npm install

# 配置环境变量
echo "VITE_API_URL=http://localhost:8000/api/v1" > .env

# 启动开发服务器
npm run dev
```

## 📖 使用指南

### 1. 创建项目

```
登录 → 点击"创建新项目" → 输入项目信息 → 开始创作
```

### 2. 灵感开发

```
选择"灵感"模块 → 输入灵感片段 → AI自动扩展 → 选择冲突方案
```

### 3. 结构设计

```
切换到"结构"模块 → AI推荐故事结构 → 生成三幕式大纲 → 规划章节
```

### 4. 角色塑造

```
切换到"角色"模块 → 创建角色 → AI应用7要素 → 设计人物弧光
```

### 5. 内容创作

```
切换到"内容"模块 → 选择章节 → 生成场景蓝图 → AI撰写内容 → 人工编辑
```

### 6. 修改打磨

```
切换到"修改"模块 → AI质量诊断 → 按优先级修改 → 最终润色
```

## 🛠️ 技术栈

### 后端

- **框架**: FastAPI 0.104+
- **数据库**: PostgreSQL 15 + pgvector
- **缓存**: Redis 7
- **AI**: Anthropic Claude, OpenAI GPT-4
- **认证**: JWT

### 前端

- **框架**: React 18 + TypeScript
- **构建**: Vite 5
- **状态管理**: Zustand
- **路由**: React Router v6
- **UI**: TailwindCSS + Radix UI
- **请求**: TanStack Query + Axios

### 部署

- **容器化**: Docker + Docker Compose
- **反向代理**: Nginx
- **对象存储**: MinIO (可选)

## 📁 项目结构

```
novelflow-ai/
├── backend/                 # 后端代码
│   ├── app/
│   │   ├── api/            # API路由
│   │   ├── ai/             # AI引擎和角色
│   │   ├── core/           # 核心配置
│   │   ├── models/         # 数据库模型
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # 业务逻辑
│   ├── tests/              # 测试
│   └── requirements.txt
│
├── frontend/               # 前端代码
│   ├── src/
│   │   ├── components/     # React组件
│   │   ├── hooks/          # 自定义Hooks
│   │   ├── services/       # API服务
│   │   ├── stores/         # 状态管理
│   │   ├── types/          # TypeScript类型
│   │   └── utils/          # 工具函数
│   ├── index.html
│   └── package.json
│
├── docs/                   # 文档
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🔧 配置说明

主要环境变量见 `.env.example`：

- `ANTHROPIC_API_KEY`: Claude API密钥
- `OPENAI_API_KEY`: GPT API密钥
- `DATABASE_URL`: PostgreSQL连接字符串
- `REDIS_URL`: Redis连接字符串
- `SECRET_KEY`: JWT密钥

## 🤝 贡献指南

欢迎贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)

## 🙏 致谢

- 小说创作方法论参考《拆解一切故事写作》
- AI服务由 Anthropic 和 OpenAI 提供
- 灵感来源于所有热爱创作的朋友们

---

**Made with ❤️ for writers everywhere**

[官方网站](https://novelflow.ai) | [文档](https://docs.novelflow.ai) | [社区](https://community.novelflow.ai)
