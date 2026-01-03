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
    <div className="space-y-4">
      <PostComposer onCreate={onCreate} />

      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-full text-xs font-medium ${filter==='all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>All</button>
            <button onClick={() => setFilter('tip')} className={`px-3 py-1 rounded-full text-xs font-medium ${filter==='tip' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Tips</button>
            <button onClick={() => setFilter('buddy')} className={`px-3 py-1 rounded-full text-xs font-medium ${filter==='buddy' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Buddy Requests</button>
            <button onClick={() => setFilter('question')} className={`px-3 py-1 rounded-full text-xs font-medium ${filter==='question' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>Questions</button>
          </div>
        </div>

        <div className="space-y-4">
          {(posts || []).filter(p => filter==='all' ? true : p.type === filter).map(p => (
            <div key={p.id} className="pb-4 border-b border-border"><PostCard post={p} onUpdate={refresh} /></div>
          ))}
          {(posts || []).length === 0 && <div className="text-sm text-muted-foreground">No posts yet — be the first to say hello!</div>}
        </div>
      </div>
    </div>
  );
};

export default Feed;
