# 文心声画坊 · 前端原型

基于 React + Vite + Tailwind CSS 构建的交互式工作台原型，用于演示“文心声画坊”赛题中 AI 赋能古典诗文创作、可视化讲解与多端导出的完整流程。

## ✨ 核心能力

- **主题输入 → 体裁/模式选择**：支持绝句、律诗、词牌三种体裁，以及“古典格律 / 现代题旨 × 古典格律”两种模式切换。
- **格律可视化画布**：行内标色平仄与押韵，自动提示格律违规字位与修改建议。
- **用典知识卡片**：悬停展示典故释义、原文引句与延伸阅读，适配课堂或展陈讲解。
- **意象地图**：以坐标点位呈现江南等意象的时空脉络与历史人物，可对接 Mapbox 场景。
- **一键导出方案**：预置海报、朗诵音频、H5 长条模板，支持调起浏览器 TTS 试听朗诵。

## 🚀 快速开始

```bash
npm install
npm run dev
```

- `npm run lint`：运行 ESLint 进行代码检查。
- `npm run build`：调用离线构建脚本，使用 Tailwind CLI + esbuild 生成 `docs/` 目录下的 `app.css` / `app.js`，可直接双击 `docs/index.html` 离线预览。

> 📦 **无需启动服务器也能体验**：仓库内已包含以非模块脚本打包的 `docs/` 静态站点，任何现代浏览器打开 `docs/index.html`（即便是 `file://` 协议）都能正常运行。

## 🧩 技术栈

- **React 19** + **TypeScript**：组件化状态管理与类型约束。
- **Vite 7**：极速开发构建工具。
- **Tailwind CSS 3**：以设计令牌快速搭建宋韵质感界面。
- **Web Speech API（浏览器）**：示意朗诵音频生成流程。

## 📁 目录结构

```
├── src
│   ├── components
│   │   ├── AllusionPanel.tsx     # 典故卡片面板
│   │   ├── ExportPanel.tsx       # 海报/朗诵/H5 导出预览
│   │   ├── ImageryMap.tsx        # 意象地图可视化
│   │   └── PoemCanvas.tsx        # 格律与诗句展示
│   ├── generator.ts              # 体裁模板与 AI 结果组装逻辑
│   ├── types.ts                  # 数据类型定义
│   ├── App.tsx                   # 页面主结构
│   ├── main.tsx                  # Vite 开发入口
│   └── offline-entry.tsx         # 离线构建入口（无 ES Module 限制）
├── scripts
│   └── build-offline.mjs         # Tailwind + esbuild 离线打包脚本
└── tailwind.config.js            # Tailwind 配置
```

## 📌 注意事项

- 当前示例以内置模板模拟 AI 生成结果，可在真实环境中接入大模型 API 替换 `generator.ts`。
- 朗诵功能依赖浏览器的 `speechSynthesis` 能力，某些环境可能不支持。
- Tailwind 自定义色板中 `ink-*` 提供了偏宋刻风格的配色，可根据品牌视觉继续扩展。

欢迎在此基础上扩充数据字典（平水韵、常见典故、意象坐标等），或接入真实后端服务，打造完整的“文心声画坊”应用。
