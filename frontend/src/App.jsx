import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
// import { io } from 'socket.io-client';

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
    <div>
      {isLoggedIn ? (
        <Dashboard
          setisLoggedIn={setisLoggedIn}
          setUserId={setUserId}
          userId={userId}
        />
      ) : (
        <Login
          setisLoggedIn={setisLoggedIn}
          setIsRegisterOpen={setIsRegisterOpen}
          isRegisterOpen={isRegisterOpen}
          setUserId={setUserId}
          userId={userId}
        />
      )}
    </div>
  );
};

export default App;
