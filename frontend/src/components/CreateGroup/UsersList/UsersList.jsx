import styles from './UsersList.module.css';
import { useState } from 'react';


export default function UsersList(){
    //Niz naziv usera koji su već dodani za stvaranje nove grupe
    const [users, setUsers] = useState(['Me']); 

    function removeUser(){

    }

    users.map((user) => {
        return <li className={styles.user}>{user}</li>
    })
}