import { configureStore } from '@reduxjs/toolkit'
import packagesReducer from '../store/slices/packagesSlice'
import usersSlice from './slices/usersSlice'
import adminSlice from './slices/adminSlice'

export const store = configureStore({
    reducer: {
        packages: packagesReducer,
        users: usersSlice,
        admins: adminSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
