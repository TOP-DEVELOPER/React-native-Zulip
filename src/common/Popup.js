/* @flow */
import React, { PureComponent } from 'react';
import type { ChildrenArray } from 'react';
import { View, StyleSheet } from 'react-native';

import type { Context } from '../types';

const styles = StyleSheet.create({
  popup: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 5,
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 3,
    maxHeight: 250,
  },
});

type Props = {
  children: ChildrenArray<*>,
};

export default class Popup extends PureComponent<Props> {
  context: Context;
  props: Props;

  static contextTypes = {
    styles: () => null,
  };

  render() {
    return (
      <View style={[this.context.styles.backgroundColor, styles.popup]}>{this.props.children}</View>
    );
  }
}
