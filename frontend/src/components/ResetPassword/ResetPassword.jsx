import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ResetPassword.module.css';

const replaceTildesWithDots = (token) => {
  // Replace tildes with dots before decoding
  return token.replace(/~/g, '.');
};

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('ResetPassword component mounted!');
    console.log('Modified Token:', resetToken);
    const originalToken = replaceTildesWithDots(resetToken);
    console.log('Original Token:', originalToken);
  }, [resetToken]);

  const resetPassword = async () => {
    const originalToken = replaceTildesWithDots(resetToken);

    // Make an API call to reset the password
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
      console.log(data.message); // Log a success message or handle as needed
    } else {
      console.error('Error resetting password:', data.message);
      setError('Error resetting password. Please try again.'); // Display error message to the user
    }
  };

  return (
    <div className={styles['reset-password-container']}>
      <h2>Reset Password</h2>
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

      {error && <div className={styles['error-message']}>{error}</div>}

      <button className={styles.button} onClick={resetPassword}>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;








