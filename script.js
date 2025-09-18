const models = [
  {
    id: "gemini",
    name: "Gemini 2.0 Ultra",
    developer: "Google DeepMind",
    release: "2024 Q4",
    tagline: "原生多模态旗舰，强化视频与长上下文能力",
    summary:
      "提供全链路原生多模态推理，擅长复杂视频理解与代码生成，适合需要跨媒体协同的企业应用。",
    strengths: [
      "视频与音频理解能力领先",
      "原生跨模态引用源数据",
      "PaLM 生态兼容性好",
    ],
    caution: "目前企业托管区域以美欧为主，私有化版本尚在早期测试阶段。",
    metrics: {
      reasoning: 8.9,
      multimodal: 9.6,
      speed: 8.2,
      cost: 7.4,
      ecosystem: 8.3,
    },
    pricing: {
      inputPerMillion: 3.0,
      outputPerMillion: 10.0,
      throughputTokensPerMin: 420000,
      contextWindow: "2M tokens (长期记忆模式)",
    },
    compliance: {
      certifications: "ISO 27001, SOC2 Type II, FedRAMP 申请中",
      dataControls: "可配置地理隔离与数据保留策略，提供自带密钥加密",
      transparency: "支持来源追踪（grounding）与生成引用",
    },
  },
  {
    id: "gpt",
    name: "GPT-4.1 Turbo",
    developer: "OpenAI",
    release: "2025 Q1",
    tagline: "最强通用推理，覆盖语音、视觉与工具链",
    summary:
      "以统一模型覆盖文本、图像、音频与代理操作，具备稳定的工具调用能力，适用于高可靠场景。",
    strengths: [
      "复杂推理与指令跟随表现突出",
      "Azure OpenAI 提供企业级 SLA",
      "生态插件与工具最丰富",
    ],
    caution: "单位 token 成本较高，对超大批量调用需关注成本优化策略。",
    metrics: {
      reasoning: 9.5,
      multimodal: 9.1,
      speed: 7.8,
      cost: 6.6,
      ecosystem: 9.4,
    },
    pricing: {
      inputPerMillion: 5.0,
      outputPerMillion: 15.0,
      throughputTokensPerMin: 360000,
      contextWindow: "1M tokens (可扩展至 4M)",
    },
    compliance: {
      certifications:
        "ISO 27001/27701, SOC2 Type II, GDPR/CCPA 合规, 欧盟 AI Act 准备",
      dataControls: "企业级审计日志，细粒度权限管理，可禁用训练数据留存",
      transparency: "系统消息与调用链可追踪，支持内容过滤与风险标注",
    },
  },
  {
    id: "deepseek",
    name: "DeepSeek-V3",
    developer: "DeepSeek AI",
    release: "2025 Q1",
    tagline: "极致性价比的全能模型，强化中文与代码场景",
    summary:
      "基于创新的混合专家架构，兼顾高吞吐与低成本，适合大规模部署与中文业务优化。",
    strengths: [
      "推理-速度-成本三者平衡",
      "支持本地化部署与国产适配",
      "社区开源生态活跃",
    ],
    caution: "英文安全合规报告相对较少，需结合行业要求补充评估。",
    metrics: {
      reasoning: 8.7,
      multimodal: 8.4,
      speed: 9.1,
      cost: 9.4,
      ecosystem: 7.6,
    },
    pricing: {
      inputPerMillion: 1.2,
      outputPerMillion: 1.6,
      throughputTokensPerMin: 680000,
      contextWindow: "512K tokens (计划扩展至 1M)",
    },
    compliance: {
      certifications: "可信 AI 认证 (中国信通院) 进行中，支持企业数据主权部署",
      dataControls: "可选 VPC 托管与专线部署，支持企业级水印与审计",
      transparency: "开源推理日志工具，提供安全策略模板",
    },
  },
];

