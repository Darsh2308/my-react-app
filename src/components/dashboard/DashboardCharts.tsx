import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Users, MessageSquare, Target, Calendar } from 'lucide-react';
import Chart from 'chart.js/auto';

// Analytics Data with trends and insights
const submissionsData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  datasets: [{
    label: 'Form Submissions',
    data: [85, 72, 95, 88, 110, 125],
    borderColor: 'rgb(14, 165, 233)',
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    tension: 0.4,
    fill: true
  }, {
    label: 'Converted Leads',
    data: [20, 18, 28, 25, 35, 42],
    borderColor: 'rgb(16, 185, 129)',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    tension: 0.4,
    fill: true
  }]
};

const conversionRateData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Conversion Rate (%)',
    data: [23.5, 28.2, 31.8, 25.6, 29.4, 35.2, 32.1],
    backgroundColor: [
      'rgba(245, 158, 11, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(14, 165, 233, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(34, 197, 94, 0.8)',
      'rgba(249, 115, 22, 0.8)'
    ],
    borderColor: [
      'rgba(245, 158, 11, 1)',
      'rgba(16, 185, 129, 1)',
      'rgba(14, 165, 233, 1)',
      'rgba(139, 92, 246, 1)',
      'rgba(236, 72, 153, 1)',
      'rgba(34, 197, 94, 1)',
      'rgba(249, 115, 22, 1)'
    ],
    borderWidth: 2
  }]
};

const trafficSourcesData = {
  labels: ['Organic Search', 'Direct Traffic', 'Social Media', 'Email Campaign', 'Referrals', 'Paid Ads'],
  datasets: [{
    data: [35, 25, 15, 12, 8, 5],
    backgroundColor: [
      'rgba(14, 165, 233, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(239, 68, 68, 0.8)'
    ],
    borderColor: [
      'rgba(14, 165, 233, 1)',
      'rgba(16, 185, 129, 1)',
      'rgba(245, 158, 11, 1)',
      'rgba(139, 92, 246, 1)',
      'rgba(236, 72, 153, 1)',
      'rgba(239, 68, 68, 1)'
    ],
    borderWidth: 2
  }]
};

const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Page Views',
      data: [3200, 3800, 4100, 3900, 4500, 5200],
      backgroundColor: 'rgba(14, 165, 233, 0.2)',
      borderColor: 'rgba(14, 165, 233, 1)',
      borderWidth: 2,
      yAxisID: 'y'
    },
    {
      label: 'Bounce Rate (%)',
      data: [45, 42, 38, 40, 35, 32],
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      borderColor: 'rgba(239, 68, 68, 1)',
      borderWidth: 2,
      type: 'line',
      yAxisID: 'y1'
    }
  ]
};

// Chart Component Hook
function useChart(canvasRef: React.RefObject<HTMLCanvasElement>, config: any) {
  useEffect(() => {
    if (!canvasRef.current) return;

    const chart = new Chart(canvasRef.current, config);

    return () => {
      chart.destroy();
    };
  }, [canvasRef, config]);
}

export default function DashboardCharts() {
  const submissionsChartRef = useRef<HTMLCanvasElement>(null);
  const conversionChartRef = useRef<HTMLCanvasElement>(null);
  const trafficChartRef = useRef<HTMLCanvasElement>(null);
  const performanceChartRef = useRef<HTMLCanvasElement>(null);

  // Submissions & Conversions Line Chart
  useChart(submissionsChartRef as React.RefObject<HTMLCanvasElement>, {
    type: 'line',
    data: submissionsData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        title: {
          display: false,
        },
        legend: {
          position: 'bottom' as const,
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Time Period'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Count'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
    }
  });

  // Conversion Rate Bar Chart
  useChart(conversionChartRef as React.RefObject<HTMLCanvasElement>, {
    type: 'bar',
    data: conversionRateData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          callbacks: {
            label: function(context: any) {
              return `Conversion Rate: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Day of Week'
          },
          grid: {
            display: false
          }
        },
        y: {
          title: {
            display: true,
            text: 'Conversion Rate (%)'
          },
          beginAtZero: true,
          max: 40,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
    }
  });

  // Traffic Sources Doughnut Chart
  useChart(trafficChartRef as React.RefObject<HTMLCanvasElement>, {
    type: 'doughnut',
    data: trafficSourcesData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            usePointStyle: true,
            padding: 15
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          callbacks: {
            label: function(context: any) {
              return `${context.label}: ${context.parsed}%`;
            }
          }
        }
      },
      cutout: '60%'
    }
  });

  // Performance Mixed Chart
  useChart(performanceChartRef as React.RefObject<HTMLCanvasElement>, {
    type: 'bar',
    data: performanceData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Month'
          },
          grid: {
            display: false
          }
        },
        y: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
          title: {
            display: true,
            text: 'Page Views'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        y1: {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          title: {
            display: true,
            text: 'Bounce Rate (%)'
          },
          grid: {
            drawOnChartArea: false,
          },
        }
      }
    }
  });

  return (
    <div className="space-y-6">
      {/* Key Insights Banner */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Conversion trending</p>
                <p className="font-semibold text-green-700">+24% this week</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Best performing day</p>
                <p className="font-semibold text-blue-700">Saturday (35.2%)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <MessageSquare className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Top traffic source</p>
                <p className="font-semibold text-orange-700">Organic Search (35%)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Submissions & Conversions Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Submissions & Conversions Trend
            </CardTitle>
            <CardDescription>
              Weekly performance showing total submissions vs converted leads
            </CardDescription>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                Avg. 95 submissions/week
              </Badge>
              <Badge variant="outline" className="text-green-600 border-green-200">
                28% conversion rate
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <canvas ref={submissionsChartRef}></canvas>
            </div>
          </CardContent>
        </Card>

        {/* Daily Conversion Rates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Daily Conversion Performance
            </CardTitle>
            <CardDescription>
              Conversion rates by day of the week - optimize your campaigns
            </CardDescription>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-green-600 border-green-200">
                Best: Saturday
              </Badge>
              <Badge variant="outline" className="text-red-600 border-red-200">
                Lowest: Monday
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <canvas ref={conversionChartRef}></canvas>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Traffic Sources Distribution
            </CardTitle>
            <CardDescription>
              Where your visitors are coming from - focus your marketing efforts
            </CardDescription>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                SEO performing well
              </Badge>
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                Increase social presence
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <canvas ref={trafficChartRef}></canvas>
            </div>
          </CardContent>
        </Card>

        {/* Website Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Website Performance Metrics
            </CardTitle>
            <CardDescription>
              Page views vs bounce rate - track user engagement quality
            </CardDescription>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-green-600 border-green-200">
                Views: +62% growth
              </Badge>
              <Badge variant="outline" className="text-green-600 border-green-200">
                Bounce: -29% improvement
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <canvas ref={performanceChartRef}></canvas>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Summary */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Analytics Summary & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-700">✅ What's Working Well</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Weekend Performance:</strong> Saturday shows 35.2% conversion rate</li>
                <li>• <strong>Organic Traffic:</strong> 35% of traffic from search engines</li>
                <li>• <strong>Growth Trend:</strong> 24% increase in conversions this week</li>
                <li>• <strong>User Engagement:</strong> Bounce rate decreased to 32%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-orange-700">🎯 Areas for Improvement</h4>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Monday Performance:</strong> Only 23.5% conversion rate</li>
                <li>• <strong>Social Media:</strong> Only 15% traffic share - room to grow</li>
                <li>• <strong>Paid Ads:</strong> Lowest ROI at 5% traffic share</li>
                <li>• <strong>Email Campaigns:</strong> 12% share could be optimized</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}