import { configureStore } from '@reduxjs/toolkit'
import packagesReducer from '../store/slices/packagesSlice'
import usersSlice from './slices/usersSlice'

export const store = configureStore({
    reducer: {
        packages: packagesReducer,
        users: usersSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
