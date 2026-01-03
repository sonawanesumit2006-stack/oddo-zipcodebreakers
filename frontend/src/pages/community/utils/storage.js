// Simple localStorage-based persistence for community posts & events
const POSTS_KEY = 'globetrotter_community_posts_v1';
const EVENTS_KEY = 'globetrotter_community_events_v1';

export function loadPosts() {
  try {
    const raw = localStorage.getItem(POSTS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to load posts', e);
    return null;
  }
}

export function savePosts(posts) {
  try {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error('Failed to save posts', e);
  }
}

export function loadEvents() {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to load events', e);
    return null;
  }
}

export function saveEvents(events) {
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (e) {
    console.error('Failed to save events', e);
  }
}
