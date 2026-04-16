import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';

import ManagerDashboard from './pages/manager/Dashboard';
import ManagerOrders from './pages/manager/Orders';
import ManagerClients from './pages/manager/Clients';

import AdminDashboard from './pages/admin/Dashboard';
import AdminCatalog from './pages/admin/Catalog';
import AdminSettings from './pages/admin/Settings';

import SysadminDashboard from './pages/sysadmin/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/favorites" element={<CartPage />} />
            <Route path="/delivery" element={<HomePage />} />
            <Route path="/payment" element={<HomePage />} />
            <Route path="/warranty" element={<HomePage />} />
            <Route path="/faq" element={<HomePage />} />
            <Route path="/about" element={<HomePage />} />
            <Route path="/contacts" element={<HomePage />} />

            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/manager/orders" element={<ManagerOrders />} />
            <Route path="/manager/clients" element={<ManagerClients />} />
            <Route path="/manager/products" element={<CatalogPage />} />
            <Route path="/manager/messages" element={<ManagerDashboard />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/catalog" element={<AdminCatalog />} />
            <Route path="/admin/orders" element={<ManagerOrders />} />
            <Route path="/admin/clients" element={<ManagerClients />} />
            <Route path="/admin/marketing" element={<AdminDashboard />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            <Route path="/sysadmin" element={<SysadminDashboard />} />
            <Route path="/sysadmin/files" element={<SysadminDashboard />} />
            <Route path="/sysadmin/database" element={<SysadminDashboard />} />
            <Route path="/sysadmin/servers" element={<SysadminDashboard />} />
            <Route path="/sysadmin/monitoring" element={<SysadminDashboard />} />
            <Route path="/sysadmin/security" element={<SysadminDashboard />} />
            <Route path="/sysadmin/settings" element={<SysadminDashboard />} />

            <Route path="*" element={<HomePage />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
