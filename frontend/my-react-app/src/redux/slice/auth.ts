import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string;
  userId: string;
  isTokenExpired: null;
  isLoggedIn: boolean;
  userName: string;
}

const initialState: AuthState = {
  accessToken: "",
  isTokenExpired: null,
  userId: "",
  isLoggedIn: false,
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state: any, action: any) {
      state.accessToken = action.payload;
    },
    setLoginState(state: any, action: PayloadAction<AuthState>) {
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
    },

    clearAuthState(state, action: PayloadAction<string>) {
      state.accessToken = "";
      state.userId = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setAccessToken, setLoginState, clearAuthState } =
  authSlice.actions;
export default authSlice.reducer;
