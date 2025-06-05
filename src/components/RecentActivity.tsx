
import { Clock, Eye, Star } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'viewed' | 'starred' | 'feedback';
  title: string;
  timestamp: string;
}

const mockActivity: ActivityItem[] = [
  { id: '1', type: 'viewed', title: 'Cottagecore Aesthetics', timestamp: '2 hours ago' },
  { id: '2', type: 'starred', title: 'Y2K Revival Accessories', timestamp: '4 hours ago' },
  { id: '3', type: 'feedback', title: 'Oversized Blazers', timestamp: '1 day ago' },
  { id: '4', type: 'viewed', title: 'Sustainable Fashion', timestamp: '2 days ago' },
];

export const RecentActivity = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'viewed': return <Eye className="w-4 h-4" />;
      case 'starred': return <Star className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'viewed': return 'text-blue-600';
      case 'starred': return 'text-amber-600';
      default: return 'text-stone-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
      <h3 className="text-lg font-medium text-stone-800 mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {mockActivity.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className={`${getColor(item.type)}`}>
              {getIcon(item.type)}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-stone-800">{item.title}</div>
              <div className="text-xs text-stone-500">{item.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
