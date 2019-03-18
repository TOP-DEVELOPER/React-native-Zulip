/* @flow strict */
export const REHYDRATE: 'persist/REHYDRATE' = 'persist/REHYDRATE';

export const APP_ONLINE: 'APP_ONLINE' = 'APP_ONLINE';
export const APP_ORIENTATION: 'APP_ORIENTATION' = 'APP_ORIENTATION';
export const APP_STATE: 'APP_STATE' = 'APP_STATE';
export const DEAD_QUEUE: 'DEAD_QUEUE' = 'DEAD_QUEUE';

export const REALM_ADD: 'REALM_ADD' = 'REALM_ADD';
export const ACCOUNT_ADD_SUCCEEDED: 'ACCOUNT_ADD_SUCCEEDED' = 'ACCOUNT_ADD_SUCCEEDED';
export const ACCOUNT_REMOVE: 'ACCOUNT_REMOVE' = 'ACCOUNT_REMOVE';
export const ACCOUNT_SWITCH: 'ACCOUNT_SWITCH' = 'ACCOUNT_SWITCH';

export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const HTTP_UNAUTHORIZED: 'HTTP_UNAUTHORIZED' = 'HTTP_UNAUTHORIZED';
export const LOGOUT: 'LOGOUT' = 'LOGOUT';

export const REALM_INIT: 'REALM_INIT' = 'REALM_INIT';
export const DO_NARROW: 'DO_NARROW' = 'DO_NARROW';

export const INIT_SAFE_AREA_INSETS: 'INIT_SAFE_AREA_INSETS' = 'INIT_SAFE_AREA_INSETS';
export const INITIAL_FETCH_START: 'INITIAL_FETCH_START' = 'INITIAL_FETCH_START';
export const INITIAL_FETCH_COMPLETE: 'INITIAL_FETCH_COMPLETE' = 'INITIAL_FETCH_COMPLETE';
export const INIT_STREAMS: 'INIT_STREAMS' = 'INIT_STREAMS';
export const INIT_REALM_FILTER: 'INIT_REALM_FILTER' = 'INIT_REALM_FILTER';
export const INIT_TOPICS: 'INIT_TOPICS' = 'INIT_TOPICS';

export const EVENT: 'EVENT' = 'EVENT';
export const EVENT_NEW_MESSAGE: 'EVENT_NEW_MESSAGE' = 'EVENT_NEW_MESSAGE';
export const EVENT_MESSAGE_DELETE: 'EVENT_MESSAGE_DELETE' = 'EVENT_MESSAGE_DELETE';
export const EVENT_STREAM: 'EVENT_STREAM' = 'EVENT_STREAM';
export const EVENT_SUBSCRIPTION: 'EVENT_SUBSCRIPTION' = 'EVENT_SUBSCRIPTION';
export const EVENT_UPDATE_MESSAGE: 'EVENT_UPDATE_MESSAGE' = 'EVENT_UPDATE_MESSAGE';
export const EVENT_REACTION_ADD: 'EVENT_REACTION_ADD' = 'EVENT_REACTION_ADD';
export const EVENT_REACTION_REMOVE: 'EVENT_REACTION_REMOVE' = 'EVENT_REACTION_REMOVE';
export const EVENT_PRESENCE: 'EVENT_PRESENCE' = 'EVENT_PRESENCE';
export const EVENT_USER_STATUS_UPDATE: 'EVENT_USER_STATUS_UPDATE' = 'EVENT_USER_STATUS_UPDATE';
export const EVENT_TYPING_START: 'EVENT_TYPING_START' = 'EVENT_TYPING_START';
export const EVENT_TYPING_STOP: 'EVENT_TYPING_STOP' = 'EVENT_TYPING_STOP';
export const EVENT_UPDATE_MESSAGE_FLAGS: 'EVENT_UPDATE_MESSAGE_FLAGS' =
  'EVENT_UPDATE_MESSAGE_FLAGS';
export const EVENT_USER_ADD: 'EVENT_USER_ADD' = 'EVENT_USER_ADD';
export const EVENT_USER_REMOVE: 'EVENT_USER_REMOVE' = 'EVENT_USER_REMOVE';
export const EVENT_USER_UPDATE: 'EVENT_USER_UPDATE' = 'EVENT_USER_UPDATE';
export const EVENT_MUTED_TOPICS: 'EVENT_MUTED_TOPICS' = 'EVENT_MUTED_TOPICS';

