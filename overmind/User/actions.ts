import {Action, AsyncAction} from '../index';

export const resetUserState: Action<void, void> = ({state}) => {
  state.User.email = '';
  state.User.isLoggedIn = false;
}

export const setUserSession: Action<{email: string; token: string}, void> = ({state}, {email, token}) => {
  state.User.email = email;
  state.User.session = token;
}