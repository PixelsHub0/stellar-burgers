// src/components/profile-menu/profile-menu.tsx

import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/auth';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser())
      // если используешь .unwrap(), то можно отлавливать ошибки:
      // .unwrap()
      // .then(() => navigate('/login', { replace: true }))
      // .catch(err => console.error(err))
      // но можно и просто:
      .then(() => {
        // после того как токены почистились в сторе и куки/LocalStorage
        navigate('/login', { replace: true });
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
