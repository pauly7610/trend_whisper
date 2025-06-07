
import { useState } from 'react';
import { MessageCircle, Share2, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  avatar: string;
}

interface CollaborationPanelProps {
  trendId: string;
}

export const CollaborationPanel = ({ trendId }: CollaborationPanelProps) => {
  const { showSuccess } = useNotifications();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'Sarah Chen',
      text: 'This trend looks promising for our Q3 collection. Should we fast-track some designs?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c133?w=32&h=32&fit=crop&crop=face'
    },
    {
      id: '2',
      user: 'Mike Rodriguez',
      text: 'Agreed! I\'m seeing similar signals in our social media analytics. Let\'s schedule a planning session.',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [teamMembers] = useState([
    { name: 'Sarah Chen', role: 'Buyer', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c133?w=32&h=32&fit=crop&crop=face' },
    { name: 'Mike Rodriguez', role: 'Designer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
    { name: 'Emma Wilson', role: 'Merchandiser', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' }
  ]);

  const addComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: 'You',
        text: newComment,
        timestamp: new Date(),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      };
      setComments([...comments, comment]);
      setNewComment('');
      showSuccess('Comment added');
    }
  };

  const shareTrend = () => {
    navigator.clipboard.writeText(window.location.href);
    showSuccess('Trend link copied to clipboard');
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  return (
    <div className="space-y-6">
      {/* Team Members */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-stone-800 flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Team</span>
          </h3>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex items-center space-x-3">
              <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
              <div>
                <div className="text-sm font-medium text-stone-800">{member.name}</div>
                <div className="text-xs text-stone-600">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
        <h3 className="text-lg font-medium text-stone-800 flex items-center space-x-2 mb-4">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </h3>
        <Button onClick={shareTrend} className="w-full">
          Copy Link
        </Button>
      </div>

      {/* Comments */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
        <h3 className="text-lg font-medium text-stone-800 flex items-center space-x-2 mb-4">
          <MessageCircle className="w-5 h-5" />
          <span>Discussion ({comments.length})</span>
        </h3>
        
        <div className="space-y-4 mb-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-stone-800">{comment.user}</span>
                  <span className="text-xs text-stone-500">{formatTime(comment.timestamp)}</span>
                </div>
                <p className="text-sm text-stone-700">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addComment()}
            className="flex-1 p-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200"
          />
          <Button onClick={addComment} size="sm">
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};
