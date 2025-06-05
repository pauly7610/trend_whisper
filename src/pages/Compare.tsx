
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { TrendSelector } from '@/components/TrendSelector';
import { ComparisonChart } from '@/components/ComparisonChart';
import { mockTrends } from '@/data/mockData';
import { ArrowUp, ArrowDown, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';

const Compare = () => {
  const [searchParams] = useSearchParams();
  const { showSuccess } = useNotifications();
  const initialIds = searchParams.get('trends')?.split(',') || [];
  const [selectedTrends, setSelectedTrends] = useState<string[]>(initialIds);

  const trends = useMemo(() => {
    return selectedTrends.map(id => mockTrends.find(t => t.id === id)).filter(Boolean);
  }, [selectedTrends]);

  const exportComparison = () => {
    const data = {
      comparison_date: new Date().toISOString(),
      trends: trends.map(trend => ({
        id: trend.id,
        title: trend.title,
        category: trend.category,
        popularity: trend.popularity,
        change: trend.change,
        forecast: trend.forecast
      }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trend-comparison-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    showSuccess('Comparison exported successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-light text-stone-800 mb-3 tracking-wide">
            Trend Comparison
          </h1>
          <p className="text-lg text-stone-600 font-light">
            Compare multiple trends side by side
          </p>
        </div>

        <div className="mb-6">
          <TrendSelector
            selectedTrends={selectedTrends}
            onTrendsChange={setSelectedTrends}
            maxSelections={4}
          />
        </div>

        {trends.length >= 2 && (
          <div className="mb-6">
            <Button onClick={exportComparison} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Comparison</span>
            </Button>
          </div>
        )}

        {trends.length >= 2 ? (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-medium text-stone-800 mb-4">Popularity Comparison</h3>
              <ComparisonChart trends={trends} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trends.map((trend) => (
                <div key={trend.id} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <img src={trend.image} alt={trend.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-medium text-stone-800">{trend.title}</h4>
                      <span className="text-sm text-stone-600">{trend.category}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Popularity</span>
                      <span className="font-medium">{trend.popularity}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">Change</span>
                      <div className="flex items-center space-x-1">
                        {trend.change > 0 ? (
                          <ArrowUp className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <ArrowDown className="w-3 h-3 text-red-500" />
                        )}
                        <span className={`font-medium ${
                          trend.change > 0 ? 'text-emerald-600' : 'text-red-500'
                        }`}>
                          {Math.abs(trend.change)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-stone-500 bg-stone-50 rounded p-2">
                      {trend.forecast}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-stone-600">Select at least 2 trends to compare</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Compare;
