/* @flow */
import { connect } from 'react-redux';

import React, { PureComponent } from 'react';

import { Screen, OptionButton } from '../common';
import openLink from '../utils/openLink';
import { getFullUrl } from '../utils/url';
import { getCurrentRealm } from '../selectors';

type Props = {
  realm: string,
};

class LegalScreen extends PureComponent<Props> {
  props: Props;

  openTermsOfService = () => {
    const { realm } = this.props;
    openLink(getFullUrl('/terms/', realm));
  };

  openPrivacyPolicy = () => {
    const { realm } = this.props;
    openLink(getFullUrl('/privacy/', realm));
  };

  render() {
    return (
      <Screen title="Legal">
        <OptionButton label="Terms of service" onPress={this.openTermsOfService} />
        <OptionButton label="Privacy policy" onPress={this.openPrivacyPolicy} />
      </Screen>
    );
  }
}

export default connect(state => ({
  realm: getCurrentRealm(state),
}))(LegalScreen);
