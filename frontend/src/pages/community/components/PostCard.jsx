import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { timeAgo } from '../utils/time';
import { loadPosts, savePosts } from '../utils/storage';

const currentUser = { name: 'You' };

const PostCard = ({ post, onUpdate }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(post?.content);
  const [commentText, setCommentText] = useState('');

  const toggleLike = () => {
    const posts = loadPosts() || [];
    const updated = posts.map(p => p.id === post.id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p);
    savePosts(updated);
    if (onUpdate) onUpdate();
  };

  const addComment = () => {
    setExpanded(true);
  };

  const submitComment = () => {
    const text = commentText?.trim();
    if (!text) return;
    const posts = loadPosts() || [];
    const updated = posts.map(p => p.id === post.id ? { ...p, comments: [...p.comments, { id: Date.now(), author: currentUser.name, text, createdAt: Date.now() }] } : p);
    savePosts(updated);
    if (onUpdate) onUpdate();
    setCommentText('');
    setExpanded(true);
  };

  const handleDelete = () => {
    if (!window.confirm('Delete this post?')) return;
    const posts = loadPosts() || [];
    const updated = posts.filter(p => p.id !== post.id);
    savePosts(updated);
    if (onUpdate) onUpdate();
  };

  const handleSaveEdit = () => {
    const posts = loadPosts() || [];
    const updated = posts.map(p => p.id === post.id ? { ...p, content: editText } : p);
    savePosts(updated);
    setEditing(false);
    if (onUpdate) onUpdate();
  };

  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-102 border border-border/50 hover:border-border animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-md">{post.author?.[0]}</div>
          <div>
            <div className="text-sm font-semibold text-foreground">{post.author} <span className="text-xs text-muted-foreground">• {timeAgo(post.createdAt)}</span></div>
            <div className="text-xs text-muted-foreground">{post.type === 'buddy' ? 'Looking for travel buddy' : post.type}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post.author === currentUser.name && (
            <>
              <button onClick={() => setEditing(!editing)} className="text-xs text-muted-foreground hover:text-primary">Edit</button>
              <button onClick={handleDelete} className="text-xs text-destructive hover:underline">Delete</button>
            </>
          )}
        </div>
      </div>

      <div className="mt-3">
        {editing ? (
          <div>
            <textarea className="w-full rounded p-2 border border-border focus:ring-2 focus:ring-primary/30" value={editText} onChange={e => setEditText(e.target.value)} />
            <div className="mt-2 flex items-center gap-2">
              <Button size="sm" variant="default" onClick={handleSaveEdit}>Save</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {post.tags.map((t, i) => <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">#{t}</span>)}
          </div>
        )}

        {post.type === 'buddy' && post.buddy && (
          <div className="mt-3 border border-border rounded p-3 bg-background">
            <div className="text-sm"><strong>Destination:</strong> {post.buddy.destination}</div>
            <div className="text-sm"><strong>Dates:</strong> {post.buddy.startDate} - {post.buddy.endDate}</div>
            <div className="text-sm"><strong>Style:</strong> {post.buddy.travelStyle}</div>
            <div className="text-sm"><strong>Budget:</strong> {post.buddy.budget}</div>
            <div className="mt-2">
              <Button size="sm" variant="default" onClick={() => alert('Interest sent to the post author!')}>Send interest</Button>
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center gap-3">
          <button onClick={toggleLike} className={`flex items-center gap-2 text-sm px-2 py-1 rounded ${post.liked ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/20'} transition`}> 
            <Icon name="Heart" size={16} /> <span>{post.likes}</span>
          </button>
          <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-sm px-2 py-1 rounded text-muted-foreground hover:bg-muted/20 transition">
            <Icon name="MessageSquare" size={16} /> <span>{post.comments?.length}</span>
          </button>
          <button onClick={() => navigate(`/community/post/${post.id}`)} className="text-xs text-primary hover:underline">Open</button>
        </div>

        {expanded && (
          <div className="mt-3 space-y-2">
            <div className="space-y-2">
              {post.comments?.length ? post.comments.map(c => (
                <div key={c.id} className="bg-muted/10 rounded p-2">
                  <div className="text-xs text-muted-foreground">{c.author}</div>
                  <div className="text-sm text-foreground">{c.text}</div>
                </div>
              )) : <div className="text-sm text-muted-foreground">No comments yet</div>}
            </div>

            <div className="mt-2 flex gap-2">
              <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="flex-1 rounded px-3 py-2 border border-border" />
              <Button size="sm" variant="default" onClick={submitComment}>Send</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
