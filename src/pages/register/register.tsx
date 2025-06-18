// src/pages/register/register.tsx

import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/slices/auth';
import {
  selectAuthLoading,
  selectAuthError,
  selectIsAuth
} from '../../services/selectors/auth';

export const Register: FC = () => {
  const dispatch = useDispatch();

  // Состояние авторизации из Redux
  const loading = useSelector(selectAuthLoading);
  const errorText = useSelector(selectAuthError);
  const isAuth = useSelector(selectIsAuth);

  // Локальные поля формы
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: userName, email, password }));
  };

  // Если уже авторизованы, переходим на главную
  if (isAuth) {
    return <Navigate to='/' replace />;
  }

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
      disabled={loading}
    />
  );
};
