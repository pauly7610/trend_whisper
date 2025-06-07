
import { useState } from 'react';
import { TrendingUp, Package, ChevronDown } from 'lucide-react';
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
  subcategory?: string;
}

const categoryData = {
  beauty: {
    name: 'Beauty',
    description: 'Cosmetics, skincare, and personal care products',
    recommendations: [
      {
        id: 'b1',
        category: 'Beauty',
        subcategory: 'Makeup',
        priority: 'high' as const,
        impact: 94,
        investment: '$25K',
        reasoning: 'Clean Girl Makeup trend showing explosive growth with 6+ month projected lifespan. Perfect for minimalist beauty consumers.',
        trends: ['Clean Girl Makeup', 'Glass Skin Routine', 'Strawberry Makeup'],
        products: mockRelatedProducts.beauty.makeup
      },
      {
        id: 'b2',
        category: 'Beauty',
        subcategory: 'Skincare',
        priority: 'high' as const,
        impact: 89,
        investment: '$35K',
        reasoning: 'Glass Skin routine driving demand for hydrating serums and lightweight moisturizers with K-beauty influence.',
        trends: ['Glass Skin Routine', 'Korean Skincare', 'Hyaluronic Acid'],
        products: mockRelatedProducts.beauty.skincare
      },
      {
        id: 'b3',
        category: 'Beauty',
        subcategory: 'Tools',
        priority: 'medium' as const,
        impact: 76,
        investment: '$15K',
        reasoning: 'Facial tools gaining traction with wellness-focused consumers, especially gua sha and jade rollers.',
        trends: ['Facial Tools', 'Gua Sha', 'Self Care Rituals'],
        products: mockRelatedProducts.beauty.tools
      }
    ]
  },
  apparel: {
    name: 'Apparel',
    description: 'Clothing and fashion items',
    recommendations: [
      {
        id: 'a1',
        category: 'Apparel',
        subcategory: 'Bottoms',
        priority: 'high' as const,
        impact: 91,
        investment: '$45K',
        reasoning: 'Y2K revival driving wide leg jeans with massive growth potential across age demographics.',
        trends: ['Wide Leg Jeans', 'Y2K Fashion', 'Baggy Fits'],
        products: mockRelatedProducts.apparel.bottoms
      },
      {
        id: 'a2',
        category: 'Apparel',
        subcategory: 'Dresses',
        priority: 'high' as const,
        impact: 85,
        investment: '$30K',
        reasoning: 'Bubble skirts and mini dresses trending with Gen Z, perfect for spring/summer collections.',
        trends: ['Bubble Skirts', 'Mini Dresses', 'Preppy Core'],
        products: mockRelatedProducts.apparel.dresses
      },
      {
        id: 'a3',
        category: 'Apparel',
        subcategory: 'Tops',
        priority: 'medium' as const,
        impact: 79,
        investment: '$20K',
        reasoning: 'Vintage band tees showing sustained popularity with authentic vintage pieces commanding premium prices.',
        trends: ['Vintage Band Tees', 'Grunge Revival', 'Oversized Fits'],
        products: mockRelatedProducts.apparel.tops
      }
    ]
  },
  accessories: {
    name: 'Accessories',
    description: 'Jewelry, bags, and fashion accessories',
    recommendations: [
      {
        id: 'ac1',
        category: 'Accessories',
        subcategory: 'Jewelry',
        priority: 'high' as const,
        impact: 78,
        investment: '$15K',
        reasoning: 'Minimalist jewelry trend aligns with mindful consumption, sustained growth expected with gold pieces.',
        trends: ['Minimalist Jewelry', 'Chunky Gold Chains', 'Pearl Accessories'],
        products: mockRelatedProducts.accessories.jewelry
      },
      {
        id: 'ac2',
        category: 'Accessories',
        subcategory: 'Bags',
        priority: 'medium' as const,
        impact: 72,
        investment: '$28K',
        reasoning: 'Mini bags and crossbody styles gaining momentum with urban professionals and students.',
        trends: ['Mini Bags', 'Crossbody Bags', 'Structured Handbags'],
        products: mockRelatedProducts.accessories.bags
      }
    ]
  },
  footwear: {
    name: 'Footwear',
    description: 'Shoes and boots',
    recommendations: [
      {
        id: 'f1',
        category: 'Footwear',
        subcategory: 'Boots',
        priority: 'high' as const,
        impact: 82,
        investment: '$35K',
        reasoning: 'Combat boots showing strong cross-demographic appeal with grunge revival and practical styling.',
        trends: ['Combat Boots', 'Grunge Revival', 'Platform Shoes'],
        products: mockRelatedProducts.footwear.boots
      },
      {
        id: 'f2',
        category: 'Footwear',
        subcategory: 'Sandals',
        priority: 'medium' as const,
        impact: 68,
        investment: '$22K',
        reasoning: 'Platform sandals trending for summer with Y2K revival influence and comfort-focused designs.',
        trends: ['Platform Sandals', 'Chunky Soles', 'Comfort Footwear'],
        products: mockRelatedProducts.footwear.sandals
      }
    ]
  }
};

export const AssortmentRecommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categoryData>('beauty');
  const [sortBy, setSortBy] = useState<'impact' | 'investment' | 'priority'>('impact');

  const currentCategoryData = categoryData[selectedCategory];
  
  const sortedRecommendations = [...currentCategoryData.recommendations].sort((a, b) => {
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
      {/* Category Selection Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-light text-stone-800">Category Assortment Planning</h2>
          <p className="text-sm text-stone-600">AI-powered recommendations for your category</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as keyof typeof categoryData)}
              className="appearance-none px-4 py-3 pr-10 border border-stone-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-200 min-w-[180px]"
            >
              {Object.entries(categoryData).map(([key, data]) => (
                <option key={key} value={key}>
                  {data.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-3 border border-stone-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-200"
          >
            <option value="impact">Sort by Impact</option>
            <option value="priority">Sort by Priority</option>
            <option value="investment">Sort by Investment</option>
          </select>
        </div>
      </div>

      {/* Category Overview */}
      <div className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-2xl p-6 border border-amber-200">
        <h3 className="text-lg font-medium text-stone-800 mb-2">{currentCategoryData.name} Category</h3>
        <p className="text-stone-600 mb-4">{currentCategoryData.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-light text-stone-800">{sortedRecommendations.length}</div>
            <div className="text-sm text-stone-600">Active Recommendations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-stone-800">
              {sortedRecommendations.filter(r => r.priority === 'high').length}
            </div>
            <div className="text-sm text-stone-600">High Priority</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-stone-800">
              ${sortedRecommendations.reduce((sum, r) => sum + parseInt(r.investment.replace('$', '').replace('K', '')), 0)}K
            </div>
            <div className="text-sm text-stone-600">Total Investment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-light text-stone-800">
              {Math.round(sortedRecommendations.reduce((sum, r) => sum + r.impact, 0) / sortedRecommendations.length)}%
            </div>
            <div className="text-sm text-stone-600">Avg Impact Score</div>
          </div>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedRecommendations.map((recommendation) => (
          <div key={recommendation.id} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:shadow-lg transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-light text-stone-800 mb-1">{recommendation.subcategory}</h3>
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
    </div>
  );
};
