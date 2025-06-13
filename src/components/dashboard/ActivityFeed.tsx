import React from 'react';
import { Clock, User, Package, ShoppingCart, Truck, AlertCircle, CheckCircle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'order' | 'product' | 'user' | 'delivery' | 'system';
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
  status?: 'success' | 'warning' | 'error' | 'info';
}

interface ActivityFeedProps {
  activities: Activity[];
  title?: string;
  maxItems?: number;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  title = "Activité Récente",
  maxItems = 10
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return ShoppingCart;
      case 'product':
        return Package;
      case 'user':
        return User;
      case 'delivery':
        return Truck;
      case 'system':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'bg-blue-100 text-blue-600';
      case 'product':
        return 'bg-green-100 text-green-600';
      case 'user':
        return 'bg-purple-100 text-purple-600';
      case 'delivery':
        return 'bg-yellow-100 text-yellow-600';
      case 'system':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)} h`;
    return `Il y a ${Math.floor(diffInMinutes / 1440)} j`;
  };

  const displayedActivities = activities.slice(0, maxItems);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {displayedActivities.map((activity) => {
          const Icon = getIcon(activity.type);
          
          return (
            <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${getTypeColor(activity.type)}`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </p>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(activity.status)}
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.description}
                  </p>
                  
                  {activity.user && (
                    <div className="flex items-center mt-2">
                      {activity.user.avatar ? (
                        <img
                          src={activity.user.avatar}
                          alt={activity.user.name}
                          className="w-5 h-5 rounded-full mr-2"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-300 mr-2" />
                      )}
                      <span className="text-xs text-gray-500">
                        par {activity.user.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {activities.length > maxItems && (
        <div className="px-6 py-3 border-t border-gray-200 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Voir toutes les activités ({activities.length - maxItems} de plus)
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;