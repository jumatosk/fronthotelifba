import React from 'react';
import Routes from './routes/root';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from 'react-router-dom';
import history from './routes/history';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <AuthProvider>
      <ToastContainer autoClose={3000} />
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
