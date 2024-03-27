import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/getUserData', async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('response not ok');
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: [], status: 'idle' },
  reducers: {
    addUser: (state, action) => {
      const id = state.data.length + 1;
      const newData = [{ id, ...action.payload }, ...state.data];
      const newState = { ...state, data: newData };
      return newState;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        const newState = { ...state, data: action.payload, status: 'success' };
        return newState;
      })
      .addCase(fetchUser.pending, (state, action) => {
        return { ...state, status: 'loading' };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        return { ...state, status: 'error' };
      });
  }
});

export default userSlice.reducer;

export const { addUser } = userSlice.actions;
