import React, { useState, useEffect } from 'react';
import './UserInfo.css';
import avatarImage from '../../assets/guitar.png';

const UserInfo = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/user-info/${userId}`
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

    fetchUserInfo();
  }, [userId]);

  if (loading) {
    return <p>Loading User Info...</p>;
  }

  if (error) {
    return <p>User Info Error: {error}</p>;
  }

  return (
    <div className="user-info-container">
      <img className="user-avatar" src={userInfo.avatar} alt="User Avatar" />
      <p className="user-email">{userInfo.email}</p>
    </div>
  );
};

export default UserInfo;
