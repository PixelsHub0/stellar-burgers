import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('orderInfo/fetchByNumber', async (orderNumber, { rejectWithValue }) => {
  try {
    const { orders } = await getOrderByNumberApi(orderNumber);
    // API возвращает { success, orders: TOrder[] }
    return orders[0];
  } catch (err: any) {
    return rejectWithValue(err.message || 'Не удалось загрузить заказ');
  }
});

type OrderInfoState = {
  data: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrderInfoState = {
  data: null,
  loading: false,
  error: null
};

const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    clearOrderInfo(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (b) => {
    b.addCase(fetchOrderByNumber.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (s, action: PayloadAction<TOrder>) => {
          s.loading = false;
          s.data = action.payload;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload || 'Ошибка при загрузке заказа';
      });
  }
});

export const { clearOrderInfo } = orderInfoSlice.actions;
export default orderInfoSlice.reducer;
