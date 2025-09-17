const radarCtx = document.getElementById('radarChart');
const costCtx = document.getElementById('costChart');

const normalizedScores = {
  labels: ['知识推理', '数学推理', '代码生成', '多模态理解', '生态成熟度', '响应速度(反向)', '成本效率(反向)'],
  datasets: [
    {
      label: 'DeepSeek',
      data: [0.86, 0.84, 0.90, 0.79, 0.72, 0.88, 0.95],
      borderColor: '#00d2d3',
      backgroundColor: 'rgba(0, 210, 211, 0.28)',
      pointBackgroundColor: '#00d2d3',
      pointBorderWidth: 2,
      tension: 0.3
    },
    {
      label: 'GPT-4.1 Omni',
      data: [0.92, 0.91, 0.88, 0.83, 0.95, 0.75, 0.68],
      borderColor: '#6c5ce7',
      backgroundColor: 'rgba(108, 92, 231, 0.28)',
      pointBackgroundColor: '#6c5ce7',
      pointBorderWidth: 2,
      tension: 0.3
    },
    {
      label: 'Gemini 1.5 Pro',
      data: [0.88, 0.86, 0.83, 0.91, 0.82, 0.80, 0.74],
      borderColor: '#ff9f43',
      backgroundColor: 'rgba(255, 159, 67, 0.28)',
      pointBackgroundColor: '#ff9f43',
      pointBorderWidth: 2,
      tension: 0.3
    }
  ]
};

new Chart(radarCtx, {
  type: 'radar',
  data: normalizedScores,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(245, 247, 255, 0.85)',
          font: {
            family: 'Noto Sans SC'
          }
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 1,
        ticks: {
          display: false
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.12)'
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
        pointLabels: {
          color: 'rgba(245, 247, 255, 0.8)',
          font: {
            size: 12
          }
        }
      }
    }
  }
});

new Chart(costCtx, {
  type: 'bar',
  data: {
    labels: ['DeepSeek', 'GPT-4.1 Omni', 'Gemini 1.5 Pro'],
    datasets: [
      {
        label: '推理成本 (USD / 1M tokens)',
        data: [6, 12, 10],
        backgroundColor: ['rgba(0, 210, 211, 0.7)', 'rgba(108, 92, 231, 0.7)', 'rgba(255, 159, 67, 0.7)'],
        borderRadius: 12
      },
      {
        label: '平均响应时间 (秒)',
        data: [3.1, 4.2, 3.8],
        backgroundColor: ['rgba(0, 210, 211, 0.4)', 'rgba(108, 92, 231, 0.4)', 'rgba(255, 159, 67, 0.4)'],
        borderRadius: 12
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: 'rgba(245, 247, 255, 0.8)'
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: 'rgba(245, 247, 255, 0.8)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(245, 247, 255, 0.85)',
          font: {
            family: 'Noto Sans SC'
          }
        }
      }
    }
  }
});
