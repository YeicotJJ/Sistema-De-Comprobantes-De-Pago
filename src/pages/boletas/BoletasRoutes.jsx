// pages/boletas/BoletasRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import GenerateBoletas from './GenerateBoletas';

export default function BoletasRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GenerateBoletas />} />
      {/* Puedes añadir más rutas si es necesario */}
    </Routes>
  );
}
