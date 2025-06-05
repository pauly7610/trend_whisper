
import { Header } from '@/components/Header';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';

const Analytics = () => {
  const trendData = [
    { name: 'Week 1', accuracy: 78 },
    { name: 'Week 2', accuracy: 82 },
    { name: 'Week 3', accuracy: 85 },
    { name: 'Week 4', accuracy: 88 },
    { name: 'Week 5', accuracy: 92 },
  ];

  const categoryData = [
    { name: 'Dresses', predictions: 45 },
    { name: 'Tops', predictions: 38 },
    { name: 'Bottoms', predictions: 32 },
    { name: 'Outerwear', predictions: 28 },
    { name: 'Accessories', predictions: 24 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-light text-stone-800 mb-3 tracking-wide">
            Analytics Dashboard
          </h1>
          <p className="text-lg text-stone-600 font-light">
            Performance insights and prediction accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <h3 className="text-lg font-medium text-stone-800 mb-4">Prediction Accuracy</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line type="monotone" dataKey="accuracy" stroke="#d97706" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <h3 className="text-lg font-medium text-stone-800 mb-4">Predictions by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="predictions" fill="#d97706" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
          <h2 className="text-2xl font-light text-stone-800 mb-6">Model Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-light text-stone-800 mb-1">92%</div>
              <div className="text-sm text-stone-600">Overall Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-stone-800 mb-1">156</div>
              <div className="text-sm text-stone-600">Trends Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-stone-800 mb-1">4.2M</div>
              <div className="text-sm text-stone-600">Data Points</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
