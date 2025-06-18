// src/pages/feed/feed.tsx

import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feeds';
import {
  selectFeedOrders,
  selectFeedLoading
} from '../../services/selectors/feeds';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const loading = useSelector(selectFeedLoading);

  console.log('[Feed] loading:', loading, 'orders:', orders);

  console.log('[Feed]', { loading, ordersLength: orders.length, orders });

  // Загружаем ленту только если она ещё пустая
  useEffect(() => {
    if (orders.length === 0) {
      dispatch(fetchFeeds());
    }
  }, [dispatch, orders.length]);

  // Пока идёт загрузка или заказов ещё нет — показываем прелоадер
  if (loading || orders.length === 0) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
