import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import modalSlice from './modalSlice';
import themeSlice from './themeSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    theme: themeSlice
  }
});

export default store;
