import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import { io } from 'socket.io-client';

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
};

export default App;
