import type { Allusion, FormKey, ImagerySpot, PoemAnalysis, PoemLine, Tone, ToneSegment } from './types'

const FORM_CONFIG: Record<
  FormKey,
  {
    name: string
    subtitle: string
    description: string
    patterns: Array<{
      label: string
      template: string
      pattern: string
      rhymeIndices: number[]
      deviationIndices?: number[]
      suggestion?: string
    }>
    baseAllusions: Allusion[]
    baseImagery: ImagerySpot[]
    exports: { background: string; accent: string }[]
  }
> = {
  jueju: {
    name: '七言绝句',
    subtitle: '仄起平收 · 平水下平声「尤」韵',
    description:
      '首句仄起，颈尾皆押「尤」韵，适合描绘意境凝练、节奏明快的图景。',
    patterns: [
      {
        label: '首句',
        template: '晓风携梦入{theme}堤',
        pattern: '仄仄平平仄仄平',
        rhymeIndices: [6],
        deviationIndices: [2],
        suggestion: '第三字宜为平声，可尝试改作“晓霜吹梦入{theme}堤”。',
      },
      {
        label: '颔句',
        template: '画舫轻摇闻鹧鸪',
        pattern: '仄仄平平平仄平',
        rhymeIndices: [6],
      },
      {
        label: '颈句',
        template: '烟雨花朝连宋玉',
        pattern: '平仄平平仄仄平',
        rhymeIndices: [6],
        deviationIndices: [3],
        suggestion: '第四字宜仄，可将“雨”换作“雾”以守格。',
      },
      {
        label: '尾句',
        template: '兰舟泊月待归舟',
        pattern: '平平仄仄仄平平',
        rhymeIndices: [6],
      },
    ],
    baseAllusions: [
      {
        id: 'xishi',
        term: '西施浣纱',
        explanation: '取春水荡漾、浣纱女影的柔美意象，与江南暮色互为映衬。',
        source: '《越绝书·外传记卷二》',
        quote: '西施浣纱于苧萝溪，苧萝之溪可见于今。',
        further: '参见王昌龄《采莲曲》对江南水乡的再创造。',
      },
      {
        id: 'hezhou',
        term: '木兰舟',
        explanation: '借用《木兰辞》中“旦辞爷娘去，暮宿黄河边”的舟行意象，承接兰舟泊月。',
        source: '《乐府诗集·木兰诗》',
        quote: '旦辞爷娘去，暮宿黄河边。',
      },
      {
        id: 'songyu',
        term: '宋玉登台',
        explanation: '宋玉以悲秋著称，此处移其“高台赋景”，与烟雨花朝形成反衬。',
        source: '《楚辞·九辩》',
        quote: '登白玉之高台兮，望帝乡之何在。',
      },
    ],
    baseImagery: [
      {
        id: 'jiangnan-spring',
        name: '江南暮春',
        dynasty: '唐代',
        timeline: '开元二十年（732）',
        location: '苏州吴门',
        figure: '张志和',
        description: '渔歌子词人沿太湖泛舟，以琴鼓合拍，唱和湖上春色。',
        coordinates: { x: 62, y: 58 },
      },
      {
        id: 'yue-lake',
        name: '越溪浣纱',
        dynasty: '春秋',
        timeline: '公元前494年',
        location: '苧萝溪',
        figure: '西施',
        description: '越女浣纱，传说中“沉鱼”之典故所在地，象征柔婉之美。',
        coordinates: { x: 78, y: 66 },
      },
      {
        id: 'xiang-yu',
        name: '兰台月夜',
        dynasty: '汉代',
        timeline: '建安十五年（210）',
        location: '建业石头城',
        figure: '曹植',
        description: '曹植《赠白马王彪》中的兰台月色，被后世借指文人夜话之地。',
        coordinates: { x: 54, y: 72 },
      },
    ],
    exports: [
      { background: 'from-amber-50 via-rose-50 to-sky-100', accent: 'border-amber-500' },
      { background: 'from-slate-900 via-slate-800 to-slate-700', accent: 'border-teal-300' },
      { background: 'from-emerald-50 via-emerald-100 to-slate-100', accent: 'border-emerald-500' },
    ],
  },
  lvshi: {
    name: '七言律诗',
    subtitle: '平起式 · 对仗工整 · 首尾押「庚」韵',
    description:
      '律诗讲究粘对与平仄对仗，适合呈现“学术深度”的层层铺陈。',
    patterns: [
      {
        label: '首联上句',
        template: '云屏展卷听{theme}声',
        pattern: '平平仄仄仄平平',
        rhymeIndices: [6],
      },
      {
        label: '首联下句',
        template: '墨海摛辞问太清',
        pattern: '仄仄平平平仄平',
        rhymeIndices: [6],
        deviationIndices: [3],
        suggestion: '第四字宜仄，可将“辞”换作“章”以稳粘。',
      },
      {
        label: '颔联上句',
        template: '桂魄同圆牵楚瑟',
        pattern: '仄仄平平仄仄平',
        rhymeIndices: [6],
      },
      {
        label: '颔联下句',
        template: '蒲帆并起挽吴旌',
        pattern: '平平仄仄仄平平',
        rhymeIndices: [6],
      },
      {
        label: '颈联上句',
        template: '学海波澜容问学',
        pattern: '仄仄平平仄仄平',
        rhymeIndices: [6],
        deviationIndices: [5],
        suggestion: '第六字宜平声，可换“容讲学”。',
      },
      {
        label: '颈联下句',
        template: '星河卷影对吟灯',
        pattern: '平平仄仄仄平平',
        rhymeIndices: [6],
      },
      {
        label: '尾联上句',
        template: '诗成欲共千门赏',
        pattern: '平平仄仄仄平平',
        rhymeIndices: [6],
      },
      {
        label: '尾联下句',
        template: '数字江山入典坰',
        pattern: '仄仄平平平仄平',
        rhymeIndices: [6],
      },
    ],
    baseAllusions: [
      {
        id: 'guangling',
        term: '广陵散',
        explanation: '晋人嵇康绝响的琴曲，用以点出“声画坊”中音乐可视化的高古气。',
        source: '《晋书·列传·嵇康》',
        quote: '康鼓琴，奏广陵散，声慷慨而悲凉。',
      },
      {
        id: 'qinchuan',
        term: '秦川得雨',
        explanation: '杜甫诗句，喻技术赋能下的万物苏生。',
        source: '杜甫《春夜喜雨》',
        quote: '好雨知时节，当春乃发生。',
      },
      {
        id: 'wengong',
        term: '文翁石室',
        explanation: '西汉文翁设立学馆，象征地方知识传播的“H5讲解”。',
        source: '《汉书·文翁传》',
        quote: '蜀人好学，文翁之化也。',
      },
    ],
    baseImagery: [
      {
        id: 'stone-chamber',
        name: '蜀郡石室学宫',
        dynasty: '西汉',
        timeline: '元朔六年（前123）',
        location: '成都',
        figure: '文翁',
        description: '汉代官学先河，提供“讲解”功能的人文背景。',
        coordinates: { x: 38, y: 54 },
      },
      {
        id: 'qin-rain',
        name: '长安喜雨夜',
        dynasty: '唐代',
        timeline: '乾元元年（758）',
        location: '长安城',
        figure: '杜甫',
        description: '杜甫夜听春雨，意象与AI声画的交融遥相呼应。',
        coordinates: { x: 30, y: 42 },
      },
      {
        id: 'gaotang',
        name: '高唐神女梦',
        dynasty: '战国',
        timeline: '楚怀王时期',
        location: '洞庭西岸',
        figure: '宋玉',
        description: '宋玉梦游云雨台，启发视觉化幻境的叙事框架。',
        coordinates: { x: 55, y: 60 },
      },
    ],
    exports: [
      { background: 'from-sky-50 via-emerald-100 to-ink-100', accent: 'border-sky-500' },
      { background: 'from-zinc-900 via-slate-800 to-neutral-700', accent: 'border-amber-400' },
      { background: 'from-purple-50 via-rose-100 to-amber-50', accent: 'border-purple-400' },
    ],
  },
  ci: {
    name: '水龙吟（定风波体）',
    subtitle: '双调九十五字 · 仄起平收 · 用中州韵',
    description:
      '词体更强调情绪与旋律，适合作为“海报+音频”方案的母版。',
    patterns: [
      {
        label: '起段',
        template: '云幕轻开，数点流萤唤{theme}',
        pattern: '仄仄平平，仄仄平平仄仄',
        rhymeIndices: [6, -1],
      },
      {
        label: '承段',
        template: '桂魄敲银筝，锦瑟回声远',
        pattern: '仄仄平平平，仄仄平平仄',
        rhymeIndices: [6, -1],
      },
      {
        label: '转段',
        template: '画屏深，弦索换宫，声随水转',
        pattern: '仄平平，平仄仄平，平平仄仄',
        rhymeIndices: [4, -1],
        deviationIndices: [5],
        suggestion: '第五字宜平，可改“换宫”作“换音”。',
      },
      {
        label: '合段',
        template: '便教人、一句连城价，传向万川千嶂',
        pattern: '仄平平、仄仄平平仄，平仄仄平平仄',
        rhymeIndices: [6, -1],
      },
    ],
    baseAllusions: [
      {
        id: 'liuqing',
        term: '流萤',
        explanation: '取自《晋书·车胤传》“映雪读书”故事，象征夜读借光。',
        source: '《晋书·卷九十·车胤传》',
        quote: '胤贫无油，常以囊盛萤火以照书。',
      },
      {
        id: 'liancheng',
        term: '连城之价',
        explanation: '比喻作品价值连城，源于《汉书·枚乘传》。',
        source: '《汉书·卷六十五·东方朔传》',
        quote: '善赋者枚乘，其文价重连城。',
      },
      {
        id: 'jinse',
        term: '锦瑟无端',
        explanation: '出自李商隐《锦瑟》，以迷离音色烘托声画交织的氛围。',
        source: '李商隐《锦瑟》',
        quote: '锦瑟无端五十弦，一弦一柱思华年。',
      },
    ],
    baseImagery: [
      {
        id: 'jinyong-night',
        name: '金陵夜泊',
        dynasty: '宋代',
        timeline: '绍兴十年（1140）',
        location: '金陵秦淮',
        figure: '姜夔',
        description: '姜夔夜行秦淮、鼓瑟自伴，词风清峻。',
        coordinates: { x: 58, y: 64 },
      },
      {
        id: 'changting',
        name: '长亭别梦',
        dynasty: '元代',
        timeline: '至元二十年（1283）',
        location: '汴梁',
        figure: '王实甫',
        description: '《长亭送别》中琴瑟与歌舞的跨媒介融合。',
        coordinates: { x: 44, y: 52 },
      },
      {
        id: 'snow-study',
        name: '映雪读书',
        dynasty: '晋代',
        timeline: '太元七年（382）',
        location: '荆州',
        figure: '孙康',
        description: '与“囊萤映雪”典相对，强调夜读与光影。',
        coordinates: { x: 36, y: 48 },
      },
    ],
    exports: [
      { background: 'from-indigo-900 via-indigo-700 to-slate-800', accent: 'border-indigo-300' },
      { background: 'from-rose-50 via-amber-50 to-emerald-50', accent: 'border-rose-400' },
      { background: 'from-blue-50 via-purple-100 to-slate-100', accent: 'border-blue-400' },
    ],
  },
}

