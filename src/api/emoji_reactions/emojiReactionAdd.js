/* @flow */
import type { PresenceState, Auth } from '../../types';
import { apiPost } from '../apiFetch';

export default (
  auth: Auth,
  messageId: number,
  reactionType: string,
  emojiCode: string,
  emojiName: string,
): PresenceState =>
  apiPost(auth, `messages/${messageId}/reactions`, res => res, {
    reaction_type: reactionType,
    emoji_code: emojiCode,
    emoji_name: emojiName,
  });
