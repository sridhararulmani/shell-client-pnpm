import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userEmail: "",
  userPassword: "",
  profileImage: "",
  profileImageType: "",
  mobileNumber: "",
  userRoles: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setTokens: (state, action) => {
    //   state.accessToken = action.payload.accessToken;
    //   state.refreshToken = action.payload.refreshToken;
    // },
    setUser: (state, action) => {
      const { userName, userEmail, profileImage, profileImageType, userRoles } =
        action.payload;
      return {
        userName: userName || null,
        userEmail: userEmail || null,
        profileImage: profileImage || null,
        profileImageType: profileImageType || null,
        userRoles: userRoles || [],
      };
    },
    clearUser: (state) => {
      state.user = null;
      // state.accessToken = null;
      // state.refreshToken = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
