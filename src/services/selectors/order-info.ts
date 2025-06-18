import { RootState } from '../store';
import { TOrder } from '@utils-types';

export const selectOrderInfo = (state: RootState): TOrder | null =>
  state.orderInfo.data;
export const selectOrderInfoLoading = (state: RootState): boolean =>
  state.orderInfo.loading;
export const selectOrderInfoError = (state: RootState): string | null =>
  state.orderInfo.error;
