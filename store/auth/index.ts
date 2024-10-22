import { deleteCookie, setCookie } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  user: Record<string, any> | null;
  token: string | null;
  status: string;
};

export type Session = {
  user: Record<string, any> | null;
  token: string;
  persistance: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'loading',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Handles user session creation
    createSession(state, { payload }: PayloadAction<Session>) {
      const { user, token, persistance } = payload;

      state.status = 'authenticated';
      state.token = token;
      state.user = user;

      // Set cookie with token, persist or session-based
      setCookie('auth-token', token,  persistance ? 2592000000 : null)
    },

    // Handles session destruction and clears state
    destroySession(state) {
      state.status = 'unauthenticated';
      state.token = null;
      state.user = null;

      // Clear auth token cookie
      deleteCookie('auth-token')
    },

    // Sets the session based on the provided state
    setSession(state, { payload }: PayloadAction<AuthState>) {
      const { status, user, token } = payload;

      state.status = status;
      state.token = token;
      state.user = user;
    },
  },
});

export const { createSession, setSession, destroySession } = authSlice.actions;
export default authSlice.reducer;
