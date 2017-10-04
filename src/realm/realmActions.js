/* @flow */
import type { GetState, Dispatch, Action } from '../types';
import { initializeNotifications } from '../utils/notifications';
import { switchNarrow } from '../message/messagesActions';
import { getAuth } from '../selectors';

import { REALM_INIT, SAVE_TOKEN_PUSH, DELETE_TOKEN_PUSH } from '../actionConstants';

export const realmInit = (data: Object): Action => ({
  type: REALM_INIT,
  data,
});

export const deleteTokenPush = (): Action => ({
  type: DELETE_TOKEN_PUSH,
});

const saveTokenPush = (pushToken: string) => ({
  type: SAVE_TOKEN_PUSH,
  pushToken,
});

export const initNotifications = (): Action => (dispatch: Dispatch, getState: GetState) => {
  initializeNotifications(
    getAuth(getState()),
    token => dispatch(saveTokenPush(token)),
    switchNarrow,
  );
};
