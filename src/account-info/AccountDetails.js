/* @flow strict-local */
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import type { GlobalState, User } from '../types';
import { UserAvatar, ComponentList, RawLabel } from '../common';
import { getCurrentRealm } from '../selectors';
import PresenceStatusIndicator from '../common/PresenceStatusIndicator';
import ActivityText from '../title/ActivityText';
import { getAvatarFromUser } from '../utils/avatar';
import { nowInTimeZone } from '../utils/date';
import styles from '../styles';

const componentStyles = StyleSheet.create({
  componentListItem: {
    alignItems: 'center',
  },
  statusWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const AVATAR_SIZE = 200;

type Props = {|
  realm: string,
  user: User,
|};

class AccountDetails extends PureComponent<Props, void> {
  render() {
    const { realm, user } = this.props;

    return (
      <View>
        <ComponentList outerSpacing itemStyle={componentStyles.componentListItem}>
          <View>
            <UserAvatar
              avatarUrl={getAvatarFromUser(user, realm, AVATAR_SIZE)}
              size={AVATAR_SIZE}
              shape="circle"
            />
          </View>
          <View style={componentStyles.statusWrapper}>
            <PresenceStatusIndicator email={user.email} hideIfOffline={false} />
            <RawLabel style={[styles.largerText, styles.halfMarginLeft]} text={user.email} />
          </View>
          <View>
            <ActivityText style={styles.largerText} email={user.email} />
          </View>
          {user.timezone ? (
            <View>
              <RawLabel
                style={styles.largerText}
                text={`${nowInTimeZone(user.timezone)} Local time`}
              />
            </View>
          ) : null}
        </ComponentList>
      </View>
    );
  }
}

export default connect((state: GlobalState) => ({
  realm: getCurrentRealm(state),
}))(AccountDetails);
