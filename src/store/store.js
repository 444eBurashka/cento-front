import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
  role: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      setTokens(state, action) {
          console.log('Setting tokens:', action.payload);
          state.accessToken = action.payload.access;
          state.refreshToken = action.payload.refresh;
          state.role = action.payload.role;
      },
      clearTokens(state) {
          state.accessToken = null;
          state.refreshToken = null;
          state.role = null;
      },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;