type ModeKey = 'classic' | 'hybrid'

type ModeLabel = PoemAnalysis['mode']

const MODE_LABEL_MAP: Record<ModeKey, ModeLabel> = {
  classic: '古典格律',
  hybrid: '现代题旨×古典格律',
}

function createLine(
  label: string,
  template: string,
  pattern: string,
  theme: string,
  rhymeIndices: number[],
  deviationIndices: number[] = [],
  suggestion?: string,
): PoemLine {
  const text = template.replace('{theme}', theme)
  const characters = Array.from(text)
  const patternChars = Array.from(pattern)
  const segments: ToneSegment[] = characters.map((char, index) => {
    const patternChar = patternChars[index]
    const tone: Tone = patternChar === '平' || patternChar === '仄' ? (patternChar as Tone) : '中'
    const isExplicitRhyme = rhymeIndices.includes(index)
    const isPatternTail = rhymeIndices.includes(patternChars.length - 1) && index === characters.length - 1
    const isCustomTail = rhymeIndices.includes(-1) && index === characters.length - 1
    return {
      char,
      tone,
      isRhyme: isExplicitRhyme || isPatternTail || isCustomTail,
      isDeviation: deviationIndices.includes(index) || index >= patternChars.length,
    }
  })

  return {
    label,
    segments,
    pattern,
    suggestion,
  }
}

