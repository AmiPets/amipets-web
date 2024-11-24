import { useState } from "react";
import axios from "axios";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastro = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/signup", {
        nome,
        email,
        telefone,
        endereco,
        senha,
      });

      if (response.status === 201) {
        console.log("Cadastro bem-sucedido", response.data);
      }
    } catch (err) {
      setError("Erro ao realizar cadastro. Verifique os dados.");
      console.error("Erro no cadastro:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Cadastrar-se</h2>

          <form onSubmit={handleCadastro}>
            <div className="mb-6">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg"
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg"
                placeholder="Digite seu e-mail"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="text"
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg"
                placeholder="Digite seu telefone"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <input
                type="text"
                id="endereco"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg"
                placeholder="Digite seu endereço"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#7DA632] focus:border-[#7DA632] p-4 text-lg"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-[#7DA632] text-white font-semibold py-3 px-4 rounded-md shadow-lg hover:bg-[#6b9132] transition duration-200"
                disabled={loading}
              >
                {loading ? "Carregando..." : "Cadastrar"}
              </button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <a href="#" className="text-sm text-[#7DA632] hover:underline">
                Já tem uma conta? Entre aqui!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}