import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import PostComposer from './PostComposer';
import { loadPosts, savePosts } from '../utils/storage';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const local = loadPosts();
    if (local && local.length) setPosts(local);
    else {
      // initialize with empty array to persist
      savePosts([]);
      setPosts([]);
    }
  }, []);

  const refresh = () => {
    const local = loadPosts() || [];
    // sort by newest
    setPosts(local.sort((a,b) => b.createdAt - a.createdAt));
  };

  const onCreate = (post) => {
    refresh();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PostComposer onCreate={onCreate} />

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Latest Posts</h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${filter==='all' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>All</button>
            <button onClick={() => setFilter('tip')} className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${filter==='tip' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>Tips</button>
            <button onClick={() => setFilter('buddy')} className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${filter==='buddy' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>Buddy</button>
            <button onClick={() => setFilter('question')} className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${filter==='question' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>Questions</button>
          </div>
        </div>

        <div className="space-y-4">
          {(posts || []).filter(p => filter==='all' ? true : p.type === filter).map((p, idx) => (
            <div key={p.id} className={`pb-4 border-b border-border last:border-0 animate-fade-in`} style={{ animationDelay: `${idx * 50}ms` }}><PostCard post={p} onUpdate={refresh} /></div>
          ))}
          {(posts || []).length === 0 && <div className="text-sm text-muted-foreground text-center py-8">No posts yet — be the first to say hello! 👋</div>}
        </div>
      </div>
    </div>
  );
};

export default Feed;
