// src/pages/profile-orders/profile-orders.tsx

import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { selectUser } from '../../services/selectors/auth';
import { selectOrders } from '../../services/selectors/orders';
import { fetchUserOrders } from '../../services/slices/orders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const orders = useSelector(selectOrders);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserOrders());
    }
  }, [dispatch, user]);

  return <ProfileOrdersUI orders={orders} />;
};
