import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Admin {
    id: string
    email: string
}

export interface AdminState {
    users: Admin[]
    currentUser: Admin | null
}

const initialState: AdminState = {
    users: [],
    currentUser: null,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setCurrentAdmin: (state, action: PayloadAction<Admin | null>) => {
            state.currentUser = action.payload
        },
    },
})

export const { setCurrentAdmin } = usersSlice.actions
export default usersSlice.reducer
