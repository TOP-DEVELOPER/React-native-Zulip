/* @flow */
import { connect } from 'react-redux';

import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

import type { Context, PresenceState, User } from '../types';
import { Avatar, ViewPlaceholder } from '../common';
import ActivityText from './ActivityText';
import { getPresence, getUserInPmNarrow } from '../selectors';

type Props = {
  user: User,
  color: string,
  presence: PresenceState,
};

class TitlePrivate extends PureComponent<Props> {
  context: Context;
  props: Props;

  static contextTypes = {
    styles: () => null,
  };

  render() {
    const { styles } = this.context;
    const { user, color, presence } = this.props;

    return (
      <View style={styles.navWrapper}>
        <Avatar
          size={32}
          name={user.full_name}
          email={user.email}
          avatarUrl={user.avatar_url}
          presence={presence[user.email]}
        />
        <ViewPlaceholder width={8} />
        <View>
          <Text style={[styles.navTitle, { color }]} numberOfLines={1} ellipsizeMode="tail">
            {user.full_name}
          </Text>
          {/* Flow complains because ActivityText has a `presence` prop which
              we do not specify here. However, we don't need to, since the
              `presence` prop gets automatically assigned in ActivityText's
              creation with `connect`.
              $FlowFixMe */}
          <ActivityText style={styles.navSubtitle} color={color} email={user.email} />
        </View>
      </View>
    );
  }
}

export default connect((state, props) => ({
  user: getUserInPmNarrow(props.narrow)(state),
  presence: getPresence(state),
}))(TitlePrivate);
