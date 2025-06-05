
import { Header } from '@/components/Header';
import { Package, TrendingUp, Calendar, DollarSign } from 'lucide-react';

const Assortment = () => {
  const metrics = [
    { label: 'Open to Buy', value: '$2.4M', icon: DollarSign },
    { label: 'Active SKUs', value: '1,247', icon: Package },
    { label: 'Trending Items', value: '23', icon: TrendingUp },
    { label: 'Weeks Left', value: '8', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-light text-stone-800 mb-3 tracking-wide">
            Assortment Planning
          </h1>
          <p className="text-lg text-stone-600 font-light">
            Strategic product selection based on trend insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-3xl font-light text-stone-800 mb-1">{metric.value}</div>
                <div className="text-sm text-stone-600">{metric.label}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
          <h2 className="text-2xl font-light text-stone-800 mb-6">Coming Soon</h2>
          <p className="text-stone-600">
            This section will show AI-powered assortment recommendations based on trend forecasts,
            inventory levels, and historical performance data.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Assortment;
