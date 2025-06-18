import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

type OrdersState = {
  data: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: OrdersState = {
  data: [],
  loading: false,
  error: null
};

export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('orders/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const orders = await getOrdersApi();
    return orders;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Ошибка при загрузке заказов');
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders(state) {
      state.data = [];
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при загрузке заказов';
      });
  }
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
