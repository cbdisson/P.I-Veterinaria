import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Painel Principal</h1>
      <button
        onClick={() => navigate('/funcionarios')}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mr-4"
      >
        Gerenciar Funcionários
      </button>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Sair
      </button>
    </div>
  );
};

export default Dashboard;
