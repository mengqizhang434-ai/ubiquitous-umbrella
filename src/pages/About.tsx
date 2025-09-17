export function About() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="rounded-[32px] border border-heritage-ink/10 bg-white/80 p-8 shadow-xl">
        <h1 className="font-song text-3xl text-heritage-ink">设计说明</h1>
        <p className="mt-4 text-sm leading-relaxed text-heritage-ink/70">
          《宋韵·杭州城》沉浸式故事地图以 React + Vite + TypeScript 打造，结合 MapLibre、ECharts、Framer Motion 与 Tailwind。
          通过离线可用的构建方案（Vite base='./'，build 输出 docs/）支持一键打包巡展。
        </p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl border border-heritage-ink/10 bg-white/70 p-6 shadow-sm">
          <h2 className="font-song text-xl text-heritage-ink">时间轴 + 地图分镜</h2>
          <p className="mt-3 text-sm leading-relaxed text-heritage-ink/70">
            左侧章节列表采用 IntersectionObserver 监测 50% 视窗进入，右侧 MapLibre 地图随之 flyTo 对应镜头并高亮点位，实现 “良渚 → 吴越 → 南宋 → 当代活化” 的连续视觉叙事。
          </p>
        </article>
        <article className="rounded-3xl border border-heritage-ink/10 bg-white/70 p-6 shadow-sm">
          <h2 className="font-song text-xl text-heritage-ink">“宋式生活”微沙盘</h2>
          <p className="mt-3 text-sm leading-relaxed text-heritage-ink/70">
            通过 3 个滑杆权重（礼乐 / 书画 / 茶事）驱动雷达与柱状双图，实现文化浸润与经济拉动的组合模拟，全部计算逻辑纯前端完成。
          </p>
        </article>
        <article className="rounded-3xl border border-heritage-ink/10 bg-white/70 p-6 shadow-sm">
          <h2 className="font-song text-xl text-heritage-ink">一键海报导出</h2>
          <p className="mt-3 text-sm leading-relaxed text-heritage-ink/70">
            借助 HTML2Canvas 将当前章节标题、三张代表卡片与当日日期合成 PNG，方便线下展陈或社交媒体传播。
          </p>
        </article>
        <article className="rounded-3xl border border-heritage-ink/10 bg-white/70 p-6 shadow-sm">
          <h2 className="font-song text-xl text-heritage-ink">数据结构</h2>
          <p className="mt-3 text-sm leading-relaxed text-heritage-ink/70">
            /src/data 目录存放章节、点位、运河线与当代项目的 GeoJSON/JSON 数据，每项含 title、era、summary、media[]、refs[] 字段，易于扩展与替换。
          </p>
        </article>
      </section>
      <footer className="rounded-3xl border border-heritage-ink/10 bg-white/70 p-6 text-center text-xs text-heritage-ink/60">
        npm run build 后生成 docs/，双击 docs/index.html 即可离线演示。
      </footer>
    </div>
  );
}

export default About;
