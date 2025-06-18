// src/services/slices/auth.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';
import type { TRegisterData, TLoginData } from '@api';

interface AuthState {
  user: TUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: getCookie('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  loading: false,
  error: null
};

export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const { user, accessToken, refreshToken } = await registerUserApi(userData);
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Ошибка регистрации');
  }
});

export const loginUser = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { user, accessToken, refreshToken } = await loginUserApi(credentials);
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Ошибка входа');
  }
});

export const getUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const { user } = await getUserApi();
      return user;
    } catch (err: any) {
      return rejectWithValue(
        err.message || 'Не удалось получить данные пользователя'
      );
    }
  }
);

export const updateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('auth/updateUser', async (userData, { rejectWithValue }) => {
  try {
    const { user } = await updateUserApi(userData);
    return user;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Не удалось обновить данные');
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка при выходе');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // при необходимости можно добавить синхронные экшены
  },
  extraReducers: (builder) => {
    // Регистрация
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.loading = false;
        state.user = action.payload;
        state.accessToken = document.cookie.includes('accessToken=')
          ? document.cookie
              .split('; ')
              .find((c) => c.startsWith('accessToken='))
              ?.split('=')[1] || null
          : null;
        state.refreshToken = localStorage.getItem('refreshToken');
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Ошибка регистрации';
    });

    // Логин
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.loading = false;
        state.user = action.payload;
        state.accessToken = document.cookie.includes('accessToken=')
          ? document.cookie
              .split('; ')
              .find((c) => c.startsWith('accessToken='))
              ?.split('=')[1] || null
          : null;
        state.refreshToken = localStorage.getItem('refreshToken');
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Ошибка входа';
    });

    // Получение профиля
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getUser.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Не удалось получить данные';
    });

    // Обновление профиля
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Не удалось обновить данные';
    });

    // Выход
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Ошибка при выходе';
    });
  }
});

export default authSlice.reducer;
