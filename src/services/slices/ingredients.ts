import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

type IngredientsState = {
  data: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: IngredientsState = {
  data: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  async (_, thunkAPI) => {
    try {
      const result = await getIngredientsApi();
      return await getIngredientsApi();
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось загрузить ингредиенты');
    }
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default ingredientsSlice.reducer;
