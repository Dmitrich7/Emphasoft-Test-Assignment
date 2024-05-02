import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes} from "./PublicRoutes/PublicRoutes";
import AuthCheck from "./utils/AuthCheck";
import {privateRoutes} from "./PrivateRoutes/PrivateRoutes";

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {Object.values(publicRoutes).map(({element, path}) => (
                    <Route
                        key={path}
                        path={path}
                        element={(
                            <div>
                                {element}
                            </div>
                        )}
                    />
                ))}
                <Route element={<AuthCheck/>}>
                    {Object.values(privateRoutes).map(({element, path}) => (
                        <Route
                            key={path}
                            path={path}
                            element={(
                                <div>
                                    {element}
                                </div>
                            )}
                        />
                    ))}
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
