
import { useState } from 'react';
import { mockTrends } from '@/data/mockData';
import { Search, X } from 'lucide-react';

interface TrendSelectorProps {
  selectedTrends: string[];
  onTrendsChange: (trends: string[]) => void;
  maxSelections: number;
}

export const TrendSelector = ({ selectedTrends, onTrendsChange, maxSelections }: TrendSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrends = mockTrends.filter(trend => 
    trend.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedTrends.includes(trend.id)
  );

  const selectedTrendObjects = selectedTrends.map(id => 
    mockTrends.find(t => t.id === id)
  ).filter(Boolean);

  const addTrend = (trendId: string) => {
    if (selectedTrends.length < maxSelections) {
      onTrendsChange([...selectedTrends, trendId]);
    }
  };

  const removeTrend = (trendId: string) => {
    onTrendsChange(selectedTrends.filter(id => id !== trendId));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
      <h3 className="text-lg font-medium text-stone-800 mb-4">
        Select Trends ({selectedTrends.length}/{maxSelections})
      </h3>

      {selectedTrendObjects.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-stone-700 mb-2">Selected:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedTrendObjects.map((trend) => (
              <div key={trend.id} className="flex items-center space-x-2 bg-amber-50 px-3 py-1 rounded-full">
                <span className="text-sm">{trend.title}</span>
                <button
                  onClick={() => removeTrend(trend.id)}
                  className="text-stone-500 hover:text-stone-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search trends to add..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
        />
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2">
        {filteredTrends.map((trend) => (
          <button
            key={trend.id}
            onClick={() => addTrend(trend.id)}
            disabled={selectedTrends.length >= maxSelections}
            className="w-full flex items-center space-x-3 p-3 border border-stone-200 rounded-lg hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <img src={trend.image} alt={trend.title} className="w-10 h-10 rounded object-cover" />
            <div className="flex-1 text-left">
              <div className="font-medium text-stone-800">{trend.title}</div>
              <div className="text-sm text-stone-600">{trend.category}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
