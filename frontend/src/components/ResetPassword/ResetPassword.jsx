import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ResetPassword.module.css';
import { useNavigate } from "react-router-dom";

const replaceTildesWithDots = (token) => {
  return token.replace(/~/g, '.');
};

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const resetPassword = async () => {
    const originalToken = replaceTildesWithDots(resetToken);

    const response = await fetch('http://localhost:4000/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resetToken: originalToken,
        newPassword,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log(data.message); 
      navigate("/");
    } else {
      console.error('Error resetting password:', data.message);
      setError('Error resetting password. Please try again.'); 
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      <h2 className={styles.title}>Reset Password</h2>
      <label className={styles.label} htmlFor="newPassword">
        New Password:
      </label>
      <input
        className={styles.input}
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      {error && <div className={styles.errorMessage}>{error}</div>}

      <button className={styles.button} onClick={resetPassword}>
        Save New Password
      </button>
    </div>
  );
};

export default ResetPassword;








