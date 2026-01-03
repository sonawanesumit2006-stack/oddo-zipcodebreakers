import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const initialPosts = [
  {
    id: 1,
    author: 'Sonia',
    content: 'Looking for a travel buddy for Jaipur trip in January — anyone joining?',
    likes: 6,
    liked: false,
    comments: [{ id: 1, author: 'Alex', text: "Count me in!" }],
    date: '2h'
  },
  {
    id: 2,
    author: 'Rahul',
    content: 'Best budget hotels in Udaipur? Share your recommendations.',
    likes: 3,
    liked: false,
    comments: [],
    date: '1d'
  }
];

const events = [
  { id: 1, title: 'Local Meetup — Jaipur', date: 'Jan 20, 2026' },
  { id: 2, title: 'Packing Tips Webinar', date: 'Jan 25, 2026' }
];

const CommunityCard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleLike = (id) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const handleComment = (id) => {
    const text = prompt('Write a comment:');
    if (!text) return;
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, comments: [...p.comments, { id: Date.now(), author: 'You', text }] } : p));
  };

  const handleCreatePost = () => {
    if (!newPost?.trim()) return;
    setIsPosting(true);
    const post = { id: Date.now(), author: 'You', content: newPost.trim(), likes: 0, liked: false, comments: [], date: 'now' };
    setTimeout(() => {
      setPosts((p) => [post, ...p]);
      setNewPost('');
      setIsPosting(false);
    }, 350);
  };

  const handleCopyInvite = () => {
    navigator.clipboard?.writeText('https://globetrotter.app/community/invite');
    alert('Community invite link copied to clipboard!');
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-4 md:p-6 shadow-lg border border-transparent min-h-[260px] flex flex-col justify-between w-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-inner">
            <Icon name="Users" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-foreground tracking-tight">Community</h3>
            <p className="text-sm text-muted-foreground mt-0.5">Connect with fellow travelers — share tips, find buddies, and join events.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="default" onClick={() => navigate('/community')} className="bg-primary text-white">Join</Button>
          <Button size="sm" variant="outline" onClick={handleCopyInvite}>Invite</Button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <textarea
              rows={2}
              className="w-full bg-background border border-border rounded-lg p-3 text-sm resize-none"
              placeholder="Share a tip or look for a travel buddy..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-muted-foreground">Be respectful and helpful</div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setNewPost('')}>Clear</Button>
                <Button size="sm" variant="default" onClick={handleCreatePost} loading={isPosting} disabled={isPosting}>Post</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4 max-h-[180px] overflow-auto pr-2">
        {posts?.slice(0, 3).map((p) => (
          <div key={p.id} className="bg-background/40 rounded-lg p-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">{p.author?.[0]}</div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{p.author}</div>
                    <div className="text-xs text-muted-foreground">{p.date}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleLike(p.id)} className={`text-sm px-2 py-1 rounded ${p.liked ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/20'}`}>
                  <Icon name="Heart" size={16} /> {p.likes}
                </button>
                <button onClick={() => handleComment(p.id)} className="text-sm px-2 py-1 rounded text-muted-foreground hover:bg-muted/20">
                  <Icon name="MessageSquare" size={16} /> {p.comments?.length}
                </button>
              </div>
            </div>
            <p className="text-sm text-foreground mt-3">{p.content}</p>
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-border">
        <h4 className="text-sm font-semibold mb-2">Upcoming Community Events</h4>
        <ul className="space-y-2">
          {events.map((ev) => (
            <li key={ev.id} className="flex items-center justify-between text-sm">
              <span className="text-foreground">{ev.title}</span>
              <span className="text-muted-foreground">{ev.date}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Button size="sm" variant="outline" onClick={() => navigate('/community')}>See all</Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
