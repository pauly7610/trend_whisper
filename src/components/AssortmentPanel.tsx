
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  confidence: number;
  price: string;
  trendId: string;
}

interface AssortmentPanelProps {
  products: Product[];
}

export const AssortmentPanel = ({ products }: AssortmentPanelProps) => {
  const [priorities, setPriorities] = useState<Record<string, number>>({});
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const handlePriorityChange = (productId: string, priority: number) => {
    setPriorities(prev => ({
      ...prev,
      [productId]: priority
    }));
  };

  const handleDismiss = (productId: string) => {
    setDismissed(prev => new Set([...prev, productId]));
  };

  const handleMarkHighPriority = (productId: string) => {
    setPriorities(prev => ({
      ...prev,
      [productId]: 5
    }));
  };

  const visibleProducts = products.filter(product => !dismissed.has(product.id));

  return (
    <div className="space-y-4">
      {visibleProducts.map((product) => (
        <div key={product.id} className="border border-stone-200 rounded-lg p-4 bg-stone-50">
          <div className="flex space-x-3 mb-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium text-stone-800 text-sm">{product.name}</h4>
              <p className="text-xs text-stone-600">{product.brand}</p>
              <p className="text-sm font-medium text-stone-800">{product.price}</p>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-stone-600">Match Confidence</span>
              <span className="text-xs font-medium text-stone-800">{product.confidence}%</span>
            </div>
            <div className="w-full h-2 bg-stone-200 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                style={{ width: `${product.confidence}%` }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-xs text-stone-600 mb-2">Priority Level</label>
            <input
              type="range"
              min="1"
              max="5"
              value={priorities[product.id] || 3}
              onChange={(e) => handlePriorityChange(product.id, parseInt(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-stone-500 mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => handleMarkHighPriority(product.id)}
              className="flex-1 py-2 px-3 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 transition-colors"
            >
              High Priority
            </button>
            <button
              onClick={() => handleDismiss(product.id)}
              className="flex-1 py-2 px-3 bg-stone-300 text-stone-700 text-xs rounded-lg hover:bg-stone-400 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      ))}

      {visibleProducts.length === 0 && (
        <div className="text-center py-8 text-stone-500">
          <p>No matching products found for this trend.</p>
        </div>
      )}
    </div>
  );
};
