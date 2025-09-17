import { Link } from 'react-router-dom';
import chaptersData from '../data/chapters.json' assert { type: 'json' };
import type { Chapter } from '../types';

const chapters = chaptersData as Chapter[];

export function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
      <section className="grid gap-10 rounded-[40px] border border-heritage-ink/10 bg-white/80 p-10 shadow-xl lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <span className="rounded-full bg-heritage-jade/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-heritage-jade">
            宋韵·杭州城
          </span>
          <h1 className="font-song text-4xl leading-tight text-heritage-ink md:text-5xl">
            一张沉浸式故事地图，串联良渚古城、大运河与南宋行在城的千年文脉。
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-heritage-ink/70">
            通过时间轴、地图分镜与“宋式生活”微沙盘，一屏讲清「良渚 → 吴越 → 南宋 → 当代活化」的历史脉络与城市再生。
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-heritage-ink/60">
            <span className="rounded-full border border-heritage-ink/10 px-4 py-1">MapLibre 沉浸式镜头</span>
            <span className="rounded-full border border-heritage-ink/10 px-4 py-1">ECharts 动态沙盘</span>
            <span className="rounded-full border border-heritage-ink/10 px-4 py-1">Framer Motion 分镜动画</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/story"
              className="rounded-full bg-heritage-jade px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-heritage-jade/90"
            >
              开始探索
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-heritage-jade/40 px-6 py-3 text-sm font-semibold text-heritage-jade hover:bg-heritage-jade/10"
            >
              设计说明
            </Link>
          </div>
        </div>
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-heritage-ink/10 bg-gradient-to-br from-heritage-jade/10 via-white to-heritage-amber/10 p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,118,110,0.15),transparent_60%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-heritage-ink/50">Timeline</p>
              <h2 className="mt-2 font-song text-2xl text-heritage-ink">千年水脉的城与人</h2>
              <p className="mt-3 text-sm leading-relaxed text-heritage-ink/70">
                从良渚文明的水利体系，到吴越钱塘的海塘筑城，再到南宋临安的礼乐书画，以及当代大运河的活化项目，时间在城河之间流动。
              </p>
            </div>
            <ul className="space-y-3 text-sm text-heritage-ink/70">
              {chapters.map((chapter) => (
                <li key={chapter.id} className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                  <span className="font-song text-base text-heritage-ink">{chapter.title}</span>
                  <span className="text-xs text-heritage-ink/50">{chapter.era}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="grid gap-8 rounded-[32px] border border-heritage-ink/10 bg-white/70 p-8 shadow-lg md:grid-cols-3">
        {[
          {
            title: '时间轴分镜',
            description: '章节进入 50% 视窗即触发地图飞行与高亮，呈现千年城河的动态时空。',
          },
          {
            title: '互动沙盘',
            description: '调节礼乐、书画、茶事权重，观察文化浸润与产业活力的协奏效果。',
          },
          {
            title: '一键海报',
            description: '将当前章节的标题、代表卡片与日期组合导出 PNG，便于传播与复盘。',
          },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-heritage-ink/10 bg-white/80 p-6 shadow-sm">
            <h3 className="font-song text-xl text-heritage-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-heritage-ink/70">{item.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
