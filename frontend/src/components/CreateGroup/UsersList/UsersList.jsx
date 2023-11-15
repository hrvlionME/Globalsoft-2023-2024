import styles from './UsersList.module.css';
import { useState } from 'react';


export default function UsersList(){
    //Niz naziv usera koji su već dodani za stvaranje nove grupe
    const userArray = ["Me", "Test1", "Test2", "Test3", "Test4"];
    const [users, setUsers] = useState(userArray); 
    

    
    function removeUser(){

    }

    return (
        <div>
            <ul> 
                {users.map((user, index) => (
                    // Setting "index" as key because name and age can be repeated, It will be better if you assign uniqe id as key
                    <li className={styles.user} key={index}>
                        <span>{user}</span>
                        <button className={styles.Remove}>X</button>  {/*treba ubacit X kao mogucnost brisanja ubacenog korisnika*/}
                    </li>
                ))}
            </ul>
            <ul>  
                {users.map((user, index) => (       
                //Ovdje bi trebao ic niz usera koji nije u gornjem nizu, odnosno ako smo dodali usera gore treba ga izbacit dole
                <li className={styles.userInfo} key={index}>
                    <img src="" alt="" />  {/*profilna za usera*/}
                    <span>{user}</span>
                    <button className={styles.Add}>+</button>
                </li>
                ))}

            </ul>
        </div>
    )
}