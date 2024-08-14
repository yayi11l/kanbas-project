import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  profile: any; // Consider defining a more specific type for your profile
}

const initialState: ProfileState = {
  profile: {}
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<any>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

export const { setProfile, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;