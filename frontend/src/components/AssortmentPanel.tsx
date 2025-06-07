import { useState } from 'react';
import { Star, X, Package } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

interface Product {
  id: string;
  name: string;
  image: string;
  trendId: string;
}

interface AssortmentPanelProps {
  products: Product[];
}

export const AssortmentPanel = ({ products }: AssortmentPanelProps) => {
  const [priorityProducts, setPriorityProducts] = useState<string[]>([]);
  const [dismissedProducts, setDismissedProducts] = useState<string[]>([]);
  
  const { showSuccess, showInfo } = useNotifications();

  const handlePriorityToggle = (productId: string) => {
    setPriorityProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    
    const action = priorityProducts.includes(productId) ? 'removed from' : 'added to';
    showSuccess(`Product ${action} priority list`);
  };

  const handleDismiss = (productId: string) => {
    setDismissedProducts(prev => [...prev, productId]);
    showInfo('Product dismissed from suggestions');
  };

  const filteredProducts = products.filter(product => !dismissedProducts.includes(product.id));

  return (
    <div className="space-y-4">
      {filteredProducts.length === 0 ? (
        <div className="text-stone-500 italic">No more suggestions.</div>
      ) : (
        filteredProducts.map(product => (
          <div key={product.id} className="flex items-center justify-between p-4 rounded-lg bg-stone-50 border border-stone-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-stone-800">{product.name}</h4>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePriorityToggle(product.id)}
                className={`p-2 rounded-full hover:bg-amber-100 transition-colors ${
                  priorityProducts.includes(product.id) ? 'text-amber-600' : 'text-stone-400'
                }`}
              >
                <Star className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDismiss(product.id)}
                className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
