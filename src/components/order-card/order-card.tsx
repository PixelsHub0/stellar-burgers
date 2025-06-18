// src/components/order-card/order-card.tsx

import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/selectors/ingredients';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  console.log('[OrderCard] rendering order:', order.number);
  const location = useLocation();

  // теперь мы действительно достаём все ингредиенты из стора
  const ingredients = useSelector(selectIngredients);

  const orderInfo = useMemo(() => {
    // пока список ингредиентов не загружен — ничего не рендерим
    if (!ingredients.length) return null;

    // собираем объекты ингредиентов в том порядке, в каком они пришли в заказе
    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], id) => {
        const item = ingredients.find((ing) => ing._id === id);
        return item ? [...acc, item] : acc;
      },
      []
    );

    // считаем итоговую стоимость
    const total = ingredientsInfo.reduce((sum, ing) => sum + ing.price, 0);

    // ограничиваем число показанных и считаем, сколько осталось
    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);
    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    // парсим дату
    const date = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  // пока нет готового `orderInfo` — карточку не выводим
  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
