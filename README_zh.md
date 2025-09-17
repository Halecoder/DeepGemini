 <div align="center">
<h1>DeepGemini 🌟</h1>
<p>一个灵活的多模型编排 API，兼容 OpenAI 接口</p>

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![Python 3.11](https://img.shields.io/badge/Python-3.11-blue?style=flat-square&logo=python)](https://www.python.org)
[![OpenAI Compatible](https://img.shields.io/badge/OpenAI-Compatible-412991?style=flat-square&logo=openai)](https://platform.openai.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/sligter/DeepGemini)
</div>

[English](README.md)

## ✨ 特性

- **多模型编排**：无缝组合多个 AI 模型，实现自定义接力链
- **角色管理**：创建具有不同性格和技能的 AI 角色
- **讨论组**：组合多个角色形成讨论组
- **多种讨论模式**：
  - 一般讨论
  - 头脑风暴
  - 辩论
  - 角色扮演
  - SWOT 分析
  - 六顶思考帽  
- **灵活的提供商支持**：支持多个 AI 提供商：
  - DeepSeek
  - Claude
  - Gemini
  - Grok3
  - OpenAI
  - OneAPI
  - OpenRouter
  - Siliconflow
- **OpenAI 兼容**：可作为 OpenAI API 的直接替代品
- **流式响应**：支持实时流式响应，提供更好的用户体验
- **高级配置**：精细控制模型参数和系统提示词
- **Web 管理界面**：内置模型和配置管理界面
- **多语言支持**：支持中文和英文界面
- **人类参与**：支持人类加入AI讨论组进行发言
- **对话界面**：支持模型、角色、接力链、讨论组在线对话
- **灵活部署**：支持Docker或本地安装的简易部署方式

## 预览

![image](https://img.pub/p/02f96adb71b92d9e8009.png)

![image](https://img.pub/p/1ffdc3728b7944caf807.png)

![image](https://img.pub/p/9051bfc02883dbceaf90.png)

![image](https://img.pub/p/058205dff608609b7d58.png)

![image](https://img.pub/p/d4f09719c2a5a2315fc5.png)

![image](https://img.pub/p/439520386b4927c91688.png)

## 🚀 快速开始

### 1. 安装

```bash
git clone https://github.com/sligter/DeepGemini.git
cd DeepGemini
uv sync
```

### 2. 配置

```bash
cp .env.example .env
```

必需的环境变量：
- `ALLOW_API_KEY`：你的 API 访问密钥
- `ALLOW_ORIGINS`：允许的 CORS 来源（逗号分隔或 "*"）

### 3. 运行应用

```bash
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

访问 `http://localhost:8000/dashboard` 进入 Web 管理界面。

## 🐳 Docker 部署

### 使用 Docker Compose（推荐）

1. 创建并配置 `.env` 文件：

```bash
cp .env.example .env
touch deepgemini.db
echo "" > deepgemini.db
```

2. 构建并启动容器：

```bash
docker-compose up -d
```

3. 访问 `http://localhost:8000/dashboard` 进入 Web 界面

### 直接使用 Docker

1. 拉取镜像：
```bash
docker pull bradleylzh/deepgemini:latest
```

2. 创建必要文件：

Linux/Mac 用户：
```bash
cp .env.example .env
touch deepgemini.db
```

运行容器
```bash
docker run -d \
-p 8000:8000 \
-v $(pwd)/.env:/app/.env \
-v $(pwd)/deepgemini.db:/app/deepgemini.db \
--name deepgemini \
bradleylzh/deepgemini:latest
```

Windows PowerShell 用户：

```powershell
cp .env.example .env
python -c "import sqlite3; sqlite3.connect('deepgemini.db').close()"
```

运行容器
```powershell
docker run -d -p 8000:8000 `
-v ${PWD}\.env:/app/.env `
-v ${PWD}\deepgemini.db:/app/deepgemini.db `
--name deepgemini `
bradleylzh/deepgemini:latest
```

## 🔧 模型配置

DeepGemini 支持多种 AI 提供商：

- **DeepSeek**：先进的推理能力
- **Claude**：精细的文本生成和思考
- **Gemini**：Google 的 AI 模型
- **Grok3**：Grok 的 AI 模型
- **自定义**：添加你自己的提供商集成

每个模型可配置：
- API 凭证
- 模型参数（temperature、top_p 等）
- 系统提示词
- 使用类型（推理/执行/两者）

## 🔄 中继链配置

通过组合模型创建自定义中继链：

1. **推理步骤**：初始分析和规划
2. **执行步骤**：最终响应生成
3. **自定义步骤**：根据需要添加多个步骤

## 👥 多角色讨论
- **角色管理**：创建具有不同性格和技能的 AI 角色
- **讨论组**：组合多个角色形成讨论组
- **多种讨论模式**：
  - 一般讨论
  - 头脑风暴
  - 辩论
  - 角色扮演
  - SWOT 分析
  - 六顶思考帽
- **人类参与**：允许人类加入AI讨论并发言

## 🔍 API 兼容性
DeepGemini 提供兼容的API接口，可作为OpenAI API的直接替代品：

- **/v1/chat/completions**：与OpenAI聊天完成端点兼容
- **/v1/models**：以OpenAI兼容格式列出所有可用模型
- 支持流式响应、工具和其他OpenAI API功能

## 🛠 技术栈

- [FastAPI](https://fastapi.tiangolo.com/)：现代 Web 框架
- [SQLAlchemy](https://www.sqlalchemy.org/)：数据库 ORM
- [Alembic](https://alembic.sqlalchemy.org/)：数据库迁移
- [UV](https://github.com/astral-sh/uv)：快速 Python 包安装器
- [aiohttp](https://docs.aiohttp.org/)：异步 HTTP 客户端
- [deepclaude](https://github.com/getasterisk/deepclaude)

## ✨ 鸣谢

[![Powered by DartNode](https://dartnode.com/branding/DN-Open-Source-sm.png)](https://dartnode.com "Powered by DartNode - Free VPS for Open Source")

## 📝 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

## 📬 联系

如有问题和支持需求，请在 GitHub 上开启 Issue。
