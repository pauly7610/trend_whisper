
import { useState, useEffect, useMemo } from 'react';
import { TrendCard } from '@/components/TrendCard';
import { TrendCardSkeleton } from '@/components/TrendCardSkeleton';
import { FilterBar } from '@/components/FilterBar';
import { Header } from '@/components/Header';
import { EmptyState } from '@/components/EmptyState';
import { RecentActivity } from '@/components/RecentActivity';
import { apiFetch, getToken } from '../lib/api';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'tiktok' | 'reddit' | 'pinterest'>('tiktok');
  const [isLoading, setIsLoading] = useState(false);
  const [trends, setTrends] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch trends from backend or scrape live if searching
  useEffect(() => {
    const fetchTrends = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (searchQuery) {
          // Live scrape for open-ended search
          const data = await apiFetch<any>(
            '/fetch-trends',
            {
              method: 'POST',
              body: {
                platform: selectedPlatform,
                query: searchQuery,
                max_results: 12
              },
              token: getToken()
            }
          );
          setTrends(data.results || []);
        } else {
          // Default: show cached/batch trends
          const params = new URLSearchParams();
          if (selectedCategory !== 'all') params.append('category', selectedCategory);
          if (selectedRegion !== 'all') params.append('region', selectedRegion);
          const endpoint = params.toString() ? `/trends?${params.toString()}` : '/trends';
          const data = await apiFetch<{ trends: any[] }>(endpoint, { token: getToken() });
          setTrends(data.trends || []);
        }
      } catch (e: any) {
        setError(e.toString());
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrends();
    // eslint-disable-next-line
  }, [selectedCategory, selectedRegion, searchQuery, selectedPlatform]);

  const filteredTrends = useMemo(() => {
    // If backend filtering is not complete, filter client-side as fallback
    return trends.filter(trend => {
      if (selectedCategory !== 'all' && trend.category !== selectedCategory) return false;
      if (selectedRegion !== 'all' && trend.region !== selectedRegion) return false;
      if (searchQuery && !trend.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [trends, selectedCategory, selectedRegion, searchQuery]);

  const handleFilterChange = () => {
    // No need for simulated delay; loading is managed by fetchTrends
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTimeframe('week');
    setSelectedRegion('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
  <Header onSearchChange={handleSearchChange} searchQuery={searchQuery} />
  <div className="flex items-center gap-2">
    <label htmlFor="platform-select" className="text-stone-700 text-sm font-medium">Platform:</label>
    <select
      id="platform-select"
      value={selectedPlatform}
      onChange={e => setSelectedPlatform(e.target.value as 'tiktok' | 'reddit' | 'pinterest')}
      className="border rounded-md px-3 py-2 text-stone-700 bg-white focus:outline-none focus:ring-amber-400 focus:border-amber-400"
    >
      <option value="tiktok">TikTok</option>
      <option value="reddit">Reddit</option>
      <option value="pinterest">Pinterest</option>
    </select>
  </div>
</div>
      
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
            ) : error ? (
              <EmptyState
                type="error"
                title="Error loading trends"
                description={error}
                actionText="Retry"
                onAction={() => window.location.reload()}
              />
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
                  <span className="font-medium">{trends.length}</span>
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
