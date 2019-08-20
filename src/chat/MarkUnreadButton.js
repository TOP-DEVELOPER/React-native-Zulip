/* @flow strict-local */

import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import type { Auth, Narrow, Stream, Dispatch } from '../types';
import { connect } from '../react-redux';
import { ZulipButton } from '../common';
import * as api from '../api';
import { getAuth, getStreams } from '../selectors';
import { isHomeNarrow, isStreamNarrow, isTopicNarrow } from '../utils/narrow';

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    height: 32,
    paddingLeft: 12,
    paddingRight: 12,
  },
});

type Props = {|
  dispatch: Dispatch,
  auth: Auth,
  narrow: Narrow,
  streams: Stream[],
|};

class MarkUnreadButton extends PureComponent<Props> {
  markAllAsRead = () => {
    const { auth } = this.props;
    api.markAllAsRead(auth);
  };

  markStreamAsRead = () => {
    const { auth, narrow, streams } = this.props;
    const stream = streams.find(s => s.name === narrow[0].operand);
    if (stream) {
      api.markStreamAsRead(auth, stream.stream_id);
    }
  };

  markTopicAsRead = () => {
    const { auth, narrow, streams } = this.props;
    const stream = streams.find(s => s.name === narrow[0].operand);
    if (stream) {
      api.markTopicAsRead(auth, stream.stream_id, narrow[1].operand);
    }
  };

  render() {
    const { narrow } = this.props;

    if (isHomeNarrow(narrow)) {
      return (
        <ZulipButton style={styles.button} text="Mark all as read" onPress={this.markAllAsRead} />
      );
    }

    if (isStreamNarrow(narrow)) {
      return (
        <ZulipButton
          style={styles.button}
          text="Mark stream as read"
          onPress={this.markStreamAsRead}
        />
      );
    }

    if (isTopicNarrow(narrow)) {
      return (
        <ZulipButton
          style={styles.button}
          text="Mark topic as read"
          onPress={this.markTopicAsRead}
        />
      );
    }

    return null;
  }
}

export default connect(state => ({
  auth: getAuth(state),
  streams: getStreams(state),
}))(MarkUnreadButton);
