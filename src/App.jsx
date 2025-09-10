import './App.css'
import { BrowserRouter } from 'react-router-dom';
import RoutesAdmin from '@/routes/RoutesAdmin';

function App() {
  return (
    <BrowserRouter>
      <RoutesAdmin />
    </BrowserRouter>
  );
}

export default App;
