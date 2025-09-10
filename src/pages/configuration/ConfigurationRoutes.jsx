import { Routes, Route } from 'react-router-dom';
import Configuration from './Configuration';

export default function ConfigurationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Configuration />} />
      {/* Puedes añadir más rutas si es necesario */}
    </Routes>
  );
}