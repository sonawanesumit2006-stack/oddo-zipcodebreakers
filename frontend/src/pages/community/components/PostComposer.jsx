import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { savePosts, loadPosts } from '../utils/storage';

const POST_TYPES = [
  { value: 'tip', label: 'Tip' },
  { value: 'buddy', label: 'Looking for Buddy' },
  { value: 'question', label: 'Question' }
];

const currentUser = { name: 'You' };

const PostComposer = ({ onCreate }) => {
  const [type, setType] = useState('tip');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [buddy, setBuddy] = useState({ destination: '', startDate: '', endDate: '', travelStyle: '', budget: '' });
  const [isPosting, setIsPosting] = useState(false);

  const handleCreate = () => {
    if (!content?.trim()) return;
    setIsPosting(true);
    const now = Date.now();
    const post = {
      id: now,
      author: currentUser.name,
      type,
      content: content.trim(),
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      buddy: type === 'buddy' ? { ...buddy } : null,
      likes: 0,
      liked: false,
      comments: [],
      createdAt: now
    };

    try {
      const existing = loadPosts() || [];
      savePosts([post, ...existing]);
      if (onCreate) onCreate(post);
      setContent('');
      setTags('');
      setBuddy({ destination: '', startDate: '', endDate: '', travelStyle: '', budget: '' });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded px-3 py-1 border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
          {POST_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <input
          className="flex-1 rounded px-3 py-2 border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="Share something with the community..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button size="sm" variant="default" onClick={handleCreate} loading={isPosting} disabled={isPosting}>Post</Button>
      </div>

      {type === 'buddy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
          <input className="rounded px-3 py-2 border border-border focus:ring-2 focus:ring-primary/30" placeholder="Destination" value={buddy.destination} onChange={e => setBuddy({ ...buddy, destination: e.target.value })} />
          <input className="rounded px-3 py-2 border border-border focus:ring-2 focus:ring-primary/30" placeholder="Budget (₹)" value={buddy.budget} onChange={e => setBuddy({ ...buddy, budget: e.target.value })} />
          <input className="rounded px-3 py-2 border border-border focus:ring-2 focus:ring-primary/30" type="date" value={buddy.startDate} onChange={e => setBuddy({ ...buddy, startDate: e.target.value })} />
          <input className="rounded px-3 py-2 border border-border focus:ring-2 focus:ring-primary/30" type="date" value={buddy.endDate} onChange={e => setBuddy({ ...buddy, endDate: e.target.value })} />
          <input className="rounded px-3 py-2 border border-border focus:ring-2 focus:ring-primary/30" placeholder="Travel style (e.g., leisurely, adventure)" value={buddy.travelStyle} onChange={e => setBuddy({ ...buddy, travelStyle: e.target.value })} />
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <input className="rounded px-2 py-1 border border-border focus:ring-2 focus:ring-primary/30" placeholder="tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
        <span>— use tags like <strong>city, country, solo, group, budget</strong></span>
      </div>
    </div>
  );
};

export default PostComposer;
