
import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface FeedbackInterfaceProps {
  trendId: string;
}

export const FeedbackInterface = ({ trendId }: FeedbackInterfaceProps) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    console.log('Feedback submitted:', { trendId, feedback, note });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
        <div className="text-center py-4">
          <div className="text-emerald-600 text-lg font-medium mb-2">Thank you for your feedback!</div>
          <div className="text-stone-600 text-sm">Your input helps improve our trend intelligence.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
      <h3 className="text-lg font-medium text-stone-800 mb-4">Rate This Trend</h3>
      
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFeedback('up')}
          className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all ${
            feedback === 'up'
              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
              : 'border-stone-200 hover:border-stone-300 text-stone-600'
          }`}
        >
          <ThumbsUp className="w-5 h-5" />
          <span>Relevant for URBN</span>
        </button>
        
        <button
          onClick={() => setFeedback('down')}
          className={`flex items-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all ${
            feedback === 'down'
              ? 'border-red-500 bg-red-50 text-red-700'
              : 'border-stone-200 hover:border-stone-300 text-stone-600'
          }`}
        >
          <ThumbsDown className="w-5 h-5" />
          <span>Not relevant</span>
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-stone-700 mb-2">
          Additional Notes (Optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g., 'Too edgy for Anthropologie' or 'Perfect for UO's summer collection'"
          className="w-full p-3 border border-stone-200 rounded-lg bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent transition-all resize-none"
          rows={3}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!feedback}
        className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Feedback
      </button>
    </div>
  );
};
