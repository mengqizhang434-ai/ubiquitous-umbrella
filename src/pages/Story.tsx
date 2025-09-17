import { useMemo } from 'react';
import chaptersData from '../data/chapters.json' assert { type: 'json' };
import CanalMap from '../components/CanalMap';
import EcoCulturalSandbox from '../components/EcoCulturalSandbox';
import PosterExport from '../components/PosterExport';
import { StorySection } from '../components/StorySection';
import { useActiveSection } from '../hooks/useActiveSection';
import type { Chapter } from '../types';

const chapters = chaptersData as Chapter[];

export function Story() {
  const { activeId, register } = useActiveSection(
    chapters.map((chapter) => chapter.id),
    { threshold: 0.55 },
  );
  const activeChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === activeId) ?? chapters[0],
    [activeId],
  );

  const scrollToChapter = (chapter: Chapter) => {
    const section = document.querySelector<HTMLElement>(`[data-section-id="${chapter.id}"]`);
    section?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[minmax(340px,420px)_1fr]">
      <div className="flex max-h-[80vh] flex-col gap-6 overflow-y-auto pr-1">
        {chapters.map((chapter) => (
          <StorySection
            key={chapter.id}
            chapter={chapter}
            isActive={chapter.id === activeChapter.id}
            register={register(chapter.id)}
            onFocus={scrollToChapter}
          />
        ))}
      </div>
      <div className="flex flex-col gap-8">
        <div className="rounded-[32px] border border-heritage-ink/10 bg-white/80 p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-song text-2xl text-heritage-ink">城市水脉实景</h2>
              <p className="text-sm text-heritage-ink/60">章节滚动触发地图 flyTo 与点位高亮，纵览良渚—吴越—南宋—当代的连贯叙事。</p>
            </div>
            <div className="rounded-full border border-heritage-ink/10 bg-white/70 px-4 py-1 text-xs text-heritage-ink/60">
              当前章节：{activeChapter.title}
            </div>
          </div>
          <div className="mt-4 overflow-hidden rounded-3xl">
            <CanalMap focus={activeChapter.focus} activeChapter={activeChapter} />
          </div>
        </div>
        <EcoCulturalSandbox />
        <PosterExport chapter={activeChapter} />
      </div>
    </div>
  );
}

export default Story;
