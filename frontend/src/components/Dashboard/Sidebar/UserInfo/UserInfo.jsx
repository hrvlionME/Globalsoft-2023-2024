import React, { useState, useEffect } from 'react';
<<<<<<<< HEAD:frontend/src/components/Sidebar/UserInfo/UserInfo.jsx
import styles from './UserInfo.module.css';
========
import './UserInfo.css';
>>>>>>>> b01ceb7 (changed components structure):frontend/src/components/Dashboard/Sidebar/UserInfo/UserInfo.jsx

const UserInfo = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:4000/user-info/${id}`
        );
        if (!response.ok) {
          throw new Error('Error fetching user info');
        }
        const userData = await response.json();
        setUserInfo(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserInfo(userId);
  }, [userId]);

  if (loading) {
    return <p>Loading User Info...</p>;
  }

  if (error) {
    return <p>User Info Error: {error}</p>;
  }

  return (
    <div className={styles.userInfoContainer}>
      <img className={styles.userAvatar} src={userInfo.avatar} alt="User Avatar" />
      <p>{userInfo.email}</p>
    </div>
  );
};

export default UserInfo;
