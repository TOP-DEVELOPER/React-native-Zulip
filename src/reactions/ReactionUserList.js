/* @flow strict-local */
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { connect } from '../react-redux';

import type { Dispatch, UserOrBot } from '../types';
import UserItem from '../users/UserItem';
import { navigateToAccountDetails } from '../actions';

type Props = $ReadOnly<{|
  dispatch: Dispatch,
  reactedUserIds: $ReadOnlyArray<number>,
  users: Map<number, UserOrBot>,
|}>;

class ReactionUserList extends PureComponent<Props> {
  handlePress = (email: string) => {
    const { dispatch } = this.props;
    dispatch(navigateToAccountDetails(email));
  };

  render() {
    const { reactedUserIds, users } = this.props;

    return (
      <FlatList
        data={reactedUserIds}
        keyExtractor={userId => `${userId}`}
        renderItem={({ item }) => {
          const user = users.get(item);
          if (!user) {
            return null;
          }
          return (
            <UserItem
              key={user.user_id}
              fullName={user.full_name}
              avatarUrl={user.avatar_url}
              email={user.email}
              showEmail
              onPress={this.handlePress}
            />
          );
        }}
      />
    );
  }
}

export default connect()(ReactionUserList);
