
import { ArrowUp, ArrowDown, Plus } from 'lucide-react';
import { Sparkline } from '@/components/Sparkline';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface TrendCardProps {
  trend: {
    id: string;
    title: string;
    category: string;
    image: string;
    popularity: number;
    change: number;
    sourceCount: number;
    forecast: string;
    sparklineData: number[];
    region: string;
  };
}

export const TrendCard = ({ trend }: TrendCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on the compare button
    if ((e.target as HTMLElement).closest('.compare-button')) {
      return;
    }
    navigate(`/trend/${trend.id}`);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/compare?trends=${trend.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={trend.image}
          alt={trend.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-stone-700">
            {trend.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            {trend.change > 0 ? (
              <ArrowUp className="w-3 h-3 text-emerald-600" />
            ) : (
              <ArrowDown className="w-3 h-3 text-red-500" />
            )}
            <span className={`text-xs font-medium ${
              trend.change > 0 ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {Math.abs(trend.change)}%
            </span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-light text-stone-800 mb-3 group-hover:text-amber-700 transition-colors">
          {trend.title}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-stone-600">
            <span className="font-medium">{trend.sourceCount}</span> detections
          </div>
          <div className="w-20 h-8">
            <Sparkline data={trend.sparklineData} />
          </div>
        </div>

        <div className="text-sm text-stone-500 bg-stone-50 rounded-lg p-3 mb-4">
          {trend.forecast}
        </div>

        <Button
          onClick={handleCompareClick}
          variant="outline"
          size="sm"
          className="compare-button w-full flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Compare</span>
        </Button>
      </div>
    </div>
  );
};