const scenarios = [
  {
    id: "agent",
    name: "企业多轮智能客服",
    description: "覆盖售前咨询与售后服务，需要稳定的对话记忆与工具调用能力。",
    weights: {
      reasoning: 0.28,
      multimodal: 0.18,
      speed: 0.22,
      cost: 0.12,
      ecosystem: 0.2,
    },
    tips: [
      "优先选择具备强指令跟随与稳定工具调用的模型",
      "若需语音客服，关注实时语音接口与延迟表现",
    ],
  },
  {
    id: "creative",
    name: "营销创意与多模态内容生成",
    description: "聚焦图文视频的快速产出，需要丰富的创意和视觉理解。",
    weights: {
      reasoning: 0.18,
      multimodal: 0.32,
      speed: 0.14,
      cost: 0.14,
      ecosystem: 0.22,
    },
    tips: ["结合品牌规范配置风格提示词", "可利用图像/视频编辑工具链提升效率"],
  },
  {
    id: "code",
    name: "代码生成与自动化测试",
    description: "要求高准确率与长上下文，支持复杂代码库的理解与生成。",
    weights: {
      reasoning: 0.34,
      multimodal: 0.1,
      speed: 0.16,
      cost: 0.12,
      ecosystem: 0.28,
    },
    tips: [
      "结合本地代码库向量检索提升上下文",
      "配置严格的 review 流程保障代码安全",
    ],
  },
  {
    id: "batch",
    name: "大规模结构化生成/批处理",
    description: "强调吞吐与成本，适合金融、游戏等行业的批量生成任务。",
    weights: {
      reasoning: 0.2,
      multimodal: 0.12,
      speed: 0.28,
      cost: 0.26,
      ecosystem: 0.14,
    },
    tips: ["关注并发限额与速率限制", "可通过缓存提示词与蒸馏模型进一步降本"],
  },
];

const roadmap = [
  {
    quarter: "2025 Q1",
    title: "GPT-4.1 Turbo 发布全能力 GA",
    detail:
      "新增实时语音对话、函数工具链统一模型调用，Azure OpenAI 与 OpenAI API 同步可用。",
  },
  {
    quarter: "2025 Q2 (计划)",
    title: "Gemini 2.0 企业版区域扩展",
    detail: "引入亚太区数据驻留与本地化合规包，新增安全审核 API。",
  },
  {
    quarter: "2025 Q2",
    title: "DeepSeek-V3 Pro 本地部署套件",
    detail: "提供私有化推理集群管理工具与增量训练 SDK，支持国产 GPU。",
  },
  {
    quarter: "2025 Q3 (规划)",
    title: "跨模型互操作标准化",
    detail: "三家厂商推动多模型代理协议，预计支持统一的会话状态同步。",
  },
];

const weightControls = document.querySelectorAll(".weight-control");
const scoreChartCtx = document.getElementById("scoreChart").getContext("2d");
const rankingContainer = document.getElementById("dynamicRanking");
let scoreChart;

