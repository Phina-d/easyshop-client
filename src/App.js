import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsappButton from './components/WhatsappButton';

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductGallery from "./pages/ProductGallery";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import ContactAvis from "./pages/ContactAvis";
import AdminProduits from "./pages/AdminProduits";
import PrivateRouteAdmin from "./routes/PrivateRouteAdmin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomerList from "./pages/admin/CustomerList";
import OrderList from "./pages/admin/OrderList";
import UserList from "./pages/admin/UserList";
import EditUser from "./pages/EditUser";
import AddUser from './pages/admin/AddUser'; // ✅ Bon chemin
import OrdersToConfirm from "./pages/OrdersToConfirm";
import ConfirmedClients from "./pages/ConfirmedClients";
import ProspectList from "./pages/ProspectList";
import NotFound from "./pages/NotFound"; // ajuste le chemin selon ton projet
import Unauthorized from "./pages/Unauthorized"; // ← crée-la si elle n'existe pas encore
import FAQ from "./pages/FAQ";
import Livraison from "./pages/Livraison";
import Retours from "./pages/Retours";
import CGV from "./pages/CGV";
import ScrollToTopButton from "./components/ScrollToTopButton";
import GoToCartButton from "./components/GoToCartButton";
import SendTestEmail from "./pages/SendTestEmail";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
         <ToastContainer />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/produits" element={<ProductGallery />} />
            <Route path="/produits/:id" element={<ProductDetails />} />
            <Route path="/panier" element={<Cart />} />
             <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<ContactAvis />} />
            <Route path="/admin/produits" element={<PrivateRouteAdmin><AdminProduits /></PrivateRouteAdmin>} />
            <Route path="/admin" element={<PrivateRouteAdmin><AdminDashboard /></PrivateRouteAdmin>} />
            <Route path="/admin/clients" element={<CustomerList />} />
            <Route path="/admin/customers" element={<PrivateRouteAdmin><CustomerList /></PrivateRouteAdmin>} />
            <Route path="/admin/users" element={<PrivateRouteAdmin><UserList /></PrivateRouteAdmin>} />
            <Route path="/admin/utilisateurs" element={<PrivateRouteAdmin><UserList /></PrivateRouteAdmin>} />
            <Route path="/admin/utilisateurs/:id/edit" element={<EditUser />} />
            <Route path="/admin/utilisateurs/ajouter" element={<AddUser />} />

            <Route path="/admin/commandes" element={<OrderList />} />
            <Route path="/admin/users/:id/edit" element={<EditUser />} />
            <Route path="/clients" element={<ConfirmedClients />} />
            <Route path="/prospects" element={<ProspectList />} />
            
            {/* ✅ Closer / Clients / Prospects */}
            <Route path="/orders" element={<PrivateRouteAdmin><OrdersToConfirm /></PrivateRouteAdmin>} />
            <Route path="/clients" element={<PrivateRouteAdmin><ConfirmedClients /></PrivateRouteAdmin>} />
            <Route path="/prospects" element={<PrivateRouteAdmin><ProspectList /></PrivateRouteAdmin>} />

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          {/* autres routes */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/shipping" element={<Livraison />} />
        <Route path="/returns" element={<Retours />} />
        <Route path="/terms" element={<CGV />} />
          <Route path="/tester-email" element={<SendTestEmail />} />
          </Routes>
        </main>
        <GoToCartButton />
        <ScrollToTopButton />
        <Footer />
        <WhatsappButton />
      </div>
    </Router>
  );
}
