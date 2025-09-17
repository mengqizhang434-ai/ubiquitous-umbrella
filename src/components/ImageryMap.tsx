import type { FC } from 'react'
import type { ImagerySpot } from '../types'

interface ImageryMapProps {
  spots: ImagerySpot[]
  activeId?: string
  onHover: (id: string) => void
}

const ImageryMap: FC<ImageryMapProps> = ({ spots, activeId, onHover }) => {
  const active = spots.find((spot) => spot.id === activeId) ?? spots[0]

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-ink-800">意象地图</h3>
        <p className="text-sm text-ink-500">将“江南 / 边塞 / 寒食”等意象对映时空与人物谱系</p>
      </header>
      <div className="rounded-2xl border border-ink-100 bg-white/80 p-6 shadow-sm">
        <div
          className="relative h-72 w-full overflow-hidden rounded-2xl border border-ink-100 bg-[radial-gradient(circle_at_20%_20%,rgba(130,171,169,0.25),transparent),radial-gradient(circle_at_80%_40%,rgba(229,207,174,0.35),transparent)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\' viewBox=\'0 0 120 120\'%3E%3Cpath d=\'M0 60h120M60 0v120\' fill=\'none\' stroke=\'rgba(73,56,38,0.08)\' stroke-width=\'1\'/%3E%3C/svg%3E')] opacity-70" />
          {spots.map((spot) => {
            const isActive = spot.id === active?.id
            return (
              <button
                key={spot.id}
                type="button"
                onMouseEnter={() => onHover(spot.id)}
                onFocus={() => onHover(spot.id)}
                onClick={() => onHover(spot.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1 text-sm font-medium transition-all ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-100/80 text-emerald-800 shadow-lg'
                    : 'border-ink-200 bg-white/70 text-ink-700 hover:border-emerald-300 hover:bg-emerald-50/70'
                }`}
                style={{ left: `${spot.coordinates.x}%`, top: `${spot.coordinates.y}%` }}
              >
                {spot.name}
              </button>
            )
          })}
        </div>
        {active && (
          <div className="mt-6 grid gap-3 md:grid-cols-[1.2fr_1fr]">
            <div className="rounded-xl bg-ink-50/70 p-4">
              <p className="text-sm font-medium text-ink-500">
                {active.dynasty} · {active.timeline}
              </p>
              <h4 className="mt-1 text-xl font-display text-ink-800">{active.name}</h4>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">{active.description}</p>
            </div>
            <div className="rounded-xl border border-ink-100 bg-white/80 p-4 text-sm text-ink-600">
              <p>
                <span className="font-medium text-ink-700">地点：</span>
                {active.location}
              </p>
              <p className="mt-1">
                <span className="font-medium text-ink-700">关联人物：</span>
                {active.figure}
              </p>
              <p className="mt-1 text-xs text-ink-500">
                坐标以虚拟舞台定位，便于在 Mapbox 场景中定位互动热点。
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ImageryMap
