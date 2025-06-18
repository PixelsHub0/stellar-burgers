import { RootState } from '../store';

export const selectOrders = (state: RootState) => state.orders.data;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;
export const selectOrdersError = (state: RootState) => state.orders.error;
