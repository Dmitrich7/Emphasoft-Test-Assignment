import {RouteProps} from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import {AppRoutes, RoutePath} from "./publicRoutesConfig";

export const publicRoutes: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage/>
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage/>
    },
    [AppRoutes.ERROR]: {
        path: RoutePath.error,
        element: <ErrorPage/>
    }
}
