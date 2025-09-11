import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    nombre: null,
    direccion: null,
};

export const SecondLineSlice = createSlice({
    name: 'secondLine',
    initialState,
    reducers: {
        idChange: (state, action) => {
            state.id = action.payload;
        },
        nombreChange: (state, action) => {
            state.nombre = action.payload;
        },
        direccionChange: (state, action) => {
            state.direccion = action.payload;
        },
    },
});

export const { idChange, nombreChange, direccionChange } = SecondLineSlice.actions;

export default SecondLineSlice.reducer;