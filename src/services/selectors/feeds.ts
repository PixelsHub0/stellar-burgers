// src/services/selectors/feeds.ts
import { RootState } from '../store';

export const selectFeedOrders = (state: RootState) => state.feeds.orders;
export const selectFeedTotal = (state: RootState) => state.feeds.total;
export const selectFeedTotalToday = (state: RootState) =>
  state.feeds.totalToday;
export const selectFeedLoading = (state: RootState) => state.feeds.loading;
export const selectFeedError = (state: RootState) => state.feeds.error;
