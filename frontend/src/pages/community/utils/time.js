import { formatDistanceToNow } from 'date-fns';

export function timeAgo(timestamp) {
  try {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  } catch (e) {
    return timestamp;
  }
}
