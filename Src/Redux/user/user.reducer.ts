import {PayloadAction} from '@reduxjs/toolkit';
import { UserDetailEntity, UserState} from './user.entity';

export default {
  'user/set-user': (state: UserState, action: PayloadAction<UserDetailEntity | null>,) => {
    state.user = action.payload
  },
  'user/set-firebaseToken': (state: UserState, action: PayloadAction<string | null>,) => {
    state.firebaseToken = action.payload
  },
};
