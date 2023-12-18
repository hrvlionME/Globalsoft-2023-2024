import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import { io } from 'socket.io-client';

import './App.module.css';

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io('http://localhost:4000');
    setSocket(socket);
    socket.emit('ping');
    return () => {
      socket.disconnect();
    };
  }, []);
  return <div>{isLoggedIn ? <Dashboard /> : <Login />}</div>;
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(true);

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard setisLoggedIn={setisLoggedIn} />
      ) : (
        <Login
          setisLoggedIn={setisLoggedIn}
          setIsRegisterOpen={setIsRegisterOpen}
          isRegisterOpen={isRegisterOpen}
        />
      )}
    </div>
  );
};

export default App;
