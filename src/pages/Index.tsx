
import { useState } from 'react';
import { TrendCard } from '@/components/TrendCard';
import { FilterBar } from '@/components/FilterBar';
import { Header } from '@/components/Header';
import { mockTrends } from '@/data/mockData';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const filteredTrends = mockTrends.filter(trend => {
    if (selectedCategory !== 'all' && trend.category !== selectedCategory) return false;
    if (selectedRegion !== 'all' && trend.region !== selectedRegion) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
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
          onCategoryChange={setSelectedCategory}
          onTimeframeChange={setSelectedTimeframe}
          onRegionChange={setSelectedRegion}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredTrends.map((trend) => (
            <TrendCard key={trend.id} trend={trend} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
