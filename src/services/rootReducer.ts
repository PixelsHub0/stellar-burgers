import { combineReducers } from '@reduxjs/toolkit';
import ingredients from './slices/ingredients';
import burgerConstructor from './slices/constructor'; // ← импорт слайса
import auth from './slices/auth';
import orders from './slices/orders';
import order from './slices/order';
import feeds from './slices/feeds';
import orderInfo from './slices/orderInfo';

const rootReducer = combineReducers({
  ingredients,
  burgerConstructor, // ← теперь именно здесь хранится состояние конструктора
  auth,
  orders,
  order,
  feeds,
  orderInfo
});

export default rootReducer;
