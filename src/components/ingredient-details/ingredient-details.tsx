// src/components/ingredient-details/ingredient-details.tsx
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIngredients,
  selectIngredientsLoading
} from '../../services/selectors/ingredients';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);
  const loading = useSelector(selectIngredientsLoading);

  // Ищем нужный ингредиент по _id
  const ingredientData: TIngredient | undefined = useMemo(
    () => ingredients.find((ing) => ing._id === id),
    [ingredients, id]
  );

  // Пока идёт загрузка или нужный ингредиент не найден — показываем прелоадер
  if (loading || !ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
