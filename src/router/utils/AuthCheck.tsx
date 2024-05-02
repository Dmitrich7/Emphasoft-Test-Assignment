import {Navigate, Outlet} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux";

const AuthCheck = () => {
    const {isLoggedIn} = useAppSelector(state => state.persistedAuthReducer)
    return (
        isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
    );
};

export default AuthCheck;
