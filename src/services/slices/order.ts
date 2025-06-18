// src/services/slices/order.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const placeOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/place', async (ingredientIds, { rejectWithValue }) => {
  try {
    const { order } = await orderBurgerApi(ingredientIds);
    return order;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Не удалось оформить заказ');
  }
});

type OrderState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  order: null,
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.order = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
