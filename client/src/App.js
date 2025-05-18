import React from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import BrowserRouter here
import Layout from './Components/Layout/Layout';
import Dashboard from './Pages/Dashboard';
import Messages from './Pages/Messages';
import Login from './Pages/Login';

function App() {
  return (
    // 

    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </Layout>
  );
}

export default App;
