# 《宋韵·杭州城》沉浸式故事地图

基于 React、TypeScript 与 Vite 构建的一屏式故事地图，通过时间轴、MapLibre 地图分镜、ECharts “宋式生活”沙盘以及海报导出，一体化讲述「良渚 → 吴越 → 南宋 → 当代活化」的城市叙事。

## 技术栈
- **Vite + React + TypeScript**：快速开发与离线打包，`vite.config.ts` 设定 `base: './'`、`build.outDir: 'docs'` 方便双击演示。
- **Tailwind CSS**：宋韵主题的 UI 样式与响应式布局。
- **MapLibre GL JS**：免 Key 底图，加载运河线、十景点、南宋城范围与当代活化项目，并支持章节镜头 `flyTo` 与 Popup。
- **ECharts**：雷达 + 柱状图组合展示“宋式生活”微沙盘动态权重。
- **Framer Motion**：章节分镜、卡片动画与时间轴高亮。
- **html2canvas**：一键导出章节海报 PNG。

## 关键特性
- **滚动联动**：`useActiveSection` 利用 IntersectionObserver，当章节进入视窗 50% 时触发地图飞行与图层高亮。
- **地图组件**：`CanalMap` 解析 `/src/data/*.geojson` 并添加高亮层，点击点位即可弹出说明。
- **宋式生活沙盘**：`EcoCulturalSandbox` 提供礼乐 / 书画 / 茶事 3 个滑杆，实时刷新雷达与柱状图指标。
- **海报导出**：`PosterExport` 将当前章节的标题、卡片、日期合成 PNG，用于传播或线下展示。
- **离线体验**：仓库内已附带最新 `docs/` 离线包，直接双击 `docs/index.html` 即可体验；若需更新内容，可执行 `npm run build` 重新生成。

## 开发指南
```bash
npm install
npm run dev      # 本地开发
npm run lint     # ESLint 检查
npm run build    # 产出离线版（docs/）
```

## 数据结构
`/src/data` 目录包含章节、点位、运河线与当代项目，字段统一为 `title`、`era`、`summary`、`media[]`、`refs[]` 以便拓展。

## MVP 验收
- 4 章滚动触发地图镜头。
- 地图点位弹出说明卡片。
- “宋式生活”沙盘联动雷达 + 柱状图。
- 海报导出 PNG。
- `npm run build` 后生成 `docs/`，离线可用。
