import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrderByNumber,
  clearOrderInfo
} from '../../services/slices/orderInfo';
import {
  selectOrderInfo,
  selectOrderInfoLoading,
  selectOrderInfoError
} from '../../services/selectors/order-info';
import { selectIngredients } from '../../services/selectors/ingredients';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const orderData = useSelector(selectOrderInfo);
  const loading = useSelector(selectOrderInfoLoading);
  const error = useSelector(selectOrderInfoError);
  const allIngredients = useSelector(selectIngredients);

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
      return () => {
        dispatch(clearOrderInfo());
      };
    }
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || allIngredients.length === 0) return null;

    const date = new Date(orderData.createdAt);
    type TMap = Record<string, TIngredient & { count: number }>;

    const ingredientsInfo = orderData.ingredients.reduce((acc: TMap, id) => {
      if (!acc[id]) {
        const ing = allIngredients.find((i) => i._id === id);
        if (ing) acc[id] = { ...ing, count: 1 };
      } else {
        acc[id].count++;
      }
      return acc;
    }, {});

    const total = Object.values(ingredientsInfo).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, allIngredients]);

  if (loading || !orderInfo) {
    return <Preloader />;
  }
  if (error) {
    return (
      <div className='text text_type_main-default text_color_error'>
        {error}
      </div>
    );
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
