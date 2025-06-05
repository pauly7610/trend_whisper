
import { Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface HeaderProps {
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
}

export const Header = ({ onSearchChange, searchQuery = '' }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    onSearchChange?.(query);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 
              className="text-2xl font-light text-stone-800 tracking-wide cursor-pointer"
              onClick={() => navigate('/')}
            >
              URBN Intelligence
            </h1>
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => navigate('/')}
                className={`${
                  isActive('/') ? 'text-amber-600' : 'text-stone-600'
                } hover:text-stone-800 transition-colors font-light`}
              >
                Trends
              </button>
              <button 
                onClick={() => navigate('/assortment')}
                className={`${
                  isActive('/assortment') ? 'text-amber-600' : 'text-stone-600'
                } hover:text-stone-800 transition-colors font-light`}
              >
                Assortment
              </button>
              <button 
                onClick={() => navigate('/analytics')}
                className={`${
                  isActive('/analytics') ? 'text-amber-600' : 'text-stone-600'
                } hover:text-stone-800 transition-colors font-light`}
              >
                Analytics
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search trends..."
                value={localSearchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 border border-stone-200 rounded-full bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent transition-all"
              />
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-stone-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
};
