import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
  onClick: () => void;
  badge?: {
    text: string;
    color: 'red' | 'yellow' | 'green' | 'blue';
  };
  disabled?: boolean;
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
  columns?: 2 | 3 | 4;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  title = "Actions Rapides",
  columns = 3
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100 hover:bg-blue-200',
    green: 'text-green-600 bg-green-100 hover:bg-green-200',
    yellow: 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200',
    red: 'text-red-600 bg-red-100 hover:bg-red-200',
    purple: 'text-purple-600 bg-purple-100 hover:bg-purple-200',
    indigo: 'text-indigo-600 bg-indigo-100 hover:bg-indigo-200',
  };

  const badgeColors = {
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
  };

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">{title}</h3>
      
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {actions.map((action) => {
          const Icon = action.icon;
          
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              disabled={action.disabled}
              className={`relative p-4 rounded-lg border border-gray-200 transition-all duration-200 text-left ${
                action.disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:shadow-md hover:border-gray-300 transform hover:-translate-y-0.5'
              }`}
            >
              {action.badge && (
                <div className="absolute top-2 right-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    badgeColors[action.badge.color]
                  }`}>
                    {action.badge.text}
                  </span>
                </div>
              )}
              
              <div className={`inline-flex p-3 rounded-full ${colorClasses[action.color]} mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                {action.title}
              </h4>
              
              <p className="text-xs text-gray-600">
                {action.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;