import CreateGroupScreen from '../CreateGroupScreen/CreateGroupScreen';
import styles from './CreateGroupButton.module.css';
import { useState } from 'react';

export default function CreateGroupButton(){
    const [isClicked, setIsClicked] = useState(false);

    function closeWindow(){
        setIsClicked(false);
    }

    return (
    <div>
        <button className={styles.CreateButton} onClick={() => {setIsClicked(true)}}>+ New Group</button>
        {isClicked  ?  <div><CreateGroupScreen closeWindow={closeWindow}/></div> : <div></div>}
    </div>
    )
}