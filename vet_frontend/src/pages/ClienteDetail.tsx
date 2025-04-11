import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Vacina {
  id: number;
  nome: string;
  data_aplicacao: string;
}

interface Pet {
  id?: number;
  nome: string;
  idade: number;
  especie: string;
  vacinas?: Vacina[];
}

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  pets: Pet[];
}

const ClienteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [novoPet, setNovoPet] = useState<Pet>({ nome: "", idade: 0, especie: "" });

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const token = usuario?.token;
  const isMaster = usuario?.is_master;

  const fetchCliente = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/clientes/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCliente(response.data);
    } catch (error) {
      console.error("Erro ao carregar cliente:", error);
    }
  };

  useEffect(() => {
    fetchCliente();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!cliente) return;
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handlePetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoPet({ ...novoPet, [e.target.name]: e.target.value });
  };

  const handleAddPet = async () => {
    if (!cliente) return;
    try {
      const response = await axios.post(
        "http://localhost:8000/api/pets/",
        { ...novoPet, idade: Number(novoPet.idade), cliente: cliente.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCliente({ ...cliente, pets: [...cliente.pets, response.data] });
      setNovoPet({ nome: "", idade: 0, especie: "" });
    } catch (error) {
      console.error("Erro ao adicionar pet:", error);
    }
  };

  const handleRemovePet = async (petId?: number) => {
    if (!petId || !cliente) return;
    try {
      await axios.delete(`http://localhost:8000/api/pets/${petId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCliente({
        ...cliente,
        pets: cliente.pets.filter((pet) => pet.id !== petId),
      });
    } catch (error) {
      console.error("Erro ao remover pet:", error);
    }
  };

  const handleSalvar = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/clientes/${id}/`,
        cliente,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/clientes");
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  };

  const handleDeletarCliente = async () => {
    const confirmar = confirm("Tem certeza que deseja deletar este cliente?");
    if (!confirmar || !cliente) return;
    try {
      await axios.delete(`http://localhost:8000/api/clientes/${cliente.id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/clientes");
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  if (!cliente) return <p className="p-4">Carregando...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Editar Cliente</h2>
        {isMaster && (
          <button
            onClick={handleDeletarCliente}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Deletar Cliente
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="nome"
          value={cliente.nome}
          onChange={handleInputChange}
          placeholder="Nome"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="telefone"
          value={cliente.telefone}
          onChange={handleInputChange}
          placeholder="Telefone"
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={cliente.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="endereco"
          value={cliente.endereco}
          onChange={handleInputChange}
          placeholder="Endereço"
          className="border p-2 rounded"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">Pets</h3>
      <ul className="mb-4">
        {cliente.pets.map((pet) => (
          <li key={pet.id} className="flex flex-col border-b py-2">
            <span>
              {pet.nome} - {pet.especie} ({pet.idade} anos)
            </span>
            <ul className="ml-4 text-sm text-gray-600">
              {pet.vacinas?.map((v) => (
                <li key={v.id}>
                  • {v.nome} - {v.data_aplicacao}
                </li>
              ))}
            </ul>
            <button
              className="text-red-600 hover:underline self-start mt-1"
              onClick={() => handleRemovePet(pet.id)}
            >
              Remover Pet
            </button>
          </li>
        ))}
      </ul>

      <h4 className="font-medium mb-2">Adicionar Novo Pet</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        <input
          type="text"
          name="nome"
          value={novoPet.nome}
          onChange={handlePetChange}
          placeholder="Nome do Pet"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="idade"
          value={novoPet.idade}
          onChange={handlePetChange}
          placeholder="Idade"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="especie"
          value={novoPet.especie}
          onChange={handlePetChange}
          placeholder="Espécie"
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={handleAddPet}
        className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Adicionar Pet
      </button>

      <div className="flex justify-end">
        <button
          onClick={handleSalvar}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default ClienteDetail;
