// src/components/burger-ingredient/burger-ingredient.tsx

import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit'; // ← nanoid для генерации id
import { useDispatch } from '../../services/store';
import { addBun, addFilling } from '../../services/slices/constructor';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { TConstructorIngredient } from '@utils-types'; // ← тип с полем id

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleAdd = () => {
      // создаём объект с обязательным полем `id`
      const item: TConstructorIngredient = {
        ...ingredient,
        id: nanoid()
      };

      if (ingredient.type === 'bun') {
        dispatch(addBun(item));
      } else {
        dispatch(addFilling(item));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
