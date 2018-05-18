import deepFreeze from 'deep-freeze';

import {
  ACCOUNT_SWITCH,
  EVENT_USER_GROUP_ADD,
  EVENT_USER_GROUP_REMOVE,
  EVENT_USER_GROUP_ADD_MEMBERS,
} from '../../actionConstants';
import userGroupsReducers from '../userGroupsReducers';

describe('userGroupsReducers', () => {
  test('handles unknown action and no state by returning initial state', () => {
    const initialState = undefined;

    const action = deepFreeze({});

    const newState = userGroupsReducers(initialState, action);
    expect(newState).toBeDefined();
  });

  describe('ACCOUNT_SWITCH', () => {
    test('resets state to initial state', () => {
      const initialState = deepFreeze([
        {
          id: 1,
          name: 'Some Group',
          description: 'This is some group',
          members: [],
        },
      ]);

      const action = deepFreeze({
        type: ACCOUNT_SWITCH,
      });

      const expectedState = [];

      const actualState = userGroupsReducers(initialState, action);

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('EVENT_USER_GROUP_ADD', () => {
    test('adds a user group to the state', () => {
      const initialState = deepFreeze([]);
      const group = {
        id: 1,
        name: 'Some Group',
        description: 'This is some group',
        members: [123],
      };
      const action = deepFreeze({
        type: EVENT_USER_GROUP_ADD,
        op: 'add',
        group,
      });

      const expectedState = [group];

      const actualState = userGroupsReducers(initialState, action);

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('EVENT_USER_GROUP_REMOVE', () => {
    test('if user group does not exist state does not change', () => {
      const initialState = deepFreeze([]);
      const action = deepFreeze({
        type: EVENT_USER_GROUP_REMOVE,
        op: 'remove',
        group_id: 1,
      });
      const expectedState = [];

      const actualState = userGroupsReducers(initialState, action);

      expect(actualState).toEqual(expectedState);
    });

    test('adds a user group to the state', () => {
      const initialState = deepFreeze([
        {
          id: 1,
          name: 'Some group',
        },
        {
          id: 2,
          name: 'Another group',
        },
      ]);
      const action = deepFreeze({
        type: EVENT_USER_GROUP_REMOVE,
        op: 'remove',
        group_id: 1,
      });

      const expectedState = [
        {
          id: 2,
          name: 'Another group',
        },
      ];

      const actualState = userGroupsReducers(initialState, action);

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('EVENT_USER_GROUP_UPDATE', () => {
    test('if user group does not exist state does not change', () => {
      const initialState = deepFreeze([]);
      const action = deepFreeze({
        type: 'EVENT_USER_GROUP_UPDATE',
        op: 'update',
        group_id: 1,
        data: { name: 'Some name' },
      });
      const expectedState = [];

      const actualState = userGroupsReducers(initialState, action);

      expect(actualState).toEqual(expectedState);
    });

    test('updates an existing user group with supplied new values', () => {
      const initialState = deepFreeze([
        {
          id: 1,
          name: 'Some group',
        },
        {
          id: 2,
          name: 'Another group',
        },
      ]);
      const action = deepFreeze({
        type: 'EVENT_USER_GROUP_UPDATE',
        op: 'update',
        group_id: 2,
        data: { name: 'New name' },
      });
      const expectedState = [
        {
          id: 1,
          name: 'Some group',
        },
        {
          id: 2,
          name: 'New name',
        },
      ];

      const actualState = userGroupsReducers(initialState, action);

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('EVENT_USER_GROUP_ADD_MEMBERS', () => {
    test('if user group does not exist state does not change', () => {
      const initialState = deepFreeze([]);
      const action = deepFreeze({
        type: EVENT_USER_GROUP_ADD_MEMBERS,
        op: 'add_members',
        group_id: 1,
        user_ids: [1, 2, 3],
      });
      const expectedState = [];

      const actualState = userGroupsReducers(initialState, action);

      expect(actualState).toEqual(expectedState);
    });

    test('updates an existing user group with supplied new members', () => {
      const initialState = deepFreeze([
        {
          id: 1,
          name: 'Some group',
          members: [1],
        },
      ]);
      const action = deepFreeze({
        type: EVENT_USER_GROUP_ADD_MEMBERS,
        op: 'add_members',
        group_id: 1,
        user_ids: [2, 3],
      });
      const expectedState = [
        {
          id: 1,
          name: 'Some group',
          members: [1, 2, 3],
        },
      ];

      const actualState = userGroupsReducers(initialState, action);

      expect(actualState).toEqual(expectedState);
    });
  });
});
