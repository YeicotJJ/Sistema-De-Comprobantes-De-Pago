// pages/routes/RoutesAdmin.jsx
import { Routes, Route } from 'react-router-dom';
import HomeRoutes from '@/pages/home/HomeRoutes';
import BoletasRoutes from '@/pages/boletas/BoletasRoutes';
import FacturasRoutes from '@/pages/facturas/FacturasRoutes';
import Layout from '@/layout/Layout';
import ConfigurationRoutes from '../pages/configuration/ConfigurationRoutes';

export default function RoutesAdmin() {
  return (
    <Routes>
      <Route path="/*" element={<Layout><HomeRoutes /></Layout>} />
      <Route path="/boletas/*" element={<Layout><BoletasRoutes /></Layout>} />
      <Route path="/facturas/*" element={<Layout><FacturasRoutes /></Layout>} />
      <Route path="/configuration/*" element={<Layout><ConfigurationRoutes /></Layout>} />
    </Routes>
  );
}
