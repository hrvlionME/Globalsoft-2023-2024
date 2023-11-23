import React, { useState } from "react";
import { Validation } from "./Validation";
export function Register() {
    const [values, setValues] = useState({
        text: '',
        email: '',
        password: ''
    })
const [errors, setErrors] = useState({})
function handleInputChange(event) {
    const newObj = {...values, [event.target.text]: event.target.values}
    setValues(newObj)
}
   function handleValidation(event) {
        event.preventDefault();
        setErrors(Validation(values));
   }
    return (
             <div className="big-container">
                <div className="title">Registration</div>
                <div className="auth-form-container">
                    <form className="register-form" onSubmit={handleValidation}>
                        <label htmlFor='text'>Full Name </label>
                         <input type="text" placeholder='Full Name' id="username" name="name" onChange={handleInputChange} />
                         {errors.text && <p style={{color:"red"}}>{errors.text}</p>}  
                        <label htmlFor='email'>Email </label>
                        <input type="email" placeholder='example@gmail.com' id="email" name="email" onChange={handleInputChange}/>
                        {errors.email && <p style={{color:"red"}}>{errors.email}</p>} 
                        <label htmlFor='password'>Password </label>
                        <input type="pasword" placeholder='******' id="password" name="password" onChange={handleInputChange}/>
                        {errors.password && <p style={{color:"red"}}>{errors.password}</p>} 
                       <div>
                            <button type="submit">Register </button>
                            <label className="text">Already have an account? </label>
                            <button>LogIn</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
