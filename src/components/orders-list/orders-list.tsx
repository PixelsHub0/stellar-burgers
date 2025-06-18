import { FC, memo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  console.log('[OrdersList]', orders);
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  console.log('[OrdersList] sorted orderByDate:', orderByDate);

  return <OrdersListUI orderByDate={orderByDate} />;
});
