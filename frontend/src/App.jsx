import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
// import { io } from 'socket.io-client';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.module.css';

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  // const [socket, setSocket] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  // useEffect(() => {
  //   const socket = io('http://localhost:4000');
  //   setSocket(socket);
  //   socket.emit('ping');
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <Router>
      <Routes>
        {/* Route for the password reset page */}
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        {/* Default route for login or dashboard */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Dashboard setisLoggedIn={setisLoggedIn} setUserId={setUserId} userId={userId} />
            ) : (
              <Login
                setisLoggedIn={setisLoggedIn}
                setIsRegisterOpen={setIsRegisterOpen}
                isRegisterOpen={isRegisterOpen}
                setUserId={setUserId}
                userId={userId}
              />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
