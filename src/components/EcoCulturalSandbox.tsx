import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as echarts from 'echarts';

interface Weights {
  ritual: number;
  art: number;
  tea: number;
}

type ScenarioKey = 'balanced' | 'cultureFirst' | 'economyDriven';

const scenarioPresets: Record<ScenarioKey, Weights> = {
  balanced: { ritual: 34, art: 33, tea: 33 },
  cultureFirst: { ritual: 45, art: 40, tea: 15 },
  economyDriven: { ritual: 20, art: 30, tea: 50 },
};

interface SandboxResult {
  radarSeries: number[];
  radarIndicators: { name: string; max: number }[];
  pillarSeries: number[];
  pillarCategories: string[];
}

function computeSandbox(weights: Weights): SandboxResult {
  const sum = weights.ritual + weights.art + weights.tea;
  const normalized = {
    ritual: weights.ritual / sum,
    art: weights.art / sum,
    tea: weights.tea / sum,
  };

  const radarIndicators = [
    { name: '文化浸润', max: 100 },
    { name: '社会参与', max: 100 },
    { name: '产业活力', max: 100 },
    { name: '景观营造', max: 100 },
  ];

  const radarSeries = [
    Math.round((normalized.ritual * 0.45 + normalized.art * 0.4 + normalized.tea * 0.2) * 100),
    Math.round((normalized.ritual * 0.3 + normalized.art * 0.35 + normalized.tea * 0.4) * 100),
    Math.round((normalized.ritual * 0.2 + normalized.art * 0.25 + normalized.tea * 0.6) * 100),
    Math.round((normalized.ritual * 0.35 + normalized.art * 0.25 + normalized.tea * 0.3) * 100),
  ];

  const pillarCategories = ['礼乐体验', '书画工坊', '茶事市集'];
  const pillarSeries = [
    Math.round(normalized.ritual * 120),
    Math.round(normalized.art * 120),
    Math.round(normalized.tea * 120),
  ];

  return { radarSeries, radarIndicators, pillarSeries, pillarCategories };
}

export function EcoCulturalSandbox() {
  const [weights, setWeights] = useState<Weights>(scenarioPresets.balanced);
  const radarRef = useRef<HTMLDivElement | null>(null);
  const pillarRef = useRef<HTMLDivElement | null>(null);
  const radarChart = useRef<echarts.EChartsType | null>(null);
  const pillarChart = useRef<echarts.EChartsType | null>(null);

  const result = useMemo(() => computeSandbox(weights), [weights]);

  useEffect(() => {
    if (radarRef.current && !radarChart.current) {
      radarChart.current = echarts.init(radarRef.current);
    }
    if (pillarRef.current && !pillarChart.current) {
      pillarChart.current = echarts.init(pillarRef.current);
    }

    const handleResize = () => {
      radarChart.current?.resize();
      pillarChart.current?.resize();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      radarChart.current?.dispose();
      pillarChart.current?.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!radarChart.current || !pillarChart.current) {
      return;
    }

    radarChart.current.setOption({
      backgroundColor: 'transparent',
      radar: {
        indicator: result.radarIndicators,
        radius: '70%',
        splitNumber: 4,
        splitLine: { lineStyle: { color: ['#cbd5f5', '#bfdbfe', '#93c5fd'] } },
        splitArea: { areaStyle: { color: ['rgba(14,165,233,0.08)', 'rgba(14,165,233,0.04)'] } },
        axisLine: { lineStyle: { color: '#0ea5e9' } },
        name: { color: '#0f172a', fontWeight: 600, fontFamily: 'Noto Serif SC' },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: result.radarSeries,
              areaStyle: { color: 'rgba(15, 118, 110, 0.35)' },
              lineStyle: { color: '#0f766e', width: 2 },
              symbol: 'circle',
              symbolSize: 6,
              itemStyle: { color: '#f59e0b' },
            },
          ],
        },
      ],
    });

    pillarChart.current.setOption({
      grid: { left: '5%', right: '5%', bottom: '12%', top: '12%' },
      xAxis: {
        type: 'category',
        data: result.pillarCategories,
        axisLabel: { color: '#0f172a', fontFamily: 'Noto Serif SC' },
        axisTick: { show: false },
        axisLine: { lineStyle: { color: '#94a3b8' } },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#475569' },
        splitLine: { lineStyle: { color: '#e2e8f0' } },
      },
      series: [
        {
          type: 'bar',
          data: result.pillarSeries,
          barWidth: '45%',
          itemStyle: {
            borderRadius: [12, 12, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(15, 118, 110, 0.85)' },
              { offset: 1, color: 'rgba(14, 165, 233, 0.45)' },
            ]),
          },
          label: {
            show: true,
            position: 'top',
            color: '#0f172a',
            fontWeight: 600,
            formatter: '{c}',
          },
        },
      ],
    });
  }, [result]);

  const updateWeights = useCallback((partial: Partial<Weights>) => {
    setWeights((prev) => ({ ...prev, ...partial }));
  }, []);

  const applyScenario = (scenario: ScenarioKey) => {
    setWeights(scenarioPresets[scenario]);
  };

  return (
    <div className="rounded-3xl border border-heritage-ink/10 bg-white/80 p-6 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-song text-lg text-heritage-ink">“宋式生活”微沙盘</h3>
          <p className="text-sm text-heritage-ink/60">调节礼乐、书画、茶事权重，观察文化与经济的协奏。</p>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            type="button"
            className="rounded-full border border-heritage-ink/10 px-3 py-1 hover:bg-heritage-jade/10"
            onClick={() => applyScenario('balanced')}
          >
            均衡
          </button>
          <button
            type="button"
            className="rounded-full border border-heritage-ink/10 px-3 py-1 hover:bg-heritage-jade/10"
            onClick={() => applyScenario('cultureFirst')}
          >
            文化优先
          </button>
          <button
            type="button"
            className="rounded-full border border-heritage-ink/10 px-3 py-1 hover:bg-heritage-jade/10"
            onClick={() => applyScenario('economyDriven')}
          >
            经济拉动
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <label className="flex items-center justify-between text-xs text-heritage-ink/70">
            礼乐雅集
            <span className="font-medium text-heritage-ink">{weights.ritual}</span>
          </label>
          <input
            type="range"
            min={10}
            max={70}
            value={weights.ritual}
            onChange={(event) => updateWeights({ ritual: Number(event.target.value) })}
            className="range-input"
          />
          <label className="mt-3 flex items-center justify-between text-xs text-heritage-ink/70">
            书画工坊
            <span className="font-medium text-heritage-ink">{weights.art}</span>
          </label>
          <input
            type="range"
            min={10}
            max={70}
            value={weights.art}
            onChange={(event) => updateWeights({ art: Number(event.target.value) })}
            className="range-input"
          />
          <label className="mt-3 flex items-center justify-between text-xs text-heritage-ink/70">
            茶事市集
            <span className="font-medium text-heritage-ink">{weights.tea}</span>
          </label>
          <input
            type="range"
            min={10}
            max={70}
            value={weights.tea}
            onChange={(event) => updateWeights({ tea: Number(event.target.value) })}
            className="range-input"
          />
          <p className="mt-4 rounded-2xl bg-heritage-ink/5 p-3 text-xs leading-relaxed text-heritage-ink/70">
            权重变化会实时影响文化浸润与产业活力指数，帮助策划不同的“宋式生活”组合策略。
          </p>
        </div>
        <div className="grid gap-4">
          <div ref={radarRef} className="h-56 w-full" />
          <div ref={pillarRef} className="h-48 w-full" />
        </div>
      </div>
    </div>
  );
}

export default EcoCulturalSandbox;
