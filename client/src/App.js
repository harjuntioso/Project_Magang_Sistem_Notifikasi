import React from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import BrowserRouter here
import Layout from './Components/Layout/Layout';
import Dashboard from './Pages/Dashboard';
import Messages from './Pages/Messages';
import SendMassage from './Pages/SendMassage';
import Contacts from './Pages/Contact';
import Login from './Pages/Login';

function App() {
  return (
    // 

    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/send-massage" element={<SendMassage />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </Layout>
  );
}

export default App;
