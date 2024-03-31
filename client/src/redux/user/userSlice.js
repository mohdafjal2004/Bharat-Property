import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    UpdateUserStart: (state) => {
      state.loading = true;
    },
    UpdateUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    UpdateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    DeleteUserStart: (state) => {
      state.loading = true;
    },
    DeleteUserSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
    DeleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  UpdateUserStart,
  UpdateUserSuccess,
  UpdateUserFailure,
  DeleteUserFailure,
  DeleteUserStart,
  DeleteUserSuccess,
} = userSlice.actions; //for components
export default userSlice.reducer; //for store, since it default we can use it with any name
