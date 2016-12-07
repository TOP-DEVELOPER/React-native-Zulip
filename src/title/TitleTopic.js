import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    // lineHeight: NAVBAR_HEIGHT,
  },
});

export default class TitleTopic extends React.PureComponent {
  render() {
    const { narrow } = this.props;
    return (
      <Text style={styles.title} numberOfLines={1}>
        {narrow[1].operand}
      </Text>
    );
  }
}
