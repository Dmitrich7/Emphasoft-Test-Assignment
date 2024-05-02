import React, {FC} from 'react';
import styles from "./UserItem.module.scss"

interface UserItemProps{
    firstName: string;
    lastName: string;
    lastLogin: string;
}

const UserItem: FC<UserItemProps> = (props) => {
    const {
        firstName,
        lastName,
        lastLogin
    } = props

    return (
        <div className={styles.userCard}>
            <span>
                {firstName}
            </span>
            <span>
                {lastName}
            </span>
            <span>
                {lastLogin}
            </span>
        </div>
    );
};

export default UserItem;
