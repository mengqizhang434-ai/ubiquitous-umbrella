import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseActiveSectionOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useActiveSection(ids: string[], options: UseActiveSectionOptions = {}) {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef(new Map<string, HTMLElement>());

  const threshold = options.threshold ?? 0.5;
  const rootMargin = options.rootMargin ?? '0px 0px -10% 0px';

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= threshold * 0.6)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const topEntry = visible[0];
          const id = (topEntry.target as HTMLElement).dataset.sectionId;
          if (id && id !== activeId) {
            setActiveId(id);
          }
          return;
        }

        const fallback = [...elementsRef.current.entries()]
          .map(([id, element]) => ({ id, rect: element.getBoundingClientRect() }))
          .sort((a, b) => Math.abs(a.rect.top) - Math.abs(b.rect.top))[0];
        if (fallback && fallback.id !== activeId) {
          setActiveId(fallback.id);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observerRef.current = observer;
    elementsRef.current.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [activeId, rootMargin, threshold]);

  const register = useCallback(
    (id: string) =>
      (element: HTMLElement | null) => {
        const map = elementsRef.current;
        const current = map.get(id);
        if (current && observerRef.current) {
          observerRef.current.unobserve(current);
        }

        if (element) {
          element.dataset.sectionId = id;
          map.set(id, element);
          observerRef.current?.observe(element);
        } else {
          map.delete(id);
        }
      },
    [],
  );

  const orderedIds = useMemo(() => ids, [ids]);

  useEffect(() => {
    if (!activeId && orderedIds.length > 0) {
      setActiveId(orderedIds[0]);
    }
  }, [activeId, orderedIds]);

  return {
    activeId,
    register,
  } as const;
}

export default useActiveSection;
