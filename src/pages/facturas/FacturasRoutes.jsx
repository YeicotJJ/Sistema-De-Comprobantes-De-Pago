// pages/facturas/FacturasRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import GenerateFacturas from './GenerateFacturas';

export default function FacturasRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GenerateFacturas />} />
    </Routes>
  );
}
