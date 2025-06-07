
import { Search, TrendingUp } from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'trends' | 'error';
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState = ({ type, title, description, actionText, onAction }: EmptyStateProps) => {
  let Icon;
  if (type === 'search') Icon = Search;
  else if (type === 'error') Icon = () => (<span className="text-red-500 text-3xl">&#9888;</span>); // Unicode warning icon
  else Icon = TrendingUp;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-stone-400" />
      </div>
      <h3 className="text-xl font-light text-stone-800 mb-2">{title}</h3>
      <p className="text-stone-600 max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
