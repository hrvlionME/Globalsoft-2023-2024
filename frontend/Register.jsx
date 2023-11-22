import React, { useState } from "react";

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
} 
    return (
         <div className="big-container">
            <div className="title">Registration</div>
            <div className="auth-form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor='text'>Full Name </label>
                    <input type="text" placeholder='Full Name' id="username" name="name" />
                    <label htmlFor='email'>Email </label>
                    <input type="email" placeholder='example@gmail.com' id="email" name="email" />
                    <label htmlFor='password'>Password </label>
                    <input type="pasword" placeholder='******' id="password" name="password"/>
                    <div>
                        <button>Register </button>
                        <label className="text">Already have an account? </label>
                        <button>LogIn</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
