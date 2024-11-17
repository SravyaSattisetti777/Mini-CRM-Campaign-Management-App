import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Header from './pages/Header';
import CustomerList from './pages/Customer/CustomerList';
import AddCustomer from './pages/Customer/AddCustomer';
import EditCustomer from './pages/Customer/EditCustomer';
import OrderList from './pages/Order/OrderList';
import AddOrder from './pages/Order/AddOrder';
import EditOrder from './pages/Order/EditOrder';
import AudienceList from './pages/Audience/AudienceList';
import AddAudience from './pages/Audience/AddAudience';
import EditAudience from './pages/Audience/EditAudience';
import AudienceView from './pages/Audience/AudienceView';
import CampaignHistory from "./pages/Campaign/CampaignHistory";
import CampaignView from "./pages/Campaign/CampaignView";
import AddCampaign from './pages/Campaign/AddCampaign';
import MessagesList from './pages/Message/MessageList';
import AddMessage from './pages/Message/AddMessage';
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/create" element={<AddCustomer />} />
        <Route path="/customers/edit/:id" element={<EditCustomer />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/create" element={<AddOrder />} />
        <Route path="/orders/edit/:id" element={<EditOrder />} />
        <Route path="/audience" element = {<AudienceList />} />
        <Route path="/audiences/create" element = {<AddAudience />} />
        <Route path="/audiences/edit/:id" element={<EditAudience />} />
        <Route path="/audiences/:id" element = {<AudienceView />} />
        <Route path="/campaign" element = {<CampaignHistory />} />
        <Route path="/campaigns/create" element = {<AddCampaign />} />
        <Route path="/campaigns/:id" element = {<CampaignView />} />
        <Route path="/messages" element = {<MessagesList />} />
        <Route path="/messages/send" element = {<AddMessage />} />
        <Route path="*" element = {<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;