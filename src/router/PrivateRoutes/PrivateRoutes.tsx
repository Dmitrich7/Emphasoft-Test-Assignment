import HomePage from "../../pages/HomePage/HomePage";
import {RouteProps} from "react-router-dom";
import {AppRoutes, RoutePath} from "./privateRoutesConfig";

export const privateRoutes: Record<AppRoutes, RouteProps> = {
    [AppRoutes.HOME]: {
        path: RoutePath.home,
        element: <HomePage/>
    }
}


