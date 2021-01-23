import {Action, AsyncAction} from '../index';

export const resetUserState: Action<void, void> = ({state}) => {
  state.User.displayName = '';
  state.User.email = '';
  state.User.isLoggedIn = false;
}