/* @flow strict-local */
import type { Auth, ApiResponseSuccess, User } from '../apiTypes';
import { apiGet } from '../apiFetch';

type ApiResponseUsers = {|
  ...ApiResponseSuccess,
  members: User[],
|};

/** See https://zulipchat.com/api/get-all-users */
export default (auth: Auth): Promise<ApiResponseUsers> =>
  apiGet(auth, 'users', res => res, { client_gravatar: true });
