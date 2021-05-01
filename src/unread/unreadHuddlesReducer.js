/* @flow strict-local */
import type { Action } from '../types';
import type { UnreadHuddlesState } from './unreadModelTypes';
import {
  REALM_INIT,
  LOGOUT,
  ACCOUNT_SWITCH,
  EVENT_NEW_MESSAGE,
  EVENT_MESSAGE_DELETE,
  EVENT_UPDATE_MESSAGE_FLAGS,
} from '../actionConstants';
import { pmUnreadsKeyFromMessage, recipientsOfPrivateMessage } from '../utils/recipient';
import { addItemsToHuddleArray, removeItemsDeeply } from './unreadHelpers';
import { NULL_ARRAY } from '../nullObjects';

const initialState: UnreadHuddlesState = NULL_ARRAY;

const eventNewMessage = (state, action) => {
  if (action.message.type !== 'private') {
    return state;
  }

  if (recipientsOfPrivateMessage(action.message).length < 3) {
    return state;
  }

  // TODO: In reality, we should error if `flags` is undefined, since it's
  // always supposed to be set. However, our tests currently don't pass flags
  // into these events, making it annoying to fix this. We should fix the
  // tests, then change this to error if `flags` is undefined. See [1] for
  // details.
  //
  // [1]: https://github.com/zulip/zulip-mobile/pull/4710/files#r627850775
  if (action.message.flags?.includes('read')) {
    return state;
  }

  return addItemsToHuddleArray(state, [action.message.id], pmUnreadsKeyFromMessage(action.message));
};

const eventUpdateMessageFlags = (state, action) => {
  if (action.flag !== 'read') {
    return state;
  }

  if (action.all) {
    return initialState;
  }

  if (action.op === 'add') {
    return removeItemsDeeply(state, action.messages);
  } else if (action.op === 'remove') {
    // we do not support that operation
  }

  return state;
};

export default (state: UnreadHuddlesState = initialState, action: Action): UnreadHuddlesState => {
  switch (action.type) {
    case LOGOUT:
    case ACCOUNT_SWITCH:
      return initialState;

    case REALM_INIT:
      return (action.data.unread_msgs && action.data.unread_msgs.huddles) || initialState;

    case EVENT_NEW_MESSAGE:
      return eventNewMessage(state, action);

    case EVENT_MESSAGE_DELETE:
      return removeItemsDeeply(state, action.messageIds);

    case EVENT_UPDATE_MESSAGE_FLAGS:
      return eventUpdateMessageFlags(state, action);

    default:
      return state;
  }
};
