import { createSlice } from '@reduxjs/toolkit';

// interface ProfileState {
//   firstName: string | null;
//   lastName: string | null;
//   location: string | null;
//   email: string | null;
//   bio: string | null;
//   website: string | null;

// }

const initialState = {
    profile: []
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
        state.profile = action.payload
    },
    updateProfile: (state, { payload: profileUpdate }) => {
        state.profile = { ...state.profile, ...profileUpdate };
      },
  },
});

export const { setProfile, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;