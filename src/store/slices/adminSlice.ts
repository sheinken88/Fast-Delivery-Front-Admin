import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type IAdmin from '../../../interfaces/IAdmin'

const initialState: IAdmin = {
    _id: '',
    username: '',
    email: '',
    profile_pic:
        'https://res.cloudinary.com/db3pcwsrm/image/upload/v1696036778/fast-delivery/assets/generic_profile_pic.png',
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
