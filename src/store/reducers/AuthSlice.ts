import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login} from "./ActionCreators";

interface ILoginSlice{
    isLoading: boolean;
    error: string;
    isLoggedIn: boolean
}

const initialState: ILoginSlice = {
    isLoading: false,
    error: '',
    isLoggedIn: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logOut(state){
            localStorage.removeItem("AccessToken")
            state.isLoggedIn = false;
        }
    },
    extraReducers: builder=>{
        builder
            .addCase(login.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(login.fulfilled,(state, action:PayloadAction<string>)=>{
                state.isLoading = false;
                state.isLoggedIn = true;
                localStorage.setItem("AccessToken", action.payload);
            })
            .addCase(login.rejected,(state)=>{
                state.isLoading = false;
            })
    }
})

export default authSlice.reducer;

