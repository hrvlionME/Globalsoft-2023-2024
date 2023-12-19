// ResetPassword.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ResetPassword.module.css';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
    try {
      // Implement your API call to reset the password with resetToken and newPassword
      // For simplicity, let's assume there's an API function resetPassword
      // const response = await resetPassword(resetToken, newPassword);

      // Display success message or redirect to login page
      // For simplicity, we'll just log a success message here
      console.log('Password reset successfully!');
    } catch (error) {
      console.error('Error resetting password:', error);
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

      <button className={styles.button} onClick={handleResetPassword}>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
