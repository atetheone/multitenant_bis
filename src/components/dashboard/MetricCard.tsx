import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  format?: 'number' | 'currency' | 'percentage';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  subtitle?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  size?: 'sm' | 'md' | 'lg';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  previousValue,
  format = 'number',
  trend,
  trendValue,
  subtitle,
  color = 'blue',
  size = 'md'
}) => {
  const formatValue = (val: string | number) => {
    const numValue = typeof val === 'string' ? parseFloat(val) : val;
    
    switch (format) {
      case 'currency':
        return `${numValue.toLocaleString()} FCFA`;
      case 'percentage':
        return `${numValue}%`;
      default:
        return numValue.toLocaleString();
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-100';
      case 'down':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const colorClasses = {
    blue: 'border-blue-200 bg-blue-50',
    green: 'border-green-200 bg-green-50',
    yellow: 'border-yellow-200 bg-yellow-50',
    red: 'border-red-200 bg-red-50',
    purple: 'border-purple-200 bg-purple-50',
  };

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const textSizes = {
    sm: { title: 'text-sm', value: 'text-lg', subtitle: 'text-xs' },
    md: { title: 'text-base', value: 'text-2xl', subtitle: 'text-sm' },
    lg: { title: 'text-lg', value: 'text-3xl', subtitle: 'text-base' },
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border-l-4 ${colorClasses[color]} ${sizeClasses[size]} hover:shadow-lg transition-shadow`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className={`font-medium text-gray-600 ${textSizes[size].title}`}>
            {title}
          </h3>
          
          <div className="flex items-baseline space-x-2 mt-2">
            <span className={`font-bold text-gray-900 ${textSizes[size].value}`}>
              {formatValue(value)}
            </span>
            
            {previousValue && (
              <span className="text-xs text-gray-500">
                vs {formatValue(previousValue)}
              </span>
            )}
          </div>
          
          {subtitle && (
            <p className={`text-gray-500 mt-1 ${textSizes[size].subtitle}`}>
              {subtitle}
            </p>
          )}
        </div>
        
        {(trend || trendValue !== undefined) && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getTrendColor()}`}>
            {getTrendIcon()}
            {trendValue !== undefined && (
              <span className="text-xs font-medium">
                {trendValue > 0 ? '+' : ''}{trendValue}%
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;