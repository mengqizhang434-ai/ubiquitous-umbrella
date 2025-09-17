import type { FC } from 'react'
import type { PoemAnalysis, PoemLine, ToneSegment } from '../types'

const toneClasses: Record<ToneSegment['tone'], string> = {
  平: 'bg-emerald-100 text-emerald-900 border border-emerald-200',
  仄: 'bg-amber-100 text-amber-900 border border-amber-200',
  中: 'bg-slate-100 text-slate-600 border border-slate-200',
}

const toneLabels: Record<ToneSegment['tone'], string> = {
  平: '平声',
  仄: '仄声',
  中: '中性位',
}

interface PoemCanvasProps {
  analysis: PoemAnalysis
}

const PoemCanvas: FC<PoemCanvasProps> = ({ analysis }) => {
  const maxLength = analysis.heatmap.reduce((acc, row) => Math.max(acc, row.length), 0)

  const renderLine = (line: PoemLine) => {
    const text = line.segments.map((segment) => segment.char).join('')
    return (
      <div key={text} className="rounded-xl bg-white/80 p-4 shadow-sm ring-1 ring-ink-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-1 text-xl font-display tracking-wide">
              {line.segments.map((segment, index) => (
                <span
                  key={`${segment.char}-${index}`}
                  className={`inline-flex min-w-8 items-center justify-center rounded-md px-1.5 py-1 transition-colors ${toneClasses[segment.tone]} ${segment.isRhyme ? 'ring-2 ring-offset-1 ring-emerald-400' : ''} ${segment.isDeviation ? 'ring-2 ring-offset-1 ring-rose-400' : ''}`}
                  title={`${toneLabels[segment.tone]}${segment.isRhyme ? ' · 押韵' : ''}${segment.isDeviation ? ' · 建议调整' : ''}`}
                >
                  {segment.char}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-ink-500">
              <span className="inline-flex items-center gap-2 rounded-full bg-ink-50 px-3 py-1 font-medium text-ink-600">
                <span className="h-2 w-2 rounded-full bg-ink-400" />{line.pattern}
              </span>
              {line.suggestion && (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-rose-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v4m0 4h.01M5.4 20h13.2a1.4 1.4 0 0 0 1.243-2.1l-6.6-11.55a1.4 1.4 0 0 0-2.426 0L4.157 17.9A1.4 1.4 0 0 0 5.4 20Z"
                    />
                  </svg>
                  {line.suggestion}
                </span>
              )}
            </div>
          </div>
          <span className="mt-1 shrink-0 rounded-full bg-ink-900/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink-50">
            {line.label}
          </span>
        </div>
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-ink-100 bg-gradient-to-br from-white via-ink-50/40 to-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-display text-ink-800">{analysis.title}</h2>
            <p className="text-sm text-ink-500">{analysis.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
              {analysis.mode}
            </span>
            <span className="rounded-full bg-ink-900 px-4 py-1 text-sm font-medium text-ink-50">{analysis.form}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-sm text-ink-600">
          {analysis.keywords.map((keyword) => (
            <span key={keyword} className="rounded-full bg-ink-100/70 px-3 py-1">
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {analysis.lines.map((line) => (
          <div key={`${line.label}-${line.pattern}`}>{renderLine(line)}</div>
        ))}
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white/90 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-ink-800">格律总览</h3>
          <div className="flex items-center gap-3 text-sm text-ink-600">
            {(['平', '仄', '中'] as ToneSegment['tone'][]).map((tone) => (
              <span key={tone} className="inline-flex items-center gap-2 rounded-full bg-ink-50 px-3 py-1">
                <span className={`h-3 w-3 rounded-full ${tone === '平' ? 'bg-emerald-400' : tone === '仄' ? 'bg-amber-400' : 'bg-slate-300'}`} />
                {toneLabels[tone]}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${maxLength}, minmax(0, 1fr))`,
            }}
          >
            {analysis.heatmap.map((row, rowIndex) =>
              Array.from({ length: maxLength }, (_, columnIndex) => {
                const value = row[columnIndex] ?? 0
                return (
                  <div
                    key={`${rowIndex}-${columnIndex}`}
                    className={`flex h-10 items-center justify-center rounded-md text-sm font-medium ${
                      value === 1
                        ? 'bg-emerald-100/80 text-emerald-700'
                        : value === -1
                          ? 'bg-amber-100/80 text-amber-700'
                          : 'bg-slate-100/80 text-slate-500'
                    }`}
                  >
                    {value === 0 ? '·' : value === 1 ? '平' : '仄'}
                  </div>
                )
              }),
            )}
          </div>
          <p className="mt-4 text-sm text-ink-500">押韵走向：{analysis.rhymeScheme}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white/70 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-ink-800">系统建议</h3>
        <ul className="mt-3 grid gap-2 text-sm text-ink-600 md:grid-cols-2">
          {analysis.meterNotes.map((note) => (
            <li key={note} className="flex items-start gap-2">
              <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-emerald-400" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default PoemCanvas
