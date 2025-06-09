import React from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import BrowserRouter here
import Layout from './Components/Layout/Layout';
import Dashboard from './Pages/top-navigation/Dashboard';
import Messages from './Pages/Messages';
import SendMassage from './Pages/SendMassage';
import Contacts from './Pages/Contact';
import Login from './Pages/login-signup/Login';
import AddUser from './Pages/AddUser';
import CompanyUpdate from './Pages/top-navigation/CompanyUpdate';
import ManagementOperationPage from './Pages/top-navigation/ManagementOpration';

function App() {
  return (
    // 

    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/send-message" element={<SendMassage />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/add-users" element={<AddUser />} />
        <Route path="/comp-info" element={<CompanyUpdate />} />
        <Route path="/mg-opr" element={<ManagementOperationPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