function buildHeatmap(lines: PoemLine[]): number[][] {
  return lines.map((line) => line.segments.map((segment) => (segment.tone === '平' ? 1 : segment.tone === '仄' ? -1 : 0)))
}

function enrichAllusions(allusions: Allusion[], theme: string): Allusion[] {
  if (!theme.trim()) return allusions
  return allusions.map((item) => ({
    ...item,
    explanation: item.explanation.includes(theme)
      ? item.explanation
      : `${item.explanation}，与“${theme}”题旨相互映照。`,
  }))
}

export function generatePoem(themeRaw: string, formKey: FormKey, mode: ModeKey): PoemAnalysis {
  const theme = themeRaw.trim() || '江南春意'
  const config = FORM_CONFIG[formKey]
  const lines = config.patterns.map((patternConfig) =>
    createLine(
      patternConfig.label,
      patternConfig.template,
      patternConfig.pattern,
      theme,
      patternConfig.rhymeIndices,
      patternConfig.deviationIndices,
      patternConfig.suggestion,
    ),
  )

  const heatmap = buildHeatmap(lines)
  const keywords = [theme, ...config.baseAllusions.map((item) => item.term)]

  return {
    title: `${config.name} · ${theme}`,
    subtitle: config.subtitle,
    form: config.description,
    theme,
    mode: MODE_LABEL_MAP[mode],
    meterNotes:
      mode === 'classic'
        ? [
            '自动生成平仄标注，提示可改动字位以守格。',
            '同一韵部字符以同色标记，便于现场讲解押韵规律。',
          ]
        : [
            '现代题旨词汇允许在格律外延伸，系统提示“中性位”可自由发挥。',
            '推荐搭配可视化 H5，突出主题叙事节奏。',
          ],
    rhymeScheme: config.patterns
      .map((patternConfig) => patternConfig.pattern[patternConfig.pattern.length - 1])
      .join(' → '),
    lines,
    allusions: enrichAllusions(config.baseAllusions, theme),
    imagery: config.baseImagery,
    exports: config.exports.map((preset, index) => ({
      id: `${formKey}-preset-${index}`,
      title: index === 0 ? '海报版式' : index === 1 ? '朗诵剧场' : 'H5长条',
      subtitle:
        index === 0
          ? '导出 SVG/PNG，适配展板与电子墨水屏。'
          : index === 1
            ? '自动生成配乐朗诵，支持女声/旁白切换。'
            : '滚动叙事模板，嵌入典故卡片与互动地图。',
      background: preset.background,
      accent: preset.accent,
    })),
    heatmap,
    keywords,
  }
}

export type { ModeKey }
