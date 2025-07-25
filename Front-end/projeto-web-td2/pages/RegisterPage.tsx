import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import UserService from '../services/User/user.service';

export const RegisterPage: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nome || !email || !senha || !confirmacaoSenha) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    if (senha !== confirmacaoSenha) {
      setError('As senhas não coincidem.');
      return;
    }
    
    setIsLoading(true);

    try {
      await UserService.register({ nome, email, senha, confirmacaoSenha });
      // Após o registro bem-sucedido, envia o usuário para a página de login
      navigate('/login', { state: { message: 'Cadastro realizado com sucesso! Faça o login.' } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar o cadastro.');
    } finally {
      setIsLoading(false);
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
            placeholder="Crie uma senha (mínimo 8 caracteres)"
            required
          />
          <Input
            label="Confirmar Senha"
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            value={confirmacaoSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Confirme sua senha"
            required
          />
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <Button type="submit" variant="primary" className="w-full !py-3 text-lg" size="lg" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrar'}
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