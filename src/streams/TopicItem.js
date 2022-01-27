/* @flow strict-local */
import React, { useContext } from 'react';
import type { Node } from 'react';
import { View } from 'react-native';
// $FlowFixMe[untyped-import]
import { useActionSheet } from '@expo/react-native-action-sheet';

import styles, { BRAND_COLOR, createStyleSheet } from '../styles';
import { ZulipText, Touchable, UnreadCount } from '../common';
import { showTopicActionSheet } from '../action-sheets';
import type { ShowActionSheetWithOptions } from '../action-sheets';
import { TranslationContext } from '../boot/TranslationProvider';
import { useDispatch, useSelector } from '../react-redux';
import { getAuth, getFlags, getSubscriptionsById, getStreamsById, getOwnUser } from '../selectors';
import { getMute } from '../mute/muteModel';
import { getUnread } from '../unread/unreadModel';

const componentStyles = createStyleSheet({
  selectedRow: {
    backgroundColor: BRAND_COLOR,
  },
  label: {
    flex: 1,
  },
  selectedText: {
    color: 'white',
  },
  muted: {
    opacity: 0.5,
  },
});

type Props = $ReadOnly<{|
  streamId: number,
  // TODO(#3918): Stop taking a stream name here.
  streamName: string,
  name: string,
  isMuted?: boolean,
  isSelected?: boolean,
  unreadCount?: number,
  // TODO(#3918): Stop passing stream name to this callback.
  onPress: (streamId: number, streamName: string, topic: string) => void,
|}>;

export default function TopicItem(props: Props): Node {
  const {
    streamId,
    streamName,
    name,
    isMuted = false,
    isSelected = false,
    unreadCount = 0,
    onPress,
  } = props;

  const showActionSheetWithOptions: ShowActionSheetWithOptions = useActionSheet()
    .showActionSheetWithOptions;
  const _ = useContext(TranslationContext);
  const dispatch = useDispatch();
  const backgroundData = useSelector(state => ({
    auth: getAuth(state),
    mute: getMute(state),
    streams: getStreamsById(state),
    subscriptions: getSubscriptionsById(state),
    unread: getUnread(state),
    ownUser: getOwnUser(state),
    flags: getFlags(state),
  }));

  return (
    <Touchable
      onPress={() => onPress(streamId, streamName, name)}
      onLongPress={() => {
        showTopicActionSheet({
          showActionSheetWithOptions,
          callbacks: { dispatch, _ },
          backgroundData,
          streamId,
          topic: name,
        });
      }}
    >
      <View
        style={[
          styles.listItem,
          isSelected && componentStyles.selectedRow,
          isMuted && componentStyles.muted,
        ]}
      >
        <ZulipText
          style={[componentStyles.label, isSelected && componentStyles.selectedText]}
          text={name}
          numberOfLines={1}
          ellipsizeMode="tail"
        />
        <UnreadCount count={unreadCount} inverse={isSelected} />
      </View>
    </Touchable>
  );
}
