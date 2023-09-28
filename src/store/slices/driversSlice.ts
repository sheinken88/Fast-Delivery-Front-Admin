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
    },
})

export const { setDrivers } = driversSlice.actions

export default driversSlice.reducer
