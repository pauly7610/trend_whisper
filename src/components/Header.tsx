
import { Search } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-light text-stone-800 tracking-wide">
              URBN Intelligence
            </h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-stone-600 hover:text-stone-800 transition-colors font-light">
                Trends
              </a>
              <a href="#" className="text-stone-600 hover:text-stone-800 transition-colors font-light">
                Assortment
              </a>
              <a href="#" className="text-stone-600 hover:text-stone-800 transition-colors font-light">
                Analytics
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search trends..."
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
