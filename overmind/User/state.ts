type UserState = {
  email: string;
  isLoggedIn: boolean;
  session: string;
}

export const state: UserState = {
  email: '',
  isLoggedIn: false,
  session: ''
}