function renderModelCards() {
  const container = document.getElementById("modelOverview");
  container.innerHTML = models
    .map(
      (model) => `
        <article class="model-card">
          <div class="model-header">
            <div>
              <div class="model-name">${model.name}</div>
              <span class="badge">${model.developer}</span>
            </div>
            <span class="badge">${model.release}</span>
          </div>
          <p>${model.tagline}</p>
          <p class="muted">${model.summary}</p>
          <div class="metric-list">
            <strong>优势亮点</strong>
            ${model.strengths.map((item) => `<span>• ${item}</span>`).join("")}
          </div>
          <div class="metric-list">
            <strong>注意事项</strong>
            <span>${model.caution}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function getWeights() {
  const weights = {
    reasoning: 0,
    multimodal: 0,
    speed: 0,
    cost: 0,
    ecosystem: 0,
  };
  let total = 0;
  weightControls.forEach((control) => {
    const metric = control.dataset.metric;
    const value = Number(control.querySelector("input").value);
    weights[metric] = value;
    total += value;
  });
  Object.keys(weights).forEach((key) => {
    weights[key] = weights[key] / total;
  });
  return weights;
}

function calculateScores(weights = getWeights()) {
  return models
    .map((model) => {
      const score =
        model.metrics.reasoning * weights.reasoning +
        model.metrics.multimodal * weights.multimodal +
        model.metrics.speed * weights.speed +
        model.metrics.cost * weights.cost +
        model.metrics.ecosystem * weights.ecosystem;
      return { ...model, score: Number(score.toFixed(2)) };
    })
    .sort((a, b) => b.score - a.score);
}

function renderRanking(scores) {
  rankingContainer.innerHTML = scores
    .map(
      (item, index) => `
        <div class="rank-item">
          <div>
            <strong>${index + 1}. ${item.name}</strong>
            <span>${item.tagline}</span>
          </div>
          <span>${item.score} 分</span>
        </div>
      `,
    )
    .join("");
  document.getElementById("topModelLabel").textContent = scores[0].name;
}

function updateChart(weights) {
  const labels = ["推理", "多模态", "速度", "成本效率", "生态"];
  const datasets = models.map((model) => ({
    label: model.name,
    data: [
      model.metrics.reasoning,
      model.metrics.multimodal,
      model.metrics.speed,
      model.metrics.cost,
      model.metrics.ecosystem,
    ],
    fill: true,
    backgroundColor: getColor(model.id, 0.2),
    borderColor: getColor(model.id, 1),
    pointBackgroundColor: getColor(model.id, 1),
    pointRadius: 3,
  }));

  if (scoreChart) {
    scoreChart.data.labels = labels;
    scoreChart.data.datasets = datasets;
    scoreChart.update();
  } else {
    scoreChart = new Chart(scoreChartCtx, {
      type: "radar",
      data: { labels, datasets },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#e2e8f0",
            },
          },
          tooltip: {
            callbacks: {
              label(context) {
                return `${context.dataset.label}: ${context.formattedValue}`;
              },
            },
          },
        },
        scales: {
          r: {
            suggestedMin: 6,
            suggestedMax: 10,
            grid: { color: "rgba(148, 163, 184, 0.25)" },
            angleLines: { color: "rgba(148, 163, 184, 0.2)" },
            pointLabels: { color: "#94a3b8", font: { size: 12 } },
            ticks: { display: false },
          },
        },
      },
    });
  }

  renderRanking(calculateScores(weights));
}

function getColor(modelId, alpha = 1) {
  const colors = {
    gemini: `rgba(56, 189, 248, ${alpha})`,
    gpt: `rgba(168, 85, 247, ${alpha})`,
    deepseek: `rgba(74, 222, 128, ${alpha})`,
  };
  return colors[modelId];
}

function renderTabs() {
  renderCapabilityTable();
  renderPricingTable();
  renderEcosystemTable();
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".tab")
        .forEach((el) => el.classList.remove("active"));
      document
        .querySelectorAll(".tab-content")
        .forEach((content) => content.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(`${tab.dataset.tab}Tab`).classList.add("active");
    });
  });
}

function renderCapabilityTable() {
  const container = document.getElementById("capabilitiesTab");
  const rows = models
    .map(
      (model) => `
        <tr>
          <td>${model.name}</td>
          <td>${model.metrics.reasoning}</td>
          <td>${model.metrics.multimodal}</td>
          <td>${model.metrics.speed}</td>
          <td>${model.pricing.contextWindow}</td>
        </tr>
      `,
    )
    .join("");
  container.innerHTML = `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>模型</th>
            <th>推理基准 (GSM8K/MATH)</th>
            <th>多模态 (MMMU)</th>
            <th>实时速度评分 (越高越快)</th>
            <th>上下文窗口</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderPricingTable() {
  const container = document.getElementById("pricingTab");
  const rows = models
    .map(
      (model) => `
        <tr>
          <td>${model.name}</td>
          <td>$${model.pricing.inputPerMillion.toFixed(2)}</td>
          <td>$${model.pricing.outputPerMillion.toFixed(2)}</td>
          <td>${(model.pricing.throughputTokensPerMin / 1000).toFixed(0)}k</td>
          <td>${model.metrics.cost >= 9 ? '<span class="badge badge-success">极高</span>' : model.metrics.cost >= 7 ? '<span class="badge badge-warning">中等</span>' : "偏高"}</td>
        </tr>
      `,
    )
    .join("");
  container.innerHTML = `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>模型</th>
            <th>输入成本 / 百万 tokens</th>
            <th>输出成本 / 百万 tokens</th>
            <th>吞吐上限 (tokens/min)</th>
            <th>成本评价</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderEcosystemTable() {
  const container = document.getElementById("ecosystemTab");
  const rows = models
    .map(
      (model) => `
        <tr>
          <td>${model.name}</td>
          <td>${model.compliance.certifications}</td>
          <td>${model.compliance.dataControls}</td>
          <td>${model.compliance.transparency}</td>
        </tr>
      `,
    )
    .join("");
  container.innerHTML = `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>模型</th>
            <th>安全/合规</th>
            <th>数据治理</th>
            <th>透明度与可解释性</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderScenarios() {
  const select = document.getElementById("scenarioSelect");
  select.innerHTML = scenarios
    .map((item) => `<option value="${item.id}">${item.name}</option>`)
    .join("");
}

function handleScenarioCalculation() {
  const select = document.getElementById("scenarioSelect");
  const volumeInput = document.getElementById("requestVolume");
  const contextInput = document.getElementById("contextLength");
  const result = document.getElementById("scenarioResult");

  document.getElementById("calcScenario").addEventListener("click", () => {
    const scenario = scenarios.find((item) => item.id === select.value);
    const volume = Number(volumeInput.value) || 0;
    const context = Number(contextInput.value) || 0;
    const scenarioScores = calculateScores(scenario.weights);

    const tokensIn = (volume * context) / 1_000_000;
    const tokensOut = (volume * context * 0.6) / 1_000_000;

    const costBreakdown = scenarioScores.map((model) => {
      const cost =
        tokensIn * model.pricing.inputPerMillion +
        tokensOut * model.pricing.outputPerMillion;
      return {
        model: model.name,
        cost: Number(cost.toFixed(2)),
        score: model.score,
      };
    });

    const best = costBreakdown[0];
    const detailList = costBreakdown
      .map(
        (item) =>
          `<li><strong>${item.model}</strong>：匹配度 ${item.score} 分，预计日成本约 $${item.cost}</li>`,
      )
      .join("");

    result.innerHTML = `
      <h3>${scenario.name}：推荐 ${best.model}</h3>
      <p>${scenario.description}</p>
      <p>假设每日 ${volume.toLocaleString()} 次调用，每次上下文 ${context.toLocaleString()} tokens。</p>
      <ul>${detailList}</ul>
      <p>实施提示：</p>
      <ul>${scenario.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>
    `;
  });

  document.getElementById("calcScenario").click();
}

function renderRoadmap() {
  const container = document.getElementById("roadmap");
  container.innerHTML = roadmap
    .map(
      (item) => `
        <div class="timeline-item">
          <strong>${item.quarter}</strong>
          <div>${item.title}</div>
          <span>${item.detail}</span>
        </div>
      `,
    )
    .join("");
}

function renderAverageCost() {
  const avg =
    models.reduce(
      (sum, model) =>
        sum + model.pricing.inputPerMillion + model.pricing.outputPerMillion,
      0,
    ) / models.length;
  document.getElementById("avgCost").textContent = `$${avg.toFixed(2)}`;
}

function setupWeightControls() {
  weightControls.forEach((control) => {
    const input = control.querySelector("input");
    const valueLabel = control.querySelector(".weight-value");
    const metric = control.dataset.metric;

    input.addEventListener("input", () => {
      valueLabel.textContent = `${input.value}%`;
      const weights = getWeights();
      updateChart(weights);
    });

    control.dataset.default = input.value;
    valueLabel.textContent = `${input.value}%`;
  });

  document.getElementById("resetWeights").addEventListener("click", () => {
    weightControls.forEach((control) => {
      const input = control.querySelector("input");
      input.value = control.dataset.default;
      control.querySelector(".weight-value").textContent = `${input.value}%`;
    });
    updateChart(getWeights());
  });
}

function setupRecommendationDialog() {
  const dialog = document.getElementById("recommendDialog");
  const content = document.getElementById("recommendContent");
  document.getElementById("recommendationBtn").addEventListener("click", () => {
    const scores = calculateScores();
    const [first, second, third] = scores;
    content.innerHTML = `
      <p><strong>首选：</strong>${first.name}（${first.score} 分）——${first.tagline}</p>
      <p><strong>备选：</strong>${second.name}（${second.score} 分），兼顾${second.strengths[0]}。</p>
      <p><strong>成本友好：</strong>${third.name}（${third.score} 分），建议用于${third.strengths[1]}。</p>
      <p>可调整左侧权重以获得更契合的排名。</p>
    `;
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  });
  document
    .getElementById("closeDialog")
    .addEventListener("click", () => dialog.close());
}

function setupExport() {
  document.getElementById("exportBtn").addEventListener("click", () => {
    const scores = calculateScores();
    const summaryLines = [
      "【大模型选型对比快照】",
      `综合评分领先：${scores[0].name}，得分 ${scores[0].score}`,
      `平均推理成本 (1M token)：${document.getElementById("avgCost").textContent}`,
      "",
      "模型速览：",
      ...scores.map(
        (model, index) =>
          `${index + 1}. ${model.name}｜推理 ${model.metrics.reasoning}｜多模态 ${model.metrics.multimodal}｜速度 ${model.metrics.speed}｜成本效率 ${model.metrics.cost}`,
      ),
      "",
      "建议：根据业务优先级调整指标权重，结合安全合规需求选择模型。",
    ];

    const blob = new Blob([summaryLines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "模型对比摘要.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}

function init() {
  renderModelCards();
  renderTabs();
  renderScenarios();
  handleScenarioCalculation();
  renderRoadmap();
  renderAverageCost();
  setupWeightControls();
  setupRecommendationDialog();
  setupExport();
  updateChart(getWeights());
}

document.addEventListener("DOMContentLoaded", init);
