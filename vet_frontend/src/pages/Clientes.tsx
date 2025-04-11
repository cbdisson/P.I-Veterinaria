import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface Pet {
  id: number;
  nome: string;
  idade: number;
  animal: string;
}

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  pets: Pet[];
}

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  const fetchClientes = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const token = usuario?.token;

    if (!token) {
      console.warn("Token não encontrado. Redirecionando para login.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/clientes/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <div className="flex gap-2">
          <Link
            to="/clientes/novo"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Novo Cliente
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        {clientes.length === 0 ? (
          <p className="text-gray-600">Nenhum cliente cadastrado.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Pets</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{cliente.nome}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.pets?.length || 0}</td>
                  <td>
                    <Link
                      to={`/clientes/${cliente.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Ver Detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Clientes;
