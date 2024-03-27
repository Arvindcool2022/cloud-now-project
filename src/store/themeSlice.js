import { createSlice } from '@reduxjs/toolkit';
export const availTheme = { light: 'light', dark: 'dark' };

const themeSlice = createSlice({
  name: 'theme',
  initialState: availTheme.light,
  reducers: {
    changeTheme: (state, action) => {
      if (state === availTheme.light) return availTheme.dark;
      else return availTheme.light;
    }
  }
});

export default themeSlice.reducer;

export const { changeTheme } = themeSlice.actions;
