export enum AppRoutes{
    LOGIN = 'login',
    MAIN = 'main',
    ERROR = 'error'
}

export const RoutePath: Record<AppRoutes,string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.ERROR]: '/*',
}
