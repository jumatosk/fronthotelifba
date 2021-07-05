import React from 'react';
import Routes from './routes/root';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from 'react-router-dom';
import history from './routes/history';
import { AuthProvider } from './context/authContext';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <AuthProvider>
      <CookiesProvider>
        <ToastContainer autoClose={3000} />
        <Router history={history}>
          <Routes />
        </Router>
      </CookiesProvider>
    </AuthProvider>
  );
}

export default App;
