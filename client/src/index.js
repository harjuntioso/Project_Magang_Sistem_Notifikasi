import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';  // This is the main Router
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';
import Login from './Pages/login-signup/Login';

import ErrorBoundary from './Components/common/ErrorBoundary';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

//<Route path="/login" element={<Login />} />

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>  {/* Only wrap once here */}
          <AuthProvider>
            <MantineProvider withGlobalStyles withNormalizeCSS>
              <Notifications />
              <App />
            </MantineProvider>
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
