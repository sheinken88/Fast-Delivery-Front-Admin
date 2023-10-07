import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type IPackage from '../../../interfaces/IPackage'

const initialState: IPackage[] = []

export const packagesSlice = createSlice({
    name: 'packages',
    initialState,
    reducers: {
        setPackages: (state, action: PayloadAction<IPackage[]>) => {
            state.length = 0
            state.push(...action.payload)
        },
        setPackageChanged: (state, action: PayloadAction<IPackage>) => {
            const updatedPackage = action.payload
            const packageIndex = state.findIndex(
                (packageFiltered) => packageFiltered._id === updatedPackage._id
            )

            if (packageIndex !== -1) {
                state[packageIndex] = updatedPackage
            }
        },
    },
})

export const { setPackages, setPackageChanged } = packagesSlice.actions

export default packagesSlice.reducer
