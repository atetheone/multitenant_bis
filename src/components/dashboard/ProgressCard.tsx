import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ProgressItem {
  label: string;
  value: number;
  target: number;
  color?: string;
}

interface ProgressCardProps {
  title: string;
  icon?: LucideIcon;
  items: ProgressItem[];
  showPercentage?: boolean;
  showValues?: boolean;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  icon: Icon,
  items,
  showPercentage = true,
  showValues = true
}) => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {Icon && (
          <div className="p-2 bg-blue-100 rounded-full">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {items.map((item, index) => {
          const percentage = Math.min((item.value / item.target) * 100, 100);
          const color = item.color || colors[index % colors.length];
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <div className="flex items-center space-x-2 text-sm">
                  {showValues && (
                    <span className="text-gray-600">
                      {item.value.toLocaleString()} / {item.target.toLocaleString()}
                    </span>
                  )}
                  {showPercentage && (
                    <span className="font-medium text-gray-900">
                      {percentage.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color
                  }}
                >
                  {percentage > 0 && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-30" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progression Globale</span>
          <span className="font-medium text-gray-900">
            {(
              (items.reduce((sum, item) => sum + item.value, 0) /
                items.reduce((sum, item) => sum + item.target, 0)) *
              100
            ).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;