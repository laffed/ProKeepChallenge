import {Action, AsyncAction} from '../index';

export const resetUserState: Action<void, void> = ({state}) => {
  state.User.email = '';
  state.User.isLoggedIn = false;
}

export const setLogin: Action<string, void> = ({state}, email) => {
  state.User.email = email;
  state.User.isLoggedIn = true;
}