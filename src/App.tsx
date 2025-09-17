import { useMemo, useState } from 'react'
import AllusionPanel from './components/AllusionPanel'
import ExportPanel from './components/ExportPanel'
import ImageryMap from './components/ImageryMap'
import PoemCanvas from './components/PoemCanvas'
import { generatePoem, type ModeKey } from './generator'
import type { FormKey, PoemAnalysis } from './types'

const formOptions: Array<{ key: FormKey; label: string; description: string }> = [
  { key: 'jueju', label: '绝句', description: '四句成章，适合即席展示平仄可视化。' },
  { key: 'lvshi', label: '律诗', description: '八句粘对，突出对仗与学术讲解。' },
  { key: 'ci', label: '词牌', description: '曲调婉转，适配配乐朗诵场景。' },
]

const modeOptions: Array<{ key: ModeKey; label: string; description: string }> = [
  { key: 'classic', label: '古典格律', description: '严格依循平水韵，自动校正字位。' },
  { key: 'hybrid', label: '现代题旨 × 古典格律', description: '允许现代词汇嵌入，给出中性位提示。' },
]

function App() {
  const [theme, setTheme] = useState('江南春意与数字人文')
  const [formKey, setFormKey] = useState<FormKey>('jueju')
  const [mode, setMode] = useState<ModeKey>('classic')
  const [poem, setPoem] = useState<PoemAnalysis>(() => generatePoem('江南春意与数字人文', 'jueju', 'classic'))
  const [selectedAllusion, setSelectedAllusion] = useState<string>(poem.allusions[0]?.id ?? '')
  const [selectedSpot, setSelectedSpot] = useState<string>(poem.imagery[0]?.id ?? '')
  const [statusMessage, setStatusMessage] = useState('')

  const workflowSteps = useMemo(
    () => [
      '主题输入',
      formOptions.find((option) => option.key === formKey)?.label ?? '体裁',
      modeOptions.find((option) => option.key === mode)?.label ?? '模式',
      '格律分析',
      '用典地图',
      '海报 / 朗诵导出',
    ],
    [formKey, mode],
  )

  const handleGenerate = () => {
    const next = generatePoem(theme, formKey, mode)
    setPoem(next)
    setSelectedAllusion(next.allusions[0]?.id ?? '')
    setSelectedSpot(next.imagery[0]?.id ?? '')
    setStatusMessage('')
  }

  const handleSpeak = () => {
    if (typeof window === 'undefined' || typeof window.speechSynthesis === 'undefined') {
      setStatusMessage('当前环境暂不支持朗诵，可导出文本后使用专业配音工具。')
      return
    }
    const utterance = new SpeechSynthesisUtterance()
    utterance.text = `${poem.title}。${poem.lines
      .map((line) => line.segments.map((segment) => segment.char).join(''))
      .join('。')}。`
    utterance.rate = mode === 'classic' ? 0.9 : 1.05
    utterance.pitch = mode === 'classic' ? 0.85 : 1.0
    utterance.onstart = () => setStatusMessage('正在播报，请留意设备音量。')
    utterance.onend = () => setStatusMessage('朗诵完成，可导出音频或切换其他声音。')
    utterance.onerror = () => setStatusMessage('朗诵出现异常，请刷新或更换浏览器。')
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="min-h-screen bg-ink-50 pb-16">
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-amber-50 via-white to-emerald-50">
        <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 160 160\' width=\'160\' height=\'160\'%3E%3Cpath d=\'M0 0h160v160H0z\' fill=\'none\' stroke=\'rgba(140,116,84,0.08)\' stroke-width=\'0.5\'/%3E%3C/svg%3E')]" />
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 text-ink-900 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <p className="text-sm font-medium text-emerald-700">赛题一 · 文心声画坊</p>
            <h1 className="text-4xl font-display text-ink-900 md:text-5xl">AI 赋能古典诗文的“可视化创作与讲解”工作台</h1>
            <p className="max-w-2xl text-base leading-relaxed text-ink-600">
              输入主题，系统即刻生成合乎格律的诗词作品，自动标注平仄、用典出处、意象地图，并提供海报 / 朗诵 / H5 等一键导出方案，帮助评委现场检验“学术深度 × 前端表达”。
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-ink-600">
            {workflowSteps.map((step, index) => (
              <span key={step} className="rounded-full bg-white/80 px-3 py-1 shadow-sm">
                {index + 1}. {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto mt-8 flex max-w-6xl flex-col gap-10 px-4">
        <section className="rounded-3xl border border-ink-100 bg-white/90 p-6 shadow-lg shadow-ink-100/40">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <div>
                <label htmlFor="theme" className="text-sm font-medium text-ink-700">
                  请输入题旨 / 场景提示
                </label>
                <textarea
                  id="theme"
                  value={theme}
                  onChange={(event) => setTheme(event.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-ink-100 bg-ink-50/60 p-4 text-sm text-ink-800 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="例如：江南春色 × 数字人文展陈 / 寒食夜游 × XR 演示"
                />
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-ink-700">体裁选择</p>
                <div className="flex flex-wrap gap-2">
                  {formOptions.map((option) => {
                    const isActive = option.key === formKey
                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => setFormKey(option.key)}
                        className={`rounded-2xl border px-4 py-2 text-sm transition ${
                          isActive
                            ? 'border-emerald-500 bg-emerald-100 text-emerald-800 shadow-sm'
                            : 'border-ink-100 bg-white text-ink-700 hover:border-emerald-300 hover:text-emerald-700'
                        }`}
                      >
                        <span className="block text-base font-display">{option.label}</span>
                        <span className="block text-[11px] text-ink-500">{option.description}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium text-ink-700">创作模式</p>
                <div className="flex flex-wrap gap-2">
                  {modeOptions.map((option) => {
                    const isActive = option.key === mode
                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => setMode(option.key)}
                        className={`rounded-2xl border px-4 py-2 text-sm transition ${
                          isActive
                            ? 'border-ink-900 bg-ink-900 text-ink-50 shadow-sm'
                            : 'border-ink-200 bg-white text-ink-700 hover:border-ink-400'
                        }`}
                      >
                        <span className="block text-base font-display">{option.label}</span>
                        <span className="block text-[11px] text-ink-300">{option.description}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              <button
                type="button"
                onClick={handleGenerate}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500 bg-emerald-600 px-6 py-2 text-sm font-medium text-emerald-50 shadow-sm transition hover:bg-emerald-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                一键生成诗稿
              </button>
            </div>
            <div className="space-y-4 rounded-2xl border border-ink-100 bg-ink-50/80 p-5 shadow-inner">
              <h3 className="text-sm font-semibold text-ink-700">实时预览</h3>
              <p className="text-sm text-ink-600">
                根据体裁自动加载平仄模版，生成后可在下方查看可视化格律、典故卡片与意象地图。可在现场通过大屏展示或嵌入直播。
              </p>
              <ul className="space-y-2 text-sm text-ink-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  平仄标色：绿色为平声、金色为仄声、灰色为中性位。
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                  押韵字会自动高亮，并给出修改建议。
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-400" />
                  违规字位提示红圈，可点击建议快速替换。
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <PoemCanvas analysis={poem} />
          <div className="space-y-10">
            <AllusionPanel allusions={poem.allusions} activeId={selectedAllusion} onSelect={setSelectedAllusion} />
            <ImageryMap spots={poem.imagery} activeId={selectedSpot} onHover={setSelectedSpot} />
          </div>
        </div>

        <ExportPanel analysis={poem} onSpeak={handleSpeak} statusMessage={statusMessage} />
      </main>
    </div>
  )
}

export default App
