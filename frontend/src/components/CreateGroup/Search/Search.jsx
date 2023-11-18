import styles from './Search.module.css';

export default function Search(props){
    
    

    return(
        <div>
            <input type="text" placeholder="Search" onChange={props.handleChange}/>
        </div>
    )
}