
import { useState } from 'react';
import { TrendingUp, ArrowUp, ArrowDown, Star, Package } from 'lucide-react';
import { mockTrends, mockRelatedProducts } from '@/data/mockData';
import { AssortmentPanel } from '@/components/AssortmentPanel';

interface RecommendationCard {
  id: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  impact: number;
  investment: string;
  reasoning: string;
  trends: string[];
  products: any[];
}

const mockRecommendations: RecommendationCard[] = [
  {
    id: '1',
    category: 'Beauty',
    priority: 'high',
    impact: 94,
    investment: '$25K',
    reasoning: 'Clean Girl Makeup and Glass Skin trends showing explosive growth with 6+ month projected lifespan',
    trends: ['Clean Girl Makeup', 'Glass Skin Routine', 'Strawberry Makeup'],
    products: mockRelatedProducts.slice(0, 2)
  },
  {
    id: '2',
    category: 'Apparel',
    priority: 'high',
    impact: 91,
    investment: '$45K',
    reasoning: 'Y2K revival driving wide leg jeans and bubble skirts with massive growth potential',
    trends: ['Wide Leg Jeans', 'Bubble Skirts', 'Vintage Band Tees'],
    products: mockRelatedProducts.slice(0, 3)
  },
  {
    id: '3',
    category: 'Accessories',
    priority: 'medium',
    impact: 78,
    investment: '$15K',
    reasoning: 'Minimalist jewelry trend aligns with mindful consumption, sustained growth expected',
    trends: ['Minimalist Jewelry', 'Chunky Gold Chains', 'Pearl Accessories'],
    products: mockRelatedProducts.slice(0, 2)
  },
  {
    id: '4',
    category: 'Footwear',
    priority: 'medium',
    impact: 72,
    investment: '$35K',
    reasoning: 'Combat boots showing strong cross-demographic appeal with grunge revival',
    trends: ['Combat Boots', 'Platform Sandals'],
    products: mockRelatedProducts.slice(0, 1)
  }
];

export const AssortmentRecommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'impact' | 'investment' | 'priority'>('impact');

  const categories = ['all', 'beauty', 'apparel', 'accessories', 'footwear'];

  const filteredRecommendations = mockRecommendations
    .filter(rec => selectedCategory === 'all' || rec.category.toLowerCase() === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'impact') return b.impact - a.impact;
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return parseInt(b.investment.replace('$', '').replace('K', '')) - parseInt(a.investment.replace('$', '').replace('K', ''));
    });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-emerald-600 bg-emerald-50';
      default: return 'text-stone-600 bg-stone-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-light text-stone-800">AI Recommendations</h2>
          <p className="text-sm text-stone-600">Strategic product selection based on trend forecasts</p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-stone-200 rounded-lg text-sm bg-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-stone-200 rounded-lg text-sm bg-white"
          >
            <option value="impact">Sort by Impact</option>
            <option value="priority">Sort by Priority</option>
            <option value="investment">Sort by Investment</option>
          </select>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRecommendations.map((recommendation) => (
          <div key={recommendation.id} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:shadow-lg transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-light text-stone-800 mb-1">{recommendation.category}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
                  {recommendation.priority.toUpperCase()} PRIORITY
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-light text-stone-800">{recommendation.impact}%</div>
                <div className="text-xs text-stone-500">Impact Score</div>
              </div>
            </div>

            {/* Investment and Trends */}
            <div className="mb-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4 text-amber-600" />
                  <span className="text-sm text-stone-600">Investment: {recommendation.investment}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-stone-600">{recommendation.trends.length} trends</span>
                </div>
              </div>
              
              <p className="text-sm text-stone-600 mb-3">{recommendation.reasoning}</p>
              
              <div className="flex flex-wrap gap-2">
                {recommendation.trends.map((trend, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-50 text-amber-700">
                    {trend}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Suggestions */}
            <div>
              <h4 className="text-sm font-medium text-stone-800 mb-3">Suggested Products ({recommendation.products.length})</h4>
              <AssortmentPanel products={recommendation.products} />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-2xl p-6 border border-amber-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-light text-stone-800">{filteredRecommendations.length}</div>
            <div className="text-sm text-stone-600">Active Recommendations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-stone-800">
              {filteredRecommendations.filter(r => r.priority === 'high').length}
            </div>
            <div className="text-sm text-stone-600">High Priority</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-stone-800">
              ${filteredRecommendations.reduce((sum, r) => sum + parseInt(r.investment.replace('$', '').replace('K', '')), 0)}K
            </div>
            <div className="text-sm text-stone-600">Total Investment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-stone-800">
              {Math.round(filteredRecommendations.reduce((sum, r) => sum + r.impact, 0) / filteredRecommendations.length)}%
            </div>
            <div className="text-sm text-stone-600">Avg Impact Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};
