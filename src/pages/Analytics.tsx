
import { Header } from '@/components/Header';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';
import { Download, TrendingUp, Users, Target } from 'lucide-react';

const Analytics = () => {
  const { showSuccess } = useNotifications();

  const trendData = [
    { name: 'Week 1', accuracy: 78, predictions: 23, engagement: 145 },
    { name: 'Week 2', accuracy: 82, predictions: 31, engagement: 167 },
    { name: 'Week 3', accuracy: 85, predictions: 28, engagement: 189 },
    { name: 'Week 4', accuracy: 88, predictions: 35, engagement: 201 },
    { name: 'Week 5', accuracy: 92, predictions: 42, engagement: 234 },
  ];

  const categoryData = [
    { name: 'Dresses', predictions: 45, accuracy: 94 },
    { name: 'Tops', predictions: 38, accuracy: 91 },
    { name: 'Bottoms', predictions: 32, accuracy: 89 },
    { name: 'Outerwear', predictions: 28, accuracy: 93 },
    { name: 'Accessories', predictions: 24, accuracy: 87 },
  ];

  const regionData = [
    { name: 'US', value: 42, color: '#d97706' },
    { name: 'EU', value: 28, color: '#059669' },
    { name: 'Asia', value: 20, color: '#dc2626' },
    { name: 'Other', value: 10, color: '#7c3aed' },
  ];

  const exportAnalytics = () => {
    const data = {
      export_date: new Date().toISOString(),
      trend_accuracy: trendData,
      category_performance: categoryData,
      regional_distribution: regionData,
      summary: {
        overall_accuracy: 92,
        total_predictions: 156,
        data_points: 4200000
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    showSuccess('Analytics report exported successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-light text-stone-800 mb-3 tracking-wide">
              Advanced Analytics
            </h1>
            <p className="text-lg text-stone-600 font-light">
              Deep insights into prediction performance and trends
            </p>
          </div>
          <Button onClick={exportAnalytics} className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-light text-stone-800">92%</div>
                <div className="text-sm text-stone-600">Prediction Accuracy</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-light text-stone-800">156</div>
                <div className="text-sm text-stone-600">Active Predictions</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-light text-stone-800">4.2M</div>
                <div className="text-sm text-stone-600">Data Points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <h3 className="text-lg font-medium text-stone-800 mb-4">Prediction Accuracy Over Time</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Area type="monotone" dataKey="accuracy" stroke="#d97706" fill="#d97706" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <h3 className="text-lg font-medium text-stone-800 mb-4">User Engagement Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="engagement" stroke="#059669" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <h3 className="text-lg font-medium text-stone-800 mb-4">Category Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="predictions" fill="#d97706" />
                  <Bar dataKey="accuracy" fill="#059669" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <h3 className="text-lg font-medium text-stone-800 mb-4">Regional Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Analytics Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
          <h3 className="text-lg font-medium text-stone-800 mb-4">Detailed Performance Metrics</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="text-left py-3 px-4 font-medium text-stone-700">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-stone-700">Predictions</th>
                  <th className="text-left py-3 px-4 font-medium text-stone-700">Accuracy</th>
                  <th className="text-left py-3 px-4 font-medium text-stone-700">Trend</th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((category, index) => (
                  <tr key={category.name} className="border-b border-stone-100">
                    <td className="py-3 px-4 text-stone-800">{category.name}</td>
                    <td className="py-3 px-4 text-stone-600">{category.predictions}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        category.accuracy >= 90 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {category.accuracy}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
