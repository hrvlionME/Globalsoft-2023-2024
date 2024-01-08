import styles from './UsersList.module.css';
import Search from '../Search/Search';
import { useState, useEffect } from 'react';

export default function UsersList(props){
    const [users, setUsers] = useState([]) 
    const [users2, setUsers2] = useState([])
    const [inputText, setInputText] = useState('')
    const [groupName, setGroupName] = useState('')
    const [file, setFile] = useState(null);
    
  
    useEffect(() => {
                  fetch("http://localhost:4000/")
                  .then((res) => res.json())
                  .then((data) => {
                   let user2Array = Object.values(data).map(user => user)
                  /* 
                   const user2Array = []
                   for(let i = 1; i <= 10;  i++){
                    const obj = {
                        name: "Person" + i,
                        ID: i
                    }
                    user2Array.push(obj)
                   }
                   */
                   user2Array.sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
            
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                       
                        return 0;
                    })
                    user2Array = user2Array.filter((user) => user.ID !== props.userId);
                    setUsers2(user2Array)
                    
                })

              }, []);

              function removeUser(userToDelete){
                
                    setUsers((current) => (current.filter((user) => {return user !== userToDelete})));
                    users2.sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
            
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                       
                        return 0;
                    })
                    setUsers2((current) => [...current, userToDelete]);
                   
             
                
            }
        
            function addUser(userToAdd){
                
                    users2.sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
            
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                       
                        return 0;
                    })
                    setUsers2((current) => (current.filter((user) => {return user !== userToAdd})));
                    setUsers((current) => [...current, userToAdd]);
                    
                       
               
            }
    function handleChange(e){
        setInputText(e.target.value);
    }

    function handleGroupName(e){
        setGroupName(e.target.value);
    }

    function handleFileChange(e){
        setFile(e.target.files[0])
    }

    async function createNewGroup(data) {
        const createNewGroupChatResponse = await fetch("http://localhost:4000/createNewGroupChat", {
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(data)
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
        
    }

    async function uploadNewImage() {
        if (file) {
            const formData = new FormData();
            formData.append("image", file);
          
        const uploadResponse = await fetch("http://localhost:4000/uploadImage", {
        method: "POST",
        body: formData,
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.text();
        })
        .then((data) =>  console.log(data))
        .catch((error) => {
            console.error('Error:', error);
            error.response.text().then((text) => {
                console.log('Response text:', text);
            })
        })
        }
    }
    async function CreateGroup(){
        const usersID = Object.values(users).map(user => user.ID)
        usersID.push(props.userId)
        
        const data = {
            name: groupName,
            participants: usersID
        }
  
        
       await createNewGroup(data)
       await uploadNewImage()
       

        props.reload();
        props.closeWindow();
    }

    return (
        <div>
            <ul className={styles.selected}> 
                    <li className={styles.user}>
                        <span className={styles.userSpan}>Me</span>
                    </li>
                {Object.values(users).map((user, index) => (
                    <li className={styles.user} key={index}>
                        {!user.name.startsWith('+') ? 
                        <div>
                            <span>{user.name}</span>
                            <button className={styles.Remove} onClick={() => removeUser(user)}>X</button>
                        </div> :
                        <div>
                            <span>{user.name}</span>
                        </div>} 
                    </li>
                ))}
            </ul>
            <Search handleChange={handleChange}/>
            <ul className={styles.userBox}>  
                {Object.values(users2).map((user, index) => (  
                inputText.length > 0 ?
                <div>
                    {user.name.toLowerCase().startsWith(inputText.toLowerCase()) ?
                <li className={styles.userInfo} key={index}>
                    <img src={user.avatar} alt="" />  {/*profilna za usera*/}
                    <span className={styles.userInfoSpan}>{user.name}</span>
                    <button className={styles.Add} onClick={() => addUser(user)}>+</button>
                </li>
                : <div></div>}
                </div>
                : <li className={styles.userInfo} key={index}>
                    <img className={styles.avatar} src={user.avatar} alt="" /> 
                    <span className={styles.userInfoSpan}>{user.name}</span>
                    <button className={styles.Add} onClick={() => addUser(user)}>+</button>
                </li>
                ))}

            </ul>
            <div className={styles.submit}>
                <label className={styles.uploadLabel}>Upload group avatar image</label>
                <input className={styles.upload} type="file" filename={file}  accept="image/*" onChange={handleFileChange}/>
                <input className={styles.inputSearch} type="text" value={groupName} onChange={handleGroupName} placeholder="Enter group name"/>
                <button className={styles.close} onClick={CreateGroup}>Create</button>
            </div>
        </div>
    )
}