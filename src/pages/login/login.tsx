// src/pages/login/login.tsx

import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/auth';
import {
  selectIsAuth,
  selectAuthError,
  selectAuthLoading
} from '../../services/selectors/auth';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // куда вернуть после логина
  const from = (location.state as any)?.from?.pathname || '/';

  // стейты авторизации
  const isAuth = useSelector(selectIsAuth);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  // локальный стейт формы
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // если уже залогинен — редиректим
  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
    }
  }, [isAuth, navigate, from]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      errorText={error || ''}
      // можно заблокировать кнопку на время загрузки:
      disabled={loading}
    />
  );
};
