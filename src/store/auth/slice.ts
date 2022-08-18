import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { makeRequestCaseToBuilder, makeRequestSliceStateProperty } from '../helpers';
import { RequestSliceStateProperty } from '../types';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  test: boolean;
  isAuth: boolean;
  loginRequest: RequestSliceStateProperty<any>;
}

const initialState: InitialState = {
  test: true,
  isAuth: false,
  loginRequest: makeRequestSliceStateProperty<any>(),
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    makeRequestCaseToBuilder<InitialState>(builder, thunks.loginThunk, 'loginRequest');
  },
});