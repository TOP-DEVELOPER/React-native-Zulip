/* @flow strict-local */
import React, { PureComponent } from 'react';
import type { TextStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

import { BRAND_COLOR, createStyleSheet } from '../styles';
import { Icon } from '../common/Icons';
import type { IconNames } from '../common/Icons';
import NavButtonGeneral from './NavButtonGeneral';

type Props = $ReadOnly<{|
  color: string,
  style?: TextStyleProp,
  name: IconNames,
  onPress: () => void,
  accessibilityLabel?: string,
|}>;

const componentStyles = createStyleSheet({
  navButtonIcon: {
    textAlign: 'center',
  },
});

export default class NavButton extends PureComponent<Props> {
  static defaultProps = {
    color: BRAND_COLOR,
  };

  render() {
    const { name, style, color, onPress, accessibilityLabel } = this.props;

    return (
      <NavButtonGeneral onPress={onPress} accessibilityLabel={accessibilityLabel}>
        <Icon size={24} style={[componentStyles.navButtonIcon, style]} color={color} name={name} />
      </NavButtonGeneral>
    );
  }
}
