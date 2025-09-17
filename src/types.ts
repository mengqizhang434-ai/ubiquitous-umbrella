export type Tone = '平' | '仄' | '中'

export interface ToneSegment {
  char: string
  tone: Tone
  isRhyme?: boolean
  isDeviation?: boolean
  note?: string
}

export interface PoemLine {
  label: string
  segments: ToneSegment[]
  pattern: string
  suggestion?: string
}

export interface Allusion {
  id: string
  term: string
  explanation: string
  source: string
  quote: string
  further?: string
}

export interface ImagerySpot {
  id: string
  name: string
  dynasty: string
  timeline: string
  location: string
  figure: string
  description: string
  coordinates: { x: number; y: number }
}

export interface ExportPreset {
  id: string
  title: string
  subtitle: string
  background: string
  accent: string
}

export interface PoemAnalysis {
  title: string
  subtitle: string
  form: string
  theme: string
  mode: '古典格律' | '现代题旨×古典格律'
  meterNotes: string[]
  rhymeScheme: string
  lines: PoemLine[]
  allusions: Allusion[]
  imagery: ImagerySpot[]
  exports: ExportPreset[]
  heatmap: number[][]
  keywords: string[]
}

export type FormKey = 'jueju' | 'lvshi' | 'ci'
