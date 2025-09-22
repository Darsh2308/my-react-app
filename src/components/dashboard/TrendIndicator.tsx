import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../ui/utils';

interface TrendIndicatorProps {
  value: number;
  label: string;
  trend: 'up' | 'down' | 'neutral';
  percentage: number;
  className?: string;
}

export default function TrendIndicator({ 
  value, 
  label, 
  trend, 
  percentage, 
  className 
}: TrendIndicatorProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1">
        {getTrendIcon()}
        <span className={cn("text-sm font-medium", getTrendColor())}>
          {percentage > 0 ? '+' : ''}{percentage.toFixed(1)}%
        </span>
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}