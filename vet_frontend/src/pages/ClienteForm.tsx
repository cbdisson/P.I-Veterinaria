import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ClienteForm = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
  });

  const [pet, setPet] = useState({
    nome: "",
    idade: 0,
    animal: "",
  });

  const handleChangeCliente = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleChangePet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("usuario") || "{}").token;

      const response = await axios.post(
        "http://localhost:8000/api/clientes/",
        {
          ...cliente,
          pets: [pet],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate("/clientes");
      }
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Cadastrar Cliente e Pet</h2>
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold mb-2">Dados do Cliente</h3>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={cliente.nome}
          onChange={handleChangeCliente}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={cliente.telefone}
          onChange={handleChangeCliente}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={cliente.email}
          onChange={handleChangeCliente}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={cliente.endereco}
          onChange={handleChangeCliente}
          className="w-full mb-6 p-2 border rounded"
        />

        <h3 className="text-lg font-semibold mb-2">Dados do Pet</h3>
        <input
          type="text"
          name="nome"
          placeholder="Nome do Pet"
          value={pet.nome}
          onChange={handleChangePet}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          name="idade"
          placeholder="Idade"
          value={pet.idade}
          onChange={handleChangePet}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          name="animal"
          placeholder="Tipo de Animal (ex: cachorro)"
          value={pet.animal}
          onChange={handleChangePet}
          className="w-full mb-6 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default ClienteForm;
