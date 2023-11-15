import UsersList from "../UsersList/UsersList";
import styles from './CreateGroupScreen.module.css';

// Ovaj ekran bi se pojavio pri pritisku CreateGroupButton buttona
export default function CreateGroupScreen(props){

    return (
    <div className={styles.container}>
        <button className={styles.close} onClick={props.closeWindow}>Close</button>
        <UsersList />
        
    </div>)
    ;
}