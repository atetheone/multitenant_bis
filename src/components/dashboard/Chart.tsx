import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  title: string;
  data: ChartData[];
  type: 'line' | 'bar' | 'doughnut';
  height?: number;
  showLegend?: boolean;
}

const Chart: React.FC<ChartProps> = ({
  title,
  data,
  type,
  height = 300,
  showLegend = true
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const renderLineChart = () => {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item.value / maxValue) * 80;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="relative" style={{ height: height - 60 }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <polyline
            points={points}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="0.5"
            className="drop-shadow-sm"
          />
          <polygon
            points={`${points} 100,100 0,100`}
            fill="url(#gradient)"
          />
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (item.value / maxValue) * 80;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="0.8"
                fill="#3B82F6"
                className="hover:r-1.5 transition-all cursor-pointer"
              />
            );
          })}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
          {data.map((item, index) => (
            <span key={index}>{item.label}</span>
          ))}
        </div>
      </div>
    );
  };

  const renderBarChart = () => {
    return (
      <div className="space-y-4" style={{ height: height - 60 }}>
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          const color = item.color || colors[index % colors.length];
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-20 text-sm text-gray-600 truncate">{item.label}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color
                  }}
                />
              </div>
              <div className="w-16 text-sm font-medium text-gray-900 text-right">
                {item.value.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDoughnutChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    const radius = 40;
    const centerX = 50;
    const centerY = 50;

    return (
      <div className="flex items-center justify-center" style={{ height: height - 60 }}>
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 100 100">
            {data.map((item, index) => {
              const percentage = item.value / total;
              const angle = percentage * 360;
              const color = item.color || colors[index % colors.length];
              
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              currentAngle += angle;

              const startAngleRad = (startAngle * Math.PI) / 180;
              const endAngleRad = (endAngle * Math.PI) / 180;

              const x1 = centerX + radius * Math.cos(startAngleRad);
              const y1 = centerY + radius * Math.sin(startAngleRad);
              const x2 = centerX + radius * Math.cos(endAngleRad);
              const y2 = centerY + radius * Math.sin(endAngleRad);

              const largeArcFlag = angle > 180 ? 1 : 0;

              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              );
            })}
            <circle
              cx={centerX}
              cy={centerY}
              r="20"
              fill="white"
              className="drop-shadow-sm"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{total.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600 font-medium">+12.5%</span>
        </div>
      </div>
      
      {type === 'line' && renderLineChart()}
      {type === 'bar' && renderBarChart()}
      {type === 'doughnut' && renderDoughnutChart()}
      
      {showLegend && type === 'doughnut' && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map((item, index) => {
            const color = item.color || colors[index % colors.length];
            const percentage = ((item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1);
            
            return (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="text-sm font-medium text-gray-900 ml-auto">{percentage}%</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Chart;