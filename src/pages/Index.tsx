
import { useState, useMemo } from 'react';
import { TrendCard } from '@/components/TrendCard';
import { TrendCardSkeleton } from '@/components/TrendCardSkeleton';
import { FilterBar } from '@/components/FilterBar';
import { Header } from '@/components/Header';
import { EmptyState } from '@/components/EmptyState';
import { RecentActivity } from '@/components/RecentActivity';
import { mockTrends } from '@/data/mockData';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredTrends = useMemo(() => {
    return mockTrends.filter(trend => {
      if (selectedCategory !== 'all' && trend.category !== selectedCategory) return false;
      if (selectedRegion !== 'all' && trend.region !== selectedRegion) return false;
      if (searchQuery && !trend.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [selectedCategory, selectedRegion, searchQuery]);

  const handleFilterChange = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    handleFilterChange();
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTimeframe('week');
    setSelectedRegion('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header onSearchChange={handleSearchChange} searchQuery={searchQuery} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-4xl font-light text-stone-800 mb-3 tracking-wide">
                Trend Intelligence
              </h1>
              <p className="text-lg text-stone-600 font-light">
                AI-powered insights for merchandising excellence
              </p>
            </div>

            <FilterBar
              selectedCategory={selectedCategory}
              selectedTimeframe={selectedTimeframe}
              selectedRegion={selectedRegion}
              onCategoryChange={(value) => { setSelectedCategory(value); handleFilterChange(); }}
              onTimeframeChange={(value) => { setSelectedTimeframe(value); handleFilterChange(); }}
              onRegionChange={(value) => { setSelectedRegion(value); handleFilterChange(); }}
            />

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <TrendCardSkeleton key={index} />
                ))}
              </div>
            ) : filteredTrends.length === 0 ? (
              <EmptyState
                type="search"
                title="No trends found"
                description="Try adjusting your filters or search query to find more trends."
                actionText="Clear Filters"
                onAction={clearFilters}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {filteredTrends.map((trend) => (
                  <TrendCard key={trend.id} trend={trend} />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <RecentActivity />
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-medium text-stone-800 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-stone-600">Active Trends</span>
                  <span className="font-medium">{mockTrends.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Avg. Accuracy</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">This Week</span>
                  <span className="font-medium text-emerald-600">+15 new</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
