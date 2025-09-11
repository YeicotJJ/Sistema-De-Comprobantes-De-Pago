import { configureStore } from '@reduxjs/toolkit'
import SecondLineSlice from './slices/form_second_line'

export const store = configureStore({
    reducer: {
        second_line: SecondLineSlice,
    },
})