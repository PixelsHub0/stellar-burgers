// src/pages/profile/profile.tsx

import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { updateUser } from '../../services/slices/auth';
import { selectUser, selectAuthError } from '../../services/selectors/auth';
import { ProfileUI } from '@ui-pages';
import { TUser } from '@utils-types';

type FormValue = {
  name: string;
  email: string;
  password: string;
};

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const updateError = useSelector(selectAuthError);

  // Инициализируем форму из текущего user
  const [formValue, setFormValue] = useState<FormValue>({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: ''
  });

  // Если user из стора изменился (при первом заходе или после обновления) —
  // заполняем поля
  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  // Проверяем, изменилось ли что-нибудь в форме
  const isFormChanged =
    formValue.name !== (user?.name ?? '') ||
    formValue.email !== (user?.email ?? '') ||
    formValue.password !== '';

  // Хендлеры
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateUser({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password
      })
    );
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    // Сбрасываем форму в значения из стора
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: ''
    });
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateError}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleInputChange={handleInputChange}
    />
  );
};
