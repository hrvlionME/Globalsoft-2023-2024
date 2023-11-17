import styles from './UsersList.module.css';
import { useState, useEffect } from 'react';


export default function UsersList(){
    //Niz naziv usera koji su već dodani za stvaranje nove grupe
    const userArray = ["AAA"];
    const [users, setUsers] = useState(userArray); 

    //Niz usera koji nisu dodani
    const user2Array = ["Test1", "Test2", "Test3", "Test4"];
    const [users2, setUsers2] = useState(user2Array);
    
    /* useEffect(() => {
        fetch("http://localhost:8000/")
          .then((res) => res.json())
          .then((data) => console.log(data.message)) //dodati data u niz users2
      }, []);
    */

    function removeUser(userToDelete){
        setUsers((current) => (current.filter((user) => {return user !== userToDelete})));
        setUsers2((current) => [...current, userToDelete]);
    }

    function addUser(userToAdd){
        setUsers2((current) => (current.filter((user) => {return user !== userToAdd})));
        setUsers((current) => [...current, userToAdd]);
    }

    return (
        <div>
            <ul> 
                    {/*Hardcoding "Me" as a value because we can't remove ourselves*/}
                    <li className={styles.user}>
                        <span>Me</span>
                    </li>
                {users.map((user, index) => (
                    // Setting "index" as key because name and age can be repeated, It will be better if you assign uniqe id as key
                    <li className={styles.user} key={index}>
                        <span>{user}</span>
                        <button className={styles.Remove} onClick={() => removeUser(user)}>X</button>  {/*treba ubacit X kao mogucnost brisanja ubacenog korisnika*/}
                    </li>
                ))}
            </ul>
            <ul>  
                {users2.map((user, index) => (       
                //Ovdje bi trebao ic niz usera koji nije u gornjem nizu, odnosno ako smo dodali usera gore treba ga izbacit dole
                <li className={styles.userInfo} key={index}>
                    <img src="" alt="" />  {/*profilna za usera*/}
                    <span>{user}</span>
                    <button className={styles.Add} onClick={() => addUser(user)}>+</button>
                </li>
                ))}

            </ul>
        </div>
    )
}