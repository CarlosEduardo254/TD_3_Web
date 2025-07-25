import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

interface RegisterPageProps {
  onRegister: (nome: string, email: string, senha: string) => boolean;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nome || !email || !senha || !confirmarSenha) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    // Validação de email
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Por favor, insira um email válido.');
        return;
    }

    // onRegister cuidará da verificação de existência do email e do registro em si.
    if (!onRegister(nome, email, senha)) {
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
      <div className="p-8 bg-[#0F1026] shadow-2xl rounded-lg w-full max-w-md border border-[#1D1A4B]">
        <h2 className="text-3xl font-bold text-center text-[#E0E0E0] mb-8">Criar Nova Conta</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nome Completo"
            id="nome"
            name="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome completo"
            required
            autoFocus
          />
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.email@exemplo.com"
            required
          />
          <Input
            label="Senha"
            id="senha"
            name="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Crie uma senha"
            required
          />
          <Input
            label="Confirmar Senha"
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Confirme sua senha"
            required
          />
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <Button type="submit" variant="primary" className="w-full !py-3 text-lg" size="lg">
            Registrar
          </Button>
        </form>
        <p className="text-sm text-center mt-4 text-[#A0A0A0]">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-medium text-[#8C8A6C] hover:text-[#E0E0E0] underline">
            Faça login aqui
          </Link>
        </p>
      </div>
    </div>
  );
};