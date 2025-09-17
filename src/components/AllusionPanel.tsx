import type { FC } from 'react'
import type { Allusion } from '../types'

interface AllusionPanelProps {
  allusions: Allusion[]
  activeId?: string
  onSelect: (id: string) => void
}

const AllusionPanel: FC<AllusionPanelProps> = ({ allusions, activeId, onSelect }) => {
  const active = allusions.find((item) => item.id === activeId) ?? allusions[0]

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-ink-800">用典卡片</h3>
          <p className="text-sm text-ink-500">悬停查看典故释义、出处原文与延伸阅读</p>
        </div>
      </header>
      <div className="grid gap-3 md:grid-cols-3">
        {allusions.map((item) => {
          const isActive = item.id === active?.id
          return (
            <button
              type="button"
              key={item.id}
              onMouseEnter={() => onSelect(item.id)}
              onFocus={() => onSelect(item.id)}
              onClick={() => onSelect(item.id)}
              className={`rounded-xl border px-4 py-3 text-left transition-all ${
                isActive
                  ? 'border-emerald-400 bg-emerald-50/60 shadow-sm'
                  : 'border-ink-100 bg-white/60 hover:border-emerald-300 hover:bg-emerald-50/40'
              }`}
            >
              <p className="text-sm font-medium text-ink-500">{item.source}</p>
              <p className="mt-1 text-lg font-display text-ink-800">{item.term}</p>
              <p className="mt-2 text-sm text-ink-600">
                {item.explanation.length > 46 ? `${item.explanation.slice(0, 46)}...` : item.explanation}
              </p>
            </button>
          )
        })}
      </div>
      {active && (
        <div className="rounded-2xl border border-ink-100 bg-white/80 p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-ink-500">{active.source}</span>
            <h4 className="text-2xl font-display text-ink-800">{active.term}</h4>
            <p className="text-sm leading-relaxed text-ink-600">{active.explanation}</p>
            <blockquote className="mt-3 rounded-xl bg-ink-900/80 p-4 text-sm text-ink-100">
              “{active.quote}”
            </blockquote>
            {active.further && <p className="text-sm text-ink-500">延伸阅读：{active.further}</p>}
          </div>
        </div>
      )}
    </section>
  )
}

export default AllusionPanel
