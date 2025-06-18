// src/components/burger-constructor-element/burger-constructor-element.tsx

import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';
import { removeFilling, moveFilling } from '../../services/slices/constructor';

import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveUp = () => {
      if (index <= 0) return;
      dispatch(moveFilling({ fromIndex: index, toIndex: index - 1 }));
    };

    const handleMoveDown = () => {
      if (index >= totalItems - 1) return;
      dispatch(moveFilling({ fromIndex: index, toIndex: index + 1 }));
    };

    const handleClose = () => {
      dispatch(removeFilling(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
