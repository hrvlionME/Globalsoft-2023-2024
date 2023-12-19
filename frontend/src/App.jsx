import React, { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.module.css';

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

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
