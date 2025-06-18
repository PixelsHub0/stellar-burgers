import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredients';
import { getUser } from '../../services/slices/auth';
import { selectAuthLoading } from '../../services/selectors/auth';

import { AppHeader, Modal } from '@components';
import { Preloader } from '@ui';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { IngredientDetails, OrderInfo } from '@components';
import { ProtectedRoute } from './ProtectedRoute';

import '../../index.css';
import styles from './app.module.css';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // статусы загрузки
  const ingredientsLoading = useSelector((state) => state.ingredients.loading);
  const authLoading = useSelector(selectAuthLoading);
  const loading = ingredientsLoading || authLoading;

  // для модалок
  const background = (location.state as any)?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
  }, [dispatch]);

  const handleCloseModal = () => navigate(-1);

  return (
    <div className={styles.app}>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <AppHeader />

          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />

            {/* Только для НЕавторизованных */}
            <Route
              path='/login'
              element={<ProtectedRoute onlyUnAuth element={<Login />} />}
            />
            <Route
              path='/register'
              element={<ProtectedRoute onlyUnAuth element={<Register />} />}
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth element={<ForgotPassword />} />
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth element={<ResetPassword />} />
              }
            />

            {/* Доступ только авторизованным */}
            <Route
              path='/profile'
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route
              path='/profile/orders'
              element={<ProtectedRoute element={<ProfileOrders />} />}
            />

            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route
              path='/profile/orders/:number'
              element={<ProtectedRoute element={<OrderInfo />} />}
            />
            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/feed/:number'
                element={
                  <Modal title='Информация о заказе' onClose={handleCloseModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute
                    element={
                      <Modal
                        title='Информация о заказе'
                        onClose={handleCloseModal}
                      >
                        <OrderInfo />
                      </Modal>
                    }
                  />
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
