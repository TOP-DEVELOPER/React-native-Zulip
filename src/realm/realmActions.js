/* @flow strict-local */
import type {
  Auth,
  GetState,
  Dispatch,
  RealmFilter,
  InitialData,
  RealmEmojiState,
  RealmInitAction,
  DeleteTokenPushAction,
  SaveTokenPushAction,
  InitRealmEmojiAction,
  InitRealmFilterAction,
} from '../types';
import { logErrorRemotely } from '../utils/logging';
import { getNotificationToken } from '../utils/notifications';
import { getAuth, getPushToken } from '../selectors';
import { getRealmEmojis, getRealmFilters, unregisterPush } from '../api';
import {
  REALM_INIT,
  SAVE_TOKEN_PUSH,
  DELETE_TOKEN_PUSH,
  INIT_REALM_EMOJI,
  INIT_REALM_FILTER,
} from '../actionConstants';

export const realmInit = (data: InitialData): RealmInitAction => ({
  type: REALM_INIT,
  data,
});

export const deleteTokenPush = (): DeleteTokenPushAction => ({
  type: DELETE_TOKEN_PUSH,
});

export const saveTokenPush = (pushToken: string): SaveTokenPushAction => ({
  type: SAVE_TOKEN_PUSH,
  pushToken,
});

export const initNotifications = () => (dispatch: Dispatch, getState: GetState) => {
  const auth = getAuth(getState());
  const pushToken = getPushToken(getState());
  getNotificationToken(auth, pushToken, token => {
    dispatch(saveTokenPush(token));
  });
};

export const tryStopNotifications = () => async (dispatch: Dispatch, getState: GetState) => {
  const auth = getAuth(getState());
  const pushToken = getPushToken(getState());
  if (pushToken !== '') {
    try {
      await unregisterPush(auth, pushToken);
    } catch (e) {
      logErrorRemotely(e, 'failed to unregister Push token');
    }
    dispatch(deleteTokenPush());
  }
};

export const initRealmEmojis = (emojis: RealmEmojiState): InitRealmEmojiAction => ({
  type: INIT_REALM_EMOJI,
  emojis,
});

export const fetchRealmEmojis = (auth: Auth) => async (dispatch: Dispatch) =>
  dispatch(initRealmEmojis(await getRealmEmojis(auth)));

export const initRealmFilters = (filters: RealmFilter[]): InitRealmFilterAction => ({
  type: INIT_REALM_FILTER,
  filters,
});

export const fetchRealmFilters = (auth: Auth) => async (dispatch: Dispatch) =>
  dispatch(initRealmFilters(await getRealmFilters(auth)));
