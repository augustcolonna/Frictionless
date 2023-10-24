//Auth context
import { AuthContextProvider } from './context/AuthContext';
//routing
import ReactDOM from 'react-dom/client';
//app import
import App from './App';
//styles - global
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
