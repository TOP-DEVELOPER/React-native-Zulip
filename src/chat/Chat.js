/* @flow */
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import type { Message, Narrow } from '../types';
import { KeyboardAvoider, OfflineNotice } from '../common';

import MessageListContainer from '../message/MessageListContainer';
import NoMessages from '../message/NoMessages';
import ComposeBoxContainer from '../compose/ComposeBoxContainer';
import UnreadNoticeContainer from './UnreadNoticeContainer';

type Props = {
  narrow: Narrow,
  showMessagePlaceholders: boolean,
  isOnline: boolean,
  noMessages: boolean,
  lastMessage: Message,
  ownEmail: string,
};

export default class Chat extends PureComponent<Props> {
  messageInputRef = null;
  messageInputRef: any;

  static contextTypes = {
    styles: () => null,
  };

  scrollOffset: number = 0;
  listComponent: any;

  props: Props;

  componentDidUpdate(prevProps: Props) {
    const { noMessages, lastMessage, ownEmail } = this.props;

    if (noMessages || lastMessage.id === prevProps.lastMessage.id) {
      return;
    }

    if (lastMessage.sender_email === ownEmail && this.listComponent) {
      this.listComponent.scrollToEnd();
    }
  }

  handleReplySelect = () => {
    // set a timeout because it's take time to render ComposeBox after narrowing from home
    setTimeout(() => {
      if (this.messageInputRef) {
        this.messageInputRef.focus();
      }
    }, 300);
  };

  render() {
    const { styles } = this.context;
    const { showMessagePlaceholders, narrow, isOnline, noMessages } = this.props;

    return (
      <KeyboardAvoider style={styles.flexed} behavior="padding">
        <ActionSheetProvider>
          <View style={styles.flexed}>
            {!isOnline && <OfflineNotice />}
            {noMessages && !showMessagePlaceholders && <NoMessages narrow={narrow} />}
            <ActionSheetProvider>
              <MessageListContainer
                onReplySelect={this.handleReplySelect}
                listRef={component => {
                  this.listComponent = component || this.listComponent;
                }}
              />
            </ActionSheetProvider>
            <UnreadNoticeContainer />
            {!showMessagePlaceholders && (
              <ComposeBoxContainer
                messageInputRef={(component: any) => {
                  this.messageInputRef = component || this.messageInputRef;
                }}
              />
            )}
          </View>
        </ActionSheetProvider>
      </KeyboardAvoider>
    );
  }
}
