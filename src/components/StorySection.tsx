import { motion } from 'framer-motion';
import type { Chapter } from '../types';

type StorySectionProps = {
  chapter: Chapter;
  isActive: boolean;
  register: (element: HTMLElement | null) => void;
  onFocus?: (chapter: Chapter) => void;
};

export function StorySection({ chapter, isActive, register, onFocus }: StorySectionProps) {
  return (
    <section
      ref={register}
      data-section-id={chapter.id}
      className="group relative flex flex-col gap-4 rounded-3xl border border-heritage-ink/10 bg-white/80 p-6 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="relative flex flex-col items-center">
          <span className="h-4 w-4 rounded-full border-2 border-heritage-ink/40 bg-white" />
          <span className="mt-1 h-full w-px flex-1 bg-gradient-to-b from-heritage-ink/40 to-transparent" />
          {isActive && (
            <motion.span
              layoutId="timeline-pulse"
              className="absolute -left-3 top-0 h-10 w-10 rounded-full bg-heritage-amber/40"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-song text-xl text-heritage-ink">{chapter.title}</h2>
              <p className="text-sm text-heritage-jade">{chapter.era}</p>
            </div>
            <button
              type="button"
              onClick={() => onFocus?.(chapter)}
              className="rounded-full border border-heritage-jade/40 px-4 py-1 text-xs font-medium text-heritage-jade transition hover:bg-heritage-jade hover:text-white"
            >
              镜头聚焦
            </button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-heritage-ink/80">{chapter.summary}</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {chapter.media.slice(0, 3).map((src) => (
              <motion.div
                key={src}
                whileHover={{ y: -4 }}
                className="flex h-24 items-end rounded-2xl border border-heritage-ink/10 bg-gradient-to-br from-heritage-jade/10 via-white to-heritage-amber/10 p-3 text-xs text-heritage-ink/70"
                style={{ backgroundImage: `linear-gradient(135deg, rgba(15,118,110,0.08), rgba(245,158,11,0.06)), url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <span className="rounded-full bg-white/80 px-2 py-1 text-[10px] font-medium text-heritage-ink/80">
                  {src.split('/').pop()}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-heritage-ink/50">
            {chapter.refs.map((ref) => (
              <span key={ref} className="rounded-full border border-heritage-ink/10 bg-heritage-ink/5 px-3 py-1">
                {ref}
              </span>
            ))}
          </div>
        </div>
      </div>
      {isActive && (
        <motion.div
          layoutId="active-glow"
          className="pointer-events-none absolute inset-0 -z-10 rounded-3xl border border-heritage-jade/30 bg-gradient-to-br from-white via-heritage-jade/5 to-heritage-amber/10 opacity-90"
        />
      )}
    </section>
  );
}

export default StorySection;
