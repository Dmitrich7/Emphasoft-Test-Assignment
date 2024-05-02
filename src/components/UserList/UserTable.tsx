import React, {useEffect, useState} from 'react';
import {userApi} from "../../services/UserService";
import styles from "./UserTable.module.scss"
import {IUser} from "../../models/IUser";
import Portal from "../Portal/Portal";
import {IPostUser} from "../../models/IPostUser";
import Modal from "../Modal/Modal";

const UserTable = () => {
    const {data: users} = userApi.useGetUsersQuery();
    const [deleteUser] = userApi.useDeleteUserMutation()
    const [searchQuery,setSearchQuery] = useState("");
    const [selectedSort, setSelectedSort] = useState('none')
    const [sortedUsers,setSortedUsers] = useState<IUser[]>();
    const [modalActive,setModalActive] = useState(false);
    const [currentItem,setCurrentItem] = useState<IUser>();

    useEffect(()=>{
        setSortedUsers(users)
    },[users])

    const sortTableItems = (sort: string) => {
        setSelectedSort(sort);
        switch (sort) {
            case "ascending":
                if(Array.isArray(users)){
                    setSortedUsers([...users].sort((a, b) => a.id > b.id ? 1 : -1));
                }
                break;
            case "descending":
                if(Array.isArray(users)){
                    setSortedUsers([...users].sort((a, b) => a.id < b.id ? 1 : -1));
                }
                break;
            default:
                break
        }
    };
    const handleDelete = async (userId:number)=>{
        await deleteUser(userId)
    }
    const handleModalEdit = (item: IUser)=>{
        setCurrentItem(item)
        setModalActive(true);
    }
    const handleModalAdd = () =>{
        setModalActive(true);
    }
    return (
        <div className={styles.container}>
            <div className={styles.userList}>
                <div className={styles.tableNav}>
                    <label>Сортировать id по
                        <select onChange={(e)=>sortTableItems(e.target.value)} className={styles.sortList}>
                            <option value="none"></option>
                            <option value="ascending">Возрастанию</option>
                            <option value="descending">Убыванию</option>
                        </select>
                    </label>
                    <button onClick={handleModalAdd} className={styles.addUserButton}>Добавить пользователя</button>
                    <input
                        className={styles.searchBox}
                        type="search"
                        placeholder="Search by username"
                        onChange={(e)=>setSearchQuery(e.target.value)}
                    />
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Actions</th>
                            <th>Username</th>
                            <th>Last login</th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>Is superuser</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {sortedUsers?.filter(item => item.username.includes(searchQuery)).map(item=>(
                            <tr key={item.id} className={styles.recordContainer}>
                                <td>{item.id}</td>
                                <td className={styles.buttonTd}>
                                    <button onClick={()=>handleModalEdit(item)} className={styles.changeButton}/>
                                    <button onClick={()=>handleDelete(item.id)} className={styles.deleteButton}/>
                                </td>
                                <td>{item.username}</td>
                                <td>{item.last_login}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.is_superuser}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalActive?
                <Portal className={styles.portal}>
                    <Modal
                        setModalActive={setModalActive}
                        currentItem={currentItem}
                    />
                </Portal>
                :
                null
            }
        </div>
    );
};

export default UserTable;
