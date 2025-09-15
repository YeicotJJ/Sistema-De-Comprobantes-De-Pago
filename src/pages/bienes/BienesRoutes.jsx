// pages/boletas/BoletasRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Bienes from './Bienes';

export default function BienesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Bienes />} />
      {/* Puedes añadir más rutas si es necesario */}
    </Routes>
  );
}
