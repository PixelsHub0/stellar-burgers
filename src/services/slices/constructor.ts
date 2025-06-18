import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type ConstructorState = {
  bun: TConstructorIngredient | null;
  fillings: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  fillings: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.bun = action.payload;
    },
    addFilling: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        state.fillings.push(action.payload);
      },
      prepare(ingredient: TConstructorIngredient) {
        return {
          payload: { ...ingredient, id: nanoid() }
        };
      }
    },
    removeFilling(state, action: PayloadAction<string>) {
      state.fillings = state.fillings.filter((f) => f.id !== action.payload);
    },
    moveFilling(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const [item] = state.fillings.splice(fromIndex, 1);
      state.fillings.splice(toIndex, 0, item);
    },
    clearConstructor(state) {
      state.bun = null;
      state.fillings = [];
    }
  }
});

export const {
  addBun,
  addFilling,
  removeFilling,
  moveFilling,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