export const EVENT_USER_GROUP_ADD: 'EVENT_USER_GROUP_ADD' = 'EVENT_USER_GROUP_ADD';
export const EVENT_USER_GROUP_REMOVE: 'EVENT_USER_GROUP_REMOVE' = 'EVENT_USER_GROUP_REMOVE';
export const EVENT_USER_GROUP_UPDATE: 'EVENT_USER_GROUP_UPDATE' = 'EVENT_USER_GROUP_UPDATE';
export const EVENT_USER_GROUP_ADD_MEMBERS: 'EVENT_USER_GROUP_ADD_MEMBERS' =
  'EVENT_USER_GROUP_ADD_MEMBERS';
export const EVENT_USER_GROUP_REMOVE_MEMBERS: 'EVENT_USER_GROUP_REMOVE_MEMBERS' =
  'EVENT_USER_GROUP_REMOVE_MEMBERS';

export const MESSAGE_FETCH_START: 'MESSAGE_FETCH_START' = 'MESSAGE_FETCH_START';
export const MESSAGE_FETCH_COMPLETE: 'MESSAGE_FETCH_COMPLETE' = 'MESSAGE_FETCH_COMPLETE';

export const PRESENCE_RESPONSE: 'PRESENCE_RESPONSE' = 'PRESENCE_RESPONSE';
export const GET_USER_RESPONSE: 'GET_USER_RESPONSE' = 'GET_USER_RESPONSE';
export const SETTINGS_CHANGE: 'SETTINGS_CHANGE' = 'SETTINGS_CHANGE';
export const DEBUG_FLAG_TOGGLE: 'DEBUG_FLAG_TOGGLE' = 'DEBUG_FLAG_TOGGLE';

export const GOT_PUSH_TOKEN: 'GOT_PUSH_TOKEN' = 'GOT_PUSH_TOKEN';
export const ACK_PUSH_TOKEN: 'ACK_PUSH_TOKEN' = 'ACK_PUSH_TOKEN';
export const UNACK_PUSH_TOKEN: 'UNACK_PUSH_TOKEN' = 'UNACK_PUSH_TOKEN';

export const EVENT_REALM_EMOJI_UPDATE: 'EVENT_REALM_EMOJI_UPDATE' = 'EVENT_REALM_EMOJI_UPDATE';
export const EVENT_REALM_FILTERS: 'EVENT_REALM_FILTERS' = 'EVENT_REALM_FILTERS';

export const EVENT_UPDATE_DISPLAY_SETTINGS: 'EVENT_UPDATE_DISPLAY_SETTINGS' =
  'EVENT_UPDATE_DISPLAY_SETTINGS';
export const EVENT_UPDATE_GLOBAL_NOTIFICATIONS_SETTINGS: 'EVENT_UPDATE_GLOBAL_NOTIFICATIONS_SETTINGS' =
  'EVENT_UPDATE_GLOBAL_NOTIFICATIONS_SETTINGS';

export const START_EDIT_MESSAGE: 'START_EDIT_MESSAGE' = 'START_EDIT_MESSAGE';
export const CANCEL_EDIT_MESSAGE: 'CANCEL_EDIT_MESSAGE' = 'CANCEL_EDIT_MESSAGE';

export const INIT_ALERT_WORDS: 'INIT_ALERT_WORDS' = 'INIT_ALERT_WORDS';

export const MESSAGE_SEND_START: 'MESSAGE_SEND_START' = 'MESSAGE_SEND_START';
export const MESSAGE_SEND_COMPLETE: 'MESSAGE_SEND_COMPLETE' = 'MESSAGE_SEND_COMPLETE';

export const TOGGLE_OUTBOX_SENDING: 'TOGGLE_OUTBOX_SENDING' = 'TOGGLE_OUTBOX_SENDING';
export const DELETE_OUTBOX_MESSAGE: 'DELETE_OUTBOX_MESSAGE' = 'DELETE_OUTBOX_MESSAGE';

export const DRAFT_UPDATE: 'DRAFT_UPDATE' = 'DRAFT_UPDATE';

export const CLEAR_TYPING: 'CLEAR_TYPING' = 'CLEAR_TYPING';
