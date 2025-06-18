// src/services/selectors/constructor.ts

import { RootState } from '../store';
import { TConstructorIngredient } from '@utils-types';

// Гарантируем, что bun всегда TConstructorIngredient или null
export const selectBun = (state: RootState): TConstructorIngredient | null =>
  state.burgerConstructor.bun;

// Всегда возвращаем массив (даже если по какой-то причине undefined)
export const selectFillings = (state: RootState): TConstructorIngredient[] =>
  state.burgerConstructor.fillings ?? [];

// Если нужен общий селектор
export const selectConstructor = (state: RootState) => ({
  bun: selectBun(state),
  fillings: selectFillings(state)
});
