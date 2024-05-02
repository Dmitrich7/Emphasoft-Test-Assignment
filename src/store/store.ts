import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from './reducers/AuthSlice'
import {userApi} from "../services/UserService";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "root",
    storage
}

const persistedAuthReducer = persistReducer(persistConfig,authReducer)

const rootReducer = combineReducers({
    persistedAuthReducer,
    [userApi.reducerPath]: userApi.reducer
})

export const setupStore = () =>{
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(userApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
