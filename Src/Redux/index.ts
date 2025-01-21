import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { reducer as userReducer } from './user/user.slice';
// import {reducer as chatsReducer} from './chats/chats.slice';
// import userReducer from './user/user.reducer';

const reducers = {
  userReducer: userReducer,
  // chatsReducer:chatsReducer
};

export const store = configureStore({
  reducer: reducers,
  // enhancers: [],
  enhancers: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type ActionEntity = {
  type: string;
  payload?: any;
};
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
