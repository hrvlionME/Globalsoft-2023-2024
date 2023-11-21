import styles from './UsersList.module.css';
import Search from '../Search/Search';
import { useState, useEffect } from 'react';
import MyImage from './avatar.jpg';


export default function UsersList(){
    const userArray = []; 
    /* for(let i = 0; i < 4; i++){
        userArray.push("Test" + i);
    }*/
    const userData = {
        1: { id: 1, name: 'Hrvoje'},
        2: { id: 2, name: 'Mario'},
        3: { id: 3, name: 'Penda'},
      };
    const [users, setUsers] = useState(userArray); 

    /*const user2Array = [];
    for(let i = 0; i < 100; i++){
        user2Array.push("Test" + i);
    }*/
    const user2Array = Object.values(userData).map(user => user.name);
    const [users2, setUsers2] = useState(user2Array);
    const [inputText, setInputText] = useState('')
    /*
     useEffect(() => {
        fetch("http://localhost:4000/")
          .then((res) => res.json())
          .then((data) => console.log(data.message))
      }, []);
*/
    function removeUser(userToDelete){
        setUsers((current) => (current.filter((user) => {return user !== userToDelete})));
        setUsers2((current) => [...current, userToDelete]);
        users2.sort();
    }

    function addUser(userToAdd){
        setUsers2((current) => (current.filter((user) => {return user !== userToAdd})));
        setUsers((current) => [...current, userToAdd]);
        users2.sort();
    }

    function handleChange(e){
        setInputText(e.target.value);
        console.log(inputText);
    }

    return (
        <div>
            <ul className={styles.selected}> 
                    <li className={styles.user}>
                        <span>Me</span>
                    </li>
                {users.map((user, index) => (
                    <li className={styles.user} key={index}>
                        <span>{user}</span>
                        <button className={styles.Remove} onClick={() => removeUser(user)}>X</button>
                    </li>
                ))}
            </ul>
            <Search handleChange={handleChange}/>
            <ul className={styles.userBox}>  
                {users2.map((user, index) => (  
                inputText.length > 0 ?
                <div>
                    {user.toLowerCase().startsWith(inputText.toLowerCase()) ?
                <li className={styles.userInfo} key={index}>
                    <img src="/avatar.jpg" alt="" />  {/*profilna za usera*/}
                    <span>{user}</span>
                    <button className={styles.Add} onClick={() => addUser(user)}>+</button>
                </li>
                : <div></div>}
                </div>
                : <li className={styles.userInfo} key={index}>
                    <img src={MyImage} alt="" /> 
                    <span>{user}</span>
                    <button className={styles.Add} onClick={() => addUser(user)}>+</button>
                </li>
                ))}

            </ul>
            <button className={styles.close}>Create</button>
        </div>
    )
}