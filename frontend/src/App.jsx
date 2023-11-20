// App.jsx
import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import backgroundImage from './assets/bg.jpg';
import './App.module.css'; // Import your CSS file if using external styles

const App = () => {
  const styles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // Other background properties
  };

  return (
    <div style={styles}>
      <Dashboard />
      {/* Other components and content go here */}
    </div>
  );
};

export default App;
