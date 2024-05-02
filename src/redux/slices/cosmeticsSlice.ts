import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CosmeticsState } from '../../models/Redux'
import { RootState } from '../store'

const initialState: CosmeticsState = {
    notification: {
        message: '',
        code: 200,
    },
}

const CosmeticsSlice = createSlice({
    name: 'cosmetics',
    initialState,
    reducers: {
        setNotify: (state, action: PayloadAction<{ message: string; code: number }>) => {
            const { message, code } = action.payload
            return { ...state, notification: { message, code } }
        },
        clearNotify: () => {
            return initialState
        },
    },
})

export default CosmeticsSlice.reducer

export const { setNotify, clearNotify } = CosmeticsSlice.actions

export const selectNotification = (state: RootState) => state.cosmetics.notification
