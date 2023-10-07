import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type IDriver from '../../../interfaces/IDriver'

const initialState: IDriver[] = []

export const driversSlice = createSlice({
    name: 'drivers',
    initialState,
    reducers: {
        setDrivers: (state, action: PayloadAction<IDriver[]>) => {
            state.length = 0
            state.push(...action.payload)
        },
        setDriverChanged: (state, action: PayloadAction<IDriver>) => {
            const updatedDriver = action.payload
            const driverIndex = state.findIndex(
                (driver) => driver._id === updatedDriver._id
            )

            if (driverIndex !== -1) {
                state[driverIndex] = updatedDriver
            }
        },
    },
})

export const { setDrivers, setDriverChanged } = driversSlice.actions

export default driversSlice.reducer
