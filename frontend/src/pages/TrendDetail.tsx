
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowUp, ChevronDown, Download } from 'lucide-react';
import { Header } from '@/components/Header';
import { FeedbackInterface } from '@/components/FeedbackInterface';
import { AssortmentPanel } from '@/components/AssortmentPanel';
import { CollaborationPanel } from '@/components/CollaborationPanel';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';
import { apiFetch, getToken } from '../lib/api';

const TrendDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess } = useNotifications();
  const [showAssortment, setShowAssortment] = useState(false);
  const [analyzeResult, setAnalyzeResult] = useState<any>(null);
  const [analyzeError, setAnalyzeError] = useState<string|null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [trend, setTrend] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  // Fetch trend details and related products
  useEffect(() => {
    const fetchTrend = async () => {
      setLoading(true);
      setError(null);
      try {
        const trendData = await apiFetch<any>(`/trends/${id}`, { token: getToken() });
        setTrend(trendData.trend || trendData);
        // Try to fetch related products if endpoint exists
        try {
          const rel = await apiFetch<any>(`/trends/${id}/related-products`, { token: getToken() });
          setRelatedProducts(rel.products || rel);
        } catch {
          setRelatedProducts([]); // fallback if endpoint not available
        }
      } catch (e: any) {
        setError(e.toString());
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTrend();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-amber-50">
        <div className="text-stone-600 text-lg">Loading trend details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-amber-50">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!trend) {
    return <div>Trend not found</div>;
  }

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setAnalyzeError(null);
    setAnalyzeResult(null);
    try {
      const res = await apiFetch('/analyze', {
        body: {
          transcription: trend.transcription || '',
          confidence: trend.confidence || 1,
          user_context: { user_id: 'me', session_id: 'demo' }
        },
        token: getToken()
      });
      setAnalyzeResult(res);
    } catch (e:any) {
      setAnalyzeError(e.toString());
    } finally {
      setAnalyzing(false);
    }
  };


  const exportTrendReport = () => {
    const data = {
      trend_id: trend.id,
      export_date: new Date().toISOString(),
      trend_details: trend,
      related_products: relatedProducts,
      forecast_timeline: {
        current_phase: "Early adoption",
        peak_estimate: "3-4 weeks",
        decline_estimate: "8-10 weeks"
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trend-report-${trend.id}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    showSuccess('Trend report exported successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header />
      <main className="container mx-auto px-6 py-8">
        {/* --- Trend Analysis Button --- */}
        <div className="max-w-lg mx-auto mb-6">
          <button
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
            onClick={handleAnalyze}
            disabled={analyzing}
          >
            {analyzing ? 'Analyzing...' : 'Analyze Trend'}
          </button>
          {analyzeError && <div className="text-red-500 mt-2">{analyzeError}</div>}
          {analyzeResult && (
            <div className="bg-stone-50 rounded p-4 mt-4">
              <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(analyzeResult, null, 2)}</pre>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-stone-600 hover:text-stone-800 transition-colors"
          >
            ← Back to Trends
          </button>
          <Button onClick={exportTrendReport} className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 mb-8">
              <div className="relative h-96">
                <img
                  src={trend.image}
                  alt={trend.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-4xl font-light mb-2">{trend.title}</h1>
                  <div className="flex items-center space-x-4">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {trend.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <ArrowUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">{trend.change}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-light text-stone-800 mb-1">{trend.sourceCount}</div>
                    <div className="text-sm text-stone-600">Social Detections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-stone-800 mb-1">{trend.popularity}%</div>
                    <div className="text-sm text-stone-600">Popularity Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-light text-stone-800 mb-1">3-4</div>
                    <div className="text-sm text-stone-600">Weeks to Peak</div>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-6">
                  <h3 className="text-lg font-medium text-stone-800 mb-4">Source Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">TikTok</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div className="w-16 h-full bg-gradient-to-r from-pink-400 to-purple-500"></div>
                        </div>
                        <span className="text-sm text-stone-800 font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">Instagram</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div className="w-24 h-full bg-gradient-to-r from-orange-400 to-pink-500"></div>
                        </div>
                        <span className="text-sm text-stone-800 font-medium">35%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">Fashion Blogs</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-stone-200 rounded-full overflow-hidden">
                          <div className="w-8 h-full bg-gradient-to-r from-amber-400 to-orange-500"></div>
                        </div>
                        <span className="text-sm text-stone-800 font-medium">20%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <FeedbackInterface trendId={trend.id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <button
                onClick={() => setShowAssortment(!showAssortment)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="text-lg font-medium text-stone-800">Assortment Suggestions</h3>
                <ChevronDown className={`w-5 h-5 text-stone-600 transition-transform ${
                  showAssortment ? 'rotate-180' : ''
                }`} />
              </button>
              
              {showAssortment && (
                <div className="mt-4">
                  <AssortmentPanel products={relatedProducts} />
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
              <h3 className="text-lg font-medium text-stone-800 mb-4">Forecast Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                  <div>
                    <div className="text-sm font-medium text-stone-800">Current Phase</div>
                    <div className="text-xs text-stone-600">Early adoption, growing fast</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <div>
                    <div className="text-sm font-medium text-stone-800">Peak (3-4 weeks)</div>
                    <div className="text-xs text-stone-600">Maximum market saturation</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-stone-300 rounded-full"></div>
                  <div>
                    <div className="text-sm font-medium text-stone-800">Decline (8-10 weeks)</div>
                    <div className="text-xs text-stone-600">Market moves to next trend</div>
                  </div>
                </div>
              </div>
            </div>

            <CollaborationPanel trendId={trend.id} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TrendDetail;
