import { configureStore } from '@reduxjs/toolkit'
import cartReducar from './cart/'

export const store = configureStore({
    reducer: {
        cart: cartReducar
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch