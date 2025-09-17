import type { FC } from 'react'
import type { ExportPreset, PoemAnalysis } from '../types'

interface ExportPanelProps {
  analysis: PoemAnalysis
  onSpeak: () => void
  statusMessage?: string
}

const ExportPanel: FC<ExportPanelProps> = ({ analysis, onSpeak, statusMessage }) => {
  const renderPreview = (preset: ExportPreset) => (
    <div
      key={preset.id}
      className={`rounded-2xl border ${preset.accent} bg-gradient-to-br ${preset.background} p-5 text-ink-900 shadow-inner`}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-ink-600">{preset.title}</p>
      <h4 className="mt-2 text-xl font-display">{analysis.theme}</h4>
      <p className="mt-3 text-sm text-ink-700">{preset.subtitle}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-700">
        {analysis.keywords.slice(0, 4).map((keyword) => (
          <span key={keyword} className="rounded-full border border-white/70 bg-white/40 px-2 py-1">
            {keyword}
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-ink-800">一键导出</h3>
          <p className="text-sm text-ink-500">海报 / 朗诵音频 / H5 长条说明书</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-full border border-emerald-400 bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700 shadow-sm transition hover:bg-emerald-200"
          >
            导出 SVG/PNG
          </button>
          <button
            type="button"
            onClick={onSpeak}
            className="rounded-full border border-ink-300 bg-white px-4 py-1 text-sm font-medium text-ink-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
          >
            试听朗诵
          </button>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {analysis.exports.map((preset) => renderPreview(preset))}
      </div>
      {statusMessage && <p className="text-xs text-emerald-600">{statusMessage}</p>}
      <div className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/70 p-5 text-sm text-ink-600">
        <p>
          H5 模板预留章节：主题导语 → 格律可视化 → 典故卡片 → Mapbox GL 意象地图 → 结语 CTA。全流程支持一键打包成
          PDF 说明书。
        </p>
      </div>
    </section>
  )
}

export default ExportPanel
