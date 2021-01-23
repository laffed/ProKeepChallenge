type UserState = {
  displayName: string;
  email: string;
  isLoggedIn: boolean;
}

export const state: UserState = {
  displayName: '',
  email: '',
  isLoggedIn: false
}