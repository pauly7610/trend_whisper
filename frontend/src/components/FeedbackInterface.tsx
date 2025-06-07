import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

interface FeedbackInterfaceProps {
  trendId: string;
}

export const FeedbackInterface = ({ trendId }: FeedbackInterfaceProps) => {
  const [rating, setRating] = useState<boolean | null>(null);
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  
  const { showSuccess } = useNotifications();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', { rating, notes, priority, trendId });
    
    // Show success notification
    showSuccess(
      'Feedback Submitted',
      'Thank you for your input! This helps improve our trend predictions.'
    );
    
    // Reset form
    setNotes('');
    setRating(null);
    setPriority('medium');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
      <h3 className="text-lg font-medium text-stone-800 mb-4">Feedback</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-stone-700 mb-2">Was this trend relevant?</h4>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setRating(true)}
              className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium ${
                rating === true ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-stone-700'
              } transition-colors`}
            >
              <ThumbsUp className="w-4 h-4 mr-2" /> Yes
            </button>
            <button
              type="button"
              onClick={() => setRating(false)}
              className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium ${
                rating === false ? 'bg-red-100 text-red-700' : 'bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-stone-700'
              } transition-colors`}
            >
              <ThumbsDown className="w-4 h-4 mr-2" /> No
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-stone-700 mb-2">Notes</h4>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional feedback?"
            className="w-full p-3 border border-stone-200 rounded-lg bg-stone-50 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-stone-700 mb-2">Priority</h4>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setPriority('low')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                priority === 'low' ? 'bg-blue-100 text-blue-700' : 'bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-stone-700'
              } transition-colors`}
            >
              Low
            </button>
            <button
              type="button"
              onClick={() => setPriority('medium')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-stone-700'
              } transition-colors`}
            >
              Medium
            </button>
            <button
              type="button"
              onClick={() => setPriority('high')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-stone-700'
              } transition-colors`}
            >
              High
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors w-full"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};
