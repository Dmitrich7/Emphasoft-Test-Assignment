import axios, {AxiosResponse} from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";

export interface ILoginUser {
    username: string;
    password: string;
}
export interface IToken{
    token:string;
}

export const login = createAsyncThunk(
    'auth/login',
    async (params:ILoginUser, thunkAPI) =>{
        try {
            const response = await axios.post<ILoginUser,AxiosResponse<IToken>>("https://test-assignment.emphasoft.com/api/v1/login/",params);
            return response.data.token;
        }catch (e) {
            let errorMessage = "Failed to do something exceptional";
            if (e instanceof Error) {
                errorMessage = e.message;
            }
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)
