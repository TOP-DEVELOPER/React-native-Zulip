/* @flow */
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import type { Narrow } from '../types';
import connectWithActions from '../connectWithActions';
import { ViewPlaceholder } from '../common';
import { getTitleTextColor } from '../selectors';
import { getInfoButtonFromNarrow, getExtraButtonFromNarrow } from './titleButtonFromNarrow';

type Props = {
  color: string,
  narrow: Narrow,
};

class TitleNavButtons extends PureComponent<Props> {
  props: Props;

  render() {
    const { color, narrow } = this.props;
    const InfoButton = getInfoButtonFromNarrow(narrow);
    const ExtraButton = getExtraButtonFromNarrow(narrow);

    return (
      <View>
        {InfoButton ? <InfoButton color={color} narrow={narrow} /> : <ViewPlaceholder width={44} />}
        {ExtraButton ? (
          <ExtraButton color={color} narrow={narrow} />
        ) : (
          <ViewPlaceholder width={44} />
        )}
      </View>
    );
  }
}

export default connectWithActions((state, props) => ({
  color: getTitleTextColor(props.narrow)(state),
}))(TitleNavButtons);
