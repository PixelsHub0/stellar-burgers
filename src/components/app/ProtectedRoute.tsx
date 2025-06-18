// src/components/app/ProtectedRoute.tsx

import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIsAuth, selectAuthLoading } from '../../services/selectors/auth';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  element: ReactElement;
  /**
   * Если true — маршрут только для НЕавторизованных.
   * Залогиненных редиректим на "/".
   */
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  element,
  onlyUnAuth = false
}) => {
  const isAuth = useSelector(selectIsAuth);
  const loading = useSelector(selectAuthLoading);
  const location = useLocation();

  // Пока идёт проверка авторизации — показываем загрузку
  if (loading) {
    return <Preloader />;
  }

  // Маршрут только для гостей — залогиненных отправляем на /
  if (onlyUnAuth) {
    return isAuth ? <Navigate to='/' replace /> : element;
  }

  // Обычный защищённый маршрут — гостей отправляем на /login
  return isAuth ? (
    element
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  );
};
