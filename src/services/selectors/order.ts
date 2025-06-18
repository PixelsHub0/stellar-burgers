// src/services/selectors/order.ts
import { RootState } from '../store';
import { TOrder } from '@utils-types';

export const selectOrder = (state: RootState): TOrder | null =>
  state.order.order;
export const selectOrderLoading = (state: RootState): boolean =>
  state.order.loading;
export const selectOrderError = (state: RootState): string | null =>
  state.order.error;
