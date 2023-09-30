import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type IAdmin from '../../../interfaces/IAdmin'

const initialState: IAdmin = {
    username: '',
    email: '',
    profile_pic: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IAdmin>) => {
            return {
                ...state,
                ...action.payload,
            }
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
