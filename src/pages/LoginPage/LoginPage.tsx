import React, {useState} from 'react';
import {ILoginUser, login} from "../../store/reducers/ActionCreators";
import {useAppDispatch} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import styles from "./LoginPage.module.scss"

const LoginPage = () => {
    const [usernameDirty,setUsernameDirty] = useState(false);
    const [passwordDirty,setPasswordDirty] = useState(false);
    const [usernameError,setUsernameError] = useState("Имя пользователя не может быть пустым");
    const [passwordError,setPasswordError] = useState("Пароль не может быть пустым");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const defaultData:ILoginUser = {
        username: "",
        password: ""
    }
    const [formData, setFormData] = useState<ILoginUser>(defaultData)
    const handleChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
        switch (e.target.name){
            case "username":
                const usernameRe = /^[\w.@+-]+$/
                if (!usernameRe.test(String(e.target.value).toLowerCase())||e.target.value.length>150){
                    setUsernameError('Некорректное имя пользователя')
                    if (!e.target.value){
                        setUsernameError("Имя пользователя не может быть пустым")
                    }
                }else {
                    setUsernameError('')
                }
                break
            case "password":
                const passwordRe = /^(?=.*[A-Z])(?=.*\d).{8,}$/
                if (!passwordRe.test(String(e.target.value))||e.target.value.length>128){
                    setPasswordError('Некорректный пароль')
                    if (!e.target.value){
                        setPasswordError("Пароль не может быть пустым")
                    }
                }else {
                    setPasswordError('')
                }
                break
        }
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        dispatch(login(formData)).then(()=>navigate("/home"));
    }
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>)=>{
        switch (e.target.name){
            case "username":
                setUsernameDirty(true)
                break
            case "password":
                setPasswordDirty(true)
                break
        }
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <span className={styles.span}>Log In</span>
                <input
                    onBlur={e => blurHandler(e)}
                    name='username'
                    placeholder="username"
                    className={styles.input}
                    onChange={handleChange}
                />
                {(usernameDirty && usernameError) && <div className={styles.errorMessage}>{usernameError}</div>}
                <input
                    onBlur={e => blurHandler(e)}
                    name='password'
                    type="password"
                    placeholder="password"
                    className={styles.input}
                    onChange={handleChange}
                />
                {(passwordDirty && passwordError) && <div className={styles.errorMessage}>{passwordError}</div>}
                <button type="submit" className={styles.button}>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
