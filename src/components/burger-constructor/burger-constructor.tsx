// src/components/burger-constructor/burger-constructor.tsx
import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { placeOrder, clearOrder } from '../../services/slices/order';
import {
  selectOrder,
  selectOrderLoading
} from '../../services/selectors/order';
import {
  selectBun,
  selectFillings
} from '../../services/selectors/constructor';
import { clearConstructor } from '../../services/slices/constructor';
import { selectIsAuth } from '../../services/selectors/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const bun = useSelector(selectBun);
  const fillings = useSelector(selectFillings);

  const orderRequest = useSelector(selectOrderLoading);
  const orderModalData = useSelector(selectOrder);

  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const constructorItems = useMemo(
    () => ({ bun, ingredients: fillings }),
    [bun, fillings]
  );

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) + fillings.reduce((sum, v) => sum + v.price, 0),
    [bun, fillings]
  );

  const onOrderClick = () => {
    // если не залогинен — отправляем на логин
    if (!isAuth) {
      navigate('/login', { state: { from: location } });
      return;
    }
    // если нет булки — ничего не делаем
    if (!bun) {
      return;
    }
    const ingredientIds = [bun._id, ...fillings.map((f) => f._id), bun._id];
    dispatch(placeOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
