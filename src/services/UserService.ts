import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUser} from "../models/IUser";
import {IPostUser} from "../models/IPostUser";

const tokenHeader = {
    "Authorization": "Token "+localStorage.getItem("AccessToken") ?? ""
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: "https://test-assignment.emphasoft.com"}),
    tagTypes: ["User"],
    endpoints: (build)=> ({
        getUsers: build.query<IUser[],void>({
            query: ()=> ({
                url: "/api/v1/users/",
                headers: tokenHeader
            }),
            providesTags: result => ["User"]
        }),
        postUser: build.mutation<IUser,IPostUser>({
            query: (newUser)=> ({
                url: "/api/v1/users/",
                method: "POST",
                body: newUser,
                headers: tokenHeader
            }),
            invalidatesTags: result => ["User"]
        }),
        getUserById: build.query<IUser,number>({
            query: (userId)=> ({
                url: `/api/v1/users/${userId}`,
                headers: tokenHeader
            }),
            providesTags: result => ["User"]
        }),
        putUser: build.mutation<IUser,{userId: number, newUser:IPostUser}>({
            query: ({userId, newUser})=> ({
                url: `/api/v1/users/${userId}`,
                method: "PUT",
                body: newUser,
                headers: tokenHeader
            }),
            invalidatesTags: result => ["User"]
        }),
        patchUser: build.mutation<IUser,{userId: number, newUser:IPostUser}>({
            query: ({userId, newUser})=> ({
                url: `/api/v1/users/${userId}`,
                method: "PATCH",
                body: newUser,
                headers: tokenHeader
            }),
            invalidatesTags: result => ["User"]
        }),
        deleteUser: build.mutation<void,number>({
            query: (userId)=> ({
                url: `/api/v1/users/${userId}`,
                method: "DELETE",
                headers: tokenHeader
            }),
            invalidatesTags: result => ["User"]
        }),
    })
})
