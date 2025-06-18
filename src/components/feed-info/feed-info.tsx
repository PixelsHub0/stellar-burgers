// src/components/feed-info/feed-info.tsx
import React, { FC, memo } from 'react';
import { useSelector } from '../../services/store';
import {
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday
} from '../../services/selectors/feeds';
import { FeedInfoUI } from '../ui/feed-info';
import { TOrder } from '@utils-types';

const getOrderNumbers = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((o) => o.status === status)
    .map((o) => o.number)
    .slice(0, 20);

export const FeedInfo: FC = memo(() => {
  const orders = useSelector(selectFeedOrders);
  const total = useSelector(selectFeedTotal);
  const totalToday = useSelector(selectFeedTotalToday);

  const readyOrders = getOrderNumbers(orders, 'done'); // «Готовы»

  // «В работе» — всё, что не done
  const inWorkOrders = orders
    .filter((o) => o.status !== 'done')
    .map((o) => o.number)
    .slice(0, 20);

  return (
    <FeedInfoUI
      feed={{ total, totalToday }}
      readyOrders={readyOrders}
      pendingOrders={inWorkOrders}
    />
  );
});
