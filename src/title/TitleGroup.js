/* @flow */
import React, { PureComponent } from 'react';
import { View } from 'react-native';

import type { PresenceState, User } from '../types';
import { Avatar } from '../common';

type Props = {
  recipients: User[],
  presence: PresenceState,
};

export default class TitleGroup extends PureComponent<Props> {
  props: Props;

  static contextTypes = {
    styles: () => null,
  };

  render() {
    const { styles } = this.context;
    const { recipients, presence } = this.props;

    return (
      <View style={styles.navWrapper}>
        {recipients.map((user, index) => (
          <View key={user.email} style={styles.titleAvatar}>
            <Avatar
              size={32}
              name={user.fullName}
              avatarUrl={user.avatarUrl}
              email={user.email}
              presence={presence[user.email]}
            />
          </View>
        ))}
      </View>
    );
  }
}
