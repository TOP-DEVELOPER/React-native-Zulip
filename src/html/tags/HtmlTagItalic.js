import React from 'react';
import { View } from 'react-native';

import styles from '../HtmlStyles';
import renderHtmlChildren from '../renderHtmlChildren';

export default ({ cascadingStyle, ...restProps }) => (
  <View style={[styles.i, cascadingStyle]}>
    {renderHtmlChildren({ cascadingStyle, ...restProps })}
  </View>
);
