// src/App.jsx
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesAdmin from '@/routes/RoutesAdmin';
import AppThemeProvider from '@/theme/ThemeProvider'; // Ajusta según tu estructura

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <RoutesAdmin />
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
