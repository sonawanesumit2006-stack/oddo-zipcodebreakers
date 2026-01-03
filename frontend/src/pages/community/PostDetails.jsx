import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SidebarNavigation from '../../components/ui/SidebarNavigation';
import Button from '../../components/ui/Button';
import { loadPosts, savePosts } from './utils/storage';
import { timeAgo } from './utils/time';

const currentUser = { name: 'You' };

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const posts = loadPosts() || [];
    const found = posts.find(p => String(p.id) === String(id));
    setPost(found || null);
  }, [id]);

  const submitComment = () => {
    const text = commentText?.trim();
    if (!text) return;
    const posts = loadPosts() || [];
    const updated = posts.map(p => p.id === post.id ? { ...p, comments: [...p.comments, { id: Date.now(), author: currentUser.name, text, createdAt: Date.now() }] } : p);
    savePosts(updated);
    setPost(updated.find(p => p.id === post.id));
    setCommentText('');
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <SidebarNavigation />
        <main className="transition-smooth lg:ml-60 p-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center py-12">
              <h2 className="text-lg font-semibold">Post not found</h2>
              <p className="text-sm text-muted-foreground">This post may have been removed.</p>
              <div className="mt-4">
                <Button variant="outline" onClick={() => navigate('/community')}>Back to Community</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarNavigation />
      <main className="transition-smooth lg:ml-60 p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm font-semibold">{post.author} • <span className="text-xs text-muted-foreground">{timeAgo(post.createdAt)}</span></div>
                <div className="text-xs text-muted-foreground">{post.type === 'buddy' ? 'Looking for travel buddy' : post.type}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => navigate('/community')}>Back</Button>
              </div>
            </div>

            <p className="text-foreground mb-4">{post.content}</p>

            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-4">
                {post.tags.map((t,i) => <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">#{t}</span>)}
              </div>
            )}

            {post.type === 'buddy' && post.buddy && (
              <div className="border border-border rounded p-3 mb-4 bg-background">
                <div className="text-sm"><strong>Destination:</strong> {post.buddy.destination}</div>
                <div className="text-sm"><strong>Dates:</strong> {post.buddy.startDate} - {post.buddy.endDate}</div>
                <div className="text-sm"><strong>Style:</strong> {post.buddy.travelStyle}</div>
                <div className="text-sm"><strong>Budget:</strong> {post.buddy.budget}</div>
                <div className="mt-3">
                  <Button variant="default" onClick={() => alert('Interest sent to author!')}>Send interest</Button>
                </div>
              </div>
            )}

            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Comments</h4>
              <div className="space-y-3">
                {post.comments?.length ? post.comments.map(c => (
                  <div key={c.id} className="bg-muted/10 rounded p-3">
                    <div className="text-xs text-muted-foreground">{c.author}</div>
                    <div className="text-sm text-foreground">{c.text}</div>
                  </div>
                )) : <div className="text-sm text-muted-foreground">No comments yet</div>}

                <div className="mt-2 flex gap-2">
                  <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." className="flex-1 rounded px-3 py-2 border border-border" />
                  <Button size="sm" variant="default" onClick={submitComment}>Send</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetails;
