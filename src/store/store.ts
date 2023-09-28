import { configureStore } from '@reduxjs/toolkit'
import packagesReducer from '../store/slices/packagesSlice'
import adminSlice from './slices/adminSlice'
import driversSlice from './slices/driversSlice'

export const store = configureStore({
    reducer: {
        packages: packagesReducer,
        drivers: driversSlice,
        admin: adminSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
