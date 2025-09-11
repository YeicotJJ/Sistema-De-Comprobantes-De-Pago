// src/App.jsx
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RoutesAdmin from '@/routes/RoutesAdmin';
import AppThemeProvider from '@/theme/ThemeProvider';
import { store } from '@/store/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <Provider store={store}>
          <RoutesAdmin />
        </Provider>
      </BrowserRouter>
    </AppThemeProvider>
  );
}

export default App;
