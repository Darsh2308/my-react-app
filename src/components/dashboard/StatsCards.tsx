import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const stats = [
  {
    title: 'New Submissions',
    value: '23',
    description: 'Today',
    change: '+12%',
    changeType: 'positive' as const,
    comparison: 'vs yesterday',
  },
  {
    title: 'This Month',
    value: '1,249',
    description: 'Total submissions',
    change: '+23',
    changeType: 'positive' as const,
    comparison: 'from last month',
    progress: 68,
  },
  {
    title: 'Total Leads',
    value: '12,847',
    description: 'All-time submissions',
    change: '0%',
    changeType: 'neutral' as const,
    comparison: 'this week',
  },
  {
    title: 'Conversion Rate',
    value: '24.5%',
    description: 'Leads converted',
    change: '-2.1%',
    changeType: 'negative' as const,
    comparison: 'from last month',
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.changeType === 'positive' && <TrendingUp className="h-4 w-4 text-green-600" />}
            {stat.changeType === 'negative' && <TrendingDown className="h-4 w-4 text-red-600" />}
            {stat.changeType === 'neutral' && <Minus className="h-4 w-4 text-muted-foreground" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mb-2">
              {stat.description}
            </p>
            {stat.progress && (
              <div className="mb-2">
                <Progress value={stat.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.progress}% of month completed
                </p>
              </div>
            )}
            <div className="flex items-center text-xs">
              <span
                className={`font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-green-600'
                    : stat.changeType === 'negative'
                    ? 'text-red-600'
                    : 'text-muted-foreground'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-muted-foreground ml-1">
                {stat.comparison}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}