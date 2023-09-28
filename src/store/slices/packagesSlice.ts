import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type IPackage from '../../../interfaces/IPackage'

const initialState: IPackage[] = []

export const packagesSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {
        setPackages: (state, action: PayloadAction<IPackage[]>) =>
            action.payload,
    },
})

export const { setPackages } = packagesSlice.actions

export default packagesSlice.reducer
