import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Clientes from './pages/Clientes';
import ClienteForm from './pages/ClienteForm';
import ClienteDetail from './pages/ClienteDetail';

const isAuthenticated = () => {
  return !!localStorage.getItem('usuario');
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota principal */}
        <Route path="/" element={isAuthenticated() ? <Navigate to="/clientes" /> : <Login />} />

        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Lista de clientes */}
        <Route path="/clientes" element={isAuthenticated() ? <Clientes /> : <Navigate to="/login" />} />

        {/* Cadastro de novo cliente */}
        <Route path="/clientes/novo" element={isAuthenticated() ? <ClienteForm /> : <Navigate to="/login" />} />

        {/* Edição/visualização de cliente e pets */}
        <Route path="/clientes/:id" element={isAuthenticated() ? <ClienteDetail /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
