import React, {useState} from 'react';
import styles from './MainPage.module.scss'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {authSlice} from "../../store/reducers/AuthSlice";

const MainPage = () => {
    const navigate = useNavigate();
    const {logOut} = authSlice.actions;
    const {isLoggedIn} = useAppSelector(state => state.persistedAuthReducer);
    const dispatch = useAppDispatch();


    return (
        <div className={styles.pageContainer}>
            <span className={styles.welcome}>Welcome</span>
            {isLoggedIn?
                <div className={styles.buttonGroup}>
                    <span className={styles.buttons} onClick={()=>navigate('/home')}>Home</span>
                    <span className={styles.buttons} onClick={()=>dispatch(logOut())}>Logout</span>
                </div>
                :
                <div className={styles.buttonGroup}>
                    <span onClick={()=>navigate('/login')} className={styles.buttons}>Login</span>
                </div>
            }
        </div>
    );
};

export default MainPage;
