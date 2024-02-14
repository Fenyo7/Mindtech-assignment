import React from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App: React.FC = () => {
  return (
    <div>
      <Login />
      {/* Uncomment below line to test register component */}
      <Register />
    </div>
  );
};

export default App;
