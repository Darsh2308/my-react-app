import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Minus, Target, Users, MessageSquare, Zap } from 'lucide-react';
import TrendIndicator from './TrendIndicator';

const stats = [
  {
    title: 'Form Submissions',
    value: '125',
    description: 'This week',
    change: 24.3,
    changeType: 'positive' as const,
    comparison: 'vs last week',
    icon: MessageSquare,
    color: 'blue',
    insights: 'Peak on Saturday',
    goal: 150,
    current: 125,
  },
  {
    title: 'Conversion Rate',
    value: '28.4%',
    description: 'Leads converted',
    change: 6.2,
    changeType: 'positive' as const,
    comparison: 'vs last month',
    icon: Target,
    color: 'green',
    insights: 'Above industry avg',
    benchmark: '22%',
  },
  {
    title: 'Active Visitors',
    value: '2,847',
    description: 'Monthly unique',
    change: 15.8,
    changeType: 'positive' as const,
    comparison: 'vs last month',
    icon: Users,
    color: 'purple',
    insights: 'Organic growth',
    progress: 71.2,
    progressLabel: 'Monthly goal progress',
  },
  {
    title: 'Avg. Response Time',
    value: '2.3h',
    description: 'Lead response',
    change: -18.5,
    changeType: 'positive' as const,
    comparison: 'improvement',
    icon: Zap,
    color: 'orange',
    insights: 'Under target',
    target: '< 4h',
  },
];

const getColorClasses = (color: string) => {
  const colors = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    orange: 'text-orange-600 bg-orange-100',
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        const colorClasses = getColorClasses(stat.color);
        
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${colorClasses}`}>
                <IconComponent className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline gap-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <TrendIndicator
                  value={stat.change}
                  label={stat.comparison}
                  trend={
                    stat.title === 'Avg. Response Time' 
                      ? (stat.change < 0 ? 'up' : 'down')
                      : (stat.change > 0 ? 'up' : stat.change < 0 ? 'down' : 'neutral')
                  }
                  percentage={Math.abs(stat.change)}
                  className="text-xs"
                />
              </div>
              
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>

              {/* Progress Bar for Goals */}
              {stat.goal && stat.current && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Goal Progress</span>
                    <span>{Math.round((stat.current / stat.goal) * 100)}%</span>
                  </div>
                  <Progress value={(stat.current / stat.goal) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {stat.current} of {stat.goal} target
                  </p>
                </div>
              )}

              {/* Monthly Progress */}
              {stat.progress && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{stat.progressLabel}</span>
                    <span>{stat.progress}%</span>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </div>
              )}

              {/* Insights & Benchmarks */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {stat.insights}
                </Badge>
                {stat.benchmark && (
                  <span className="text-xs text-muted-foreground">
                    Industry: {stat.benchmark}
                  </span>
                )}
                {stat.target && (
                  <span className="text-xs text-muted-foreground">
                    Target: {stat.target}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}