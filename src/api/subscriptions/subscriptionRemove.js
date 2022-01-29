/* @flow strict-local */
import type { ApiResponse, Auth } from '../transportTypes';
import { apiDelete } from '../apiFetch';

/** See https://zulip.com/api/unsubscribe */
export default (
  auth: Auth,
  subscriptions: $ReadOnlyArray<string>,
  // TODO(server-3.0): Send numeric user IDs (#3764), not emails.
  principals?: $ReadOnlyArray<string>,
): Promise<ApiResponse> =>
  apiDelete(auth, 'users/me/subscriptions', {
    subscriptions: JSON.stringify(subscriptions),
    principals: JSON.stringify(principals),
  });
