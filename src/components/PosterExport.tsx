import { useRef } from 'react';
import html2canvas from 'html2canvas';
import type { Chapter } from '../types';

type PosterExportProps = {
  chapter: Chapter;
};

export function PosterExport({ chapter }: PosterExportProps) {
  const posterRef = useRef<HTMLDivElement | null>(null);

  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleExport = async () => {
    if (!posterRef.current) {
      return;
    }

    const canvas = await html2canvas(posterRef.current, {
      backgroundColor: '#f7f5f0',
      scale: 2,
    });
    const link = document.createElement('a');
    link.download = `${chapter.id}-poster.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="rounded-3xl border border-heritage-ink/10 bg-white/90 p-6 shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-song text-lg text-heritage-ink">章节快照海报</h3>
          <p className="text-xs text-heritage-ink/60">自动组合章节标题、三张记忆卡片与日期，导出一张 PNG。</p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="rounded-full bg-heritage-jade px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-heritage-jade/90"
        >
          导出海报
        </button>
      </div>
      <div
        ref={posterRef}
        className="mt-5 flex flex-col gap-4 rounded-3xl border border-heritage-ink/10 bg-gradient-to-br from-white via-heritage-jade/5 to-heritage-amber/10 p-6"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-heritage-ink/50">宋韵·杭州城 STORY MAP</p>
          <h4 className="mt-2 font-song text-2xl text-heritage-ink">{chapter.title}</h4>
          <p className="text-sm text-heritage-jade">{chapter.era}</p>
          <p className="mt-3 text-xs leading-relaxed text-heritage-ink/70">{chapter.summary}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {chapter.media.slice(0, 3).map((src) => (
            <div
              key={src}
              className="flex h-24 items-end rounded-2xl border border-white/60 bg-white/40 p-3 text-[10px] font-medium text-heritage-ink/70"
              style={{ backgroundImage: `linear-gradient(135deg, rgba(15,118,110,0.15), rgba(248,250,252,0.85)), url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <span className="rounded-full bg-white/80 px-2 py-1">{src.split('/').pop()}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-heritage-ink/60">
          <span>参考：{chapter.refs.join('、')}</span>
          <span>{today}</span>
        </div>
      </div>
    </div>
  );
}

export default PosterExport;
