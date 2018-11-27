/* @flow strict */
import deepFreeze from 'deep-freeze';

import { NULL_OBJECT } from '../../nullObjects';
import draftsReducers from '../draftsReducers';
import { DRAFT_UPDATE } from '../../actionConstants';
import { topicNarrow } from '../../utils/narrow';

describe('draftsReducers', () => {
  const testNarrow = topicNarrow('denmark', 'denmark2');
  const testNarrowStr = JSON.stringify(testNarrow);

  describe(DRAFT_UPDATE, () => {
    test('add a new draft key drafts', () => {
      const initialState = NULL_OBJECT;

      const action = deepFreeze({
        type: DRAFT_UPDATE,
        content: 'Hello',
        narrow: testNarrow,
      });

      const expectedState = {
        [testNarrowStr]: 'Hello',
      };

      const actualState = draftsReducers(initialState, action);

      expect(actualState).toEqual(expectedState);
    });

    test('adding the same draft to drafts does not mutate the state', () => {
      const initialState = deepFreeze({
        [testNarrowStr]: 'Hello',
      });

      const action = deepFreeze({
        type: DRAFT_UPDATE,
        content: 'Hello',
        narrow: testNarrow,
      });

      const actualState = draftsReducers(initialState, action);

      expect(actualState).toBe(initialState);
    });

    test('when content is empty remove draft from state', () => {
      const initialState = deepFreeze({
        [testNarrowStr]: 'Hello',
      });

      const action = {
        type: DRAFT_UPDATE,
        content: '',
        narrow: testNarrow,
      };

      const expectedState = {};

      const actualState = draftsReducers(initialState, action);

      expect(actualState).toEqual(expectedState);
    });

    test('remove draft when content is white space', () => {
      const initialState = deepFreeze({
        [testNarrowStr]: 'Hello',
      });

      const action = {
        type: DRAFT_UPDATE,
        content: '   ',
        narrow: topicNarrow('denmark', 'denmark2'),
      };

      const expectedState = {};

      const actualState = draftsReducers(initialState, action);

      expect(actualState).toEqual(expectedState);
    });

    test('do not mutate state if there is nothing to remove', () => {
      const initialState = NULL_OBJECT;

      const action = deepFreeze({
        type: DRAFT_UPDATE,
        content: '',
        narrow: testNarrow,
      });

      const actualState = draftsReducers(initialState, action);

      expect(actualState).toBe(initialState);
    });
  });
});
