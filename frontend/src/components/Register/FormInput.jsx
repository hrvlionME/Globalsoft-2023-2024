import styles from "./FormInput.module.css";
import { useState } from "react";

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const {label, errorMessage, onChange, id, ...inputProps} = props;
   
    const handleFocus = (e)=>{
        setFocused(true);
    };


    return (
        <div className={styles['formInput']}>
            <label>{label}</label>
            <input { ...inputProps } 
            onChange={onChange} 
            onBlur={handleFocus} 
            focused={focused.toString()}
            onFocus={() => inputProps.name==="confirmPass" 
            && setFocused(true)}
            className={styles['register-input']}
            />
            <span className={styles['register-span']}>{errorMessage}</span>
        </div>
    )
} 

export default FormInput;