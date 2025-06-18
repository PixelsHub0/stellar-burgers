import { RootState } from '../store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsAuth = (state: RootState) =>
  Boolean(state.auth.accessToken);
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) =>
  state.auth.error ?? undefined;
