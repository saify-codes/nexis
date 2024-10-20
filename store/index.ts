import { configureStore } from '@reduxjs/toolkit'
import cartReducar from './cart/'
import authReducer from './auth'

export const store = configureStore({
    reducer: {
        cart: cartReducar,
        auth: authReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch