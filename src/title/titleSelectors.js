/* @flow */
import { createSelector } from 'reselect';

import type { Narrow } from '../types';
import { BRAND_COLOR } from '../styles';
import { getSubscriptions } from '../directSelectors';
import { foregroundColorFromBackground } from '../utils/color';
import { isStreamOrTopicNarrow } from '../utils/narrow';
import { NULL_SUBSCRIPTION } from '../nullObjects';

/** (If `narrow` omitted, returns 'transparent'.) */
export const getTitleBackgroundColor = (narrow?: Narrow) =>
  createSelector(
    getSubscriptions,
    subscriptions =>
      isStreamOrTopicNarrow(narrow)
        ? (
            subscriptions.find(sub => Array.isArray(narrow) && narrow[0].operand === sub.name)
            || NULL_SUBSCRIPTION
          ).color
        : 'transparent',
  );

/** (If `narrow` omitted, returns BRAND_COLOR.) */
export const getTitleTextColor = (narrow?: Narrow) =>
  createSelector(
    getTitleBackgroundColor(narrow),
    backgroundColor =>
      backgroundColor && isStreamOrTopicNarrow(narrow)
        ? foregroundColorFromBackground(backgroundColor)
        : BRAND_COLOR,
  );
