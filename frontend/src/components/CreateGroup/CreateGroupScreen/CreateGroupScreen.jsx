import UsersList from "../UsersList/UsersList";
import styles from './CreateGroupScreen.module.css';

// Ovaj ekran bi se pojavio pri pritisku CreateGroupButton buttona
export default function CreateGroupScreen(){

    return (
    <div className={styles.container}>
        <UsersList />
        <input type="text" placeholder='Search for people to add in group'/>
        
    </div>)
    ;
}