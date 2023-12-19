import CreateGroupScreen from '../CreateGroupScreen/CreateGroupScreen';
import styles from './CreateGroupButton.module.css';
import { useState } from 'react';

export default function CreateGroupButton(props){
    const [isClicked, setIsClicked] = useState(false);

    function closeWindow(){
        setIsClicked(false);
    }

    return (
    <div>
        <button className={styles.CreateButton} onClick={() => {setIsClicked(true)}}>Add New Chat</button>
        {isClicked  ?  <div><CreateGroupScreen reload={props.reload} closeWindow={closeWindow}/></div> : <div></div>}
    </div>
    )
}