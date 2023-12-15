// App.jsx
import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';

import './App.module.css'; // Import your CSS file if using external styles
import Login from './components/Login/Login';

const App = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const styles = {
    backgroundColor: 'rgb(23, 26, 36)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // Other background properties
  };

  return (
    <div style={styles}>
      {isLoggedIn ? <Dashboard /> : <Login />}

      {/* Other components and content go here */}
    </div>
  );
};

export default App;
