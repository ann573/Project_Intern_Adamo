import { createSlice } from '@reduxjs/toolkit';

interface IAuthState {
    id: string,
    name: string
}

const initialState: IAuthState = {
    id: '',
    name: ''
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action) {
            const { id, name } = action.payload;
            state.id = id;
            state.name = name;
        },
        removeAuth(state, _) {
            state.id = "";
            state.name = "";
        }
    },
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
