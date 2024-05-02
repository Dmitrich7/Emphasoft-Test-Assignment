import React, {FC, useState} from 'react';
import styles from "./Modal.module.scss"
import {IPostUser} from "../../models/IPostUser";
import {userApi} from "../../services/UserService";
import {IUser} from "../../models/IUser";

interface IModalProps{
    setModalActive: (arg0: boolean)=>void;
    currentItem?: IUser;
}

const Modal: FC<IModalProps> = (props) => {

    const defaultData:IPostUser = {
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        is_active: false,
    }

    const {
        setModalActive,
        currentItem,
    }=props;
    const [patchUser] = userApi.usePatchUserMutation();
    const [postUser] = userApi.usePostUserMutation();
    const [usernameDirty,setUsernameDirty] = useState(false);
    const [passwordDirty,setPasswordDirty] = useState(false);
    const [usernameError,setUsernameError] = useState("Имя пользователя не может быть пустым");
    const [passwordError,setPasswordError] = useState("Пароль не может быть пустым");
    const [formData, setFormData] = useState<IPostUser>(currentItem??defaultData)

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
    const handleSubmit = async (newUser: IPostUser,e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const userId = currentItem?.id??-1;
        if (currentItem!=undefined){
            await patchUser({userId,newUser})
        }else{
            await postUser(newUser)
        }
        setModalActive(false)
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
        <div className={styles.modalContent}>
            <form id="itemForm" onSubmit={(e)=>handleSubmit(formData,e)}>
                <div className={styles.formGroup}>
                    <label className={styles.headLabel}>Добавить нового пользователя</label>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Имя пользователя</label>
                    <input onBlur={e=>blurHandler(e)} className={styles.input} type="text" name="username" placeholder={currentItem?.username} onChange={handleChange}/>
                    {(usernameDirty && usernameError) && <div className={styles.errorMessage}>{usernameError}</div>}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Имя</label>
                    <input
                        className={styles.input} type="text" name="first_name" placeholder={currentItem?.first_name} onChange={handleChange}/>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Фамилия</label>
                    <input className={styles.input} type="text" name="last_name" placeholder={currentItem?.last_name} onChange={handleChange}/>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Пароль</label>
                    <input onBlur={e=>blurHandler(e)} className={styles.input} name="password" placeholder={currentItem?.password} onChange={handleChange}/>
                    {(passwordDirty && passwordError) && <div className={styles.errorMessage}>{passwordError}</div>}
                </div>
                <div className={styles.buttonGroup}>
                    <button onClick={()=>setModalActive(false)} type="button" className={styles.cancelButton}>Отменить</button>
                    <button type="submit" className={styles.confirmButton}>Подтвердить</button>
                </div>
            </form>
        </div>
    );
};

export default Modal;
