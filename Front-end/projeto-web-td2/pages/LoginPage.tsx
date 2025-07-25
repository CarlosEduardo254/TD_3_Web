import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import AuthService from '../services/Auth/auth.service';
import { TOKEN_KEY } from '../services/shared/api.ts';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !senha) {
      setError('Por favor, preencha o email e a senha.');
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await AuthService.login({ email, senha });
      localStorage.setItem(TOKEN_KEY, response.token); // Salva o token no localStorage
      onLoginSuccess(); // Avisa o App.tsx para atualizar o estado do usuário
      navigate('/'); // Navega para a página inicial
    } catch (err: any) {
      setError(err.response?.data?.message || 'Falha no login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
      <div className="p-8 bg-[#0F1026] shadow-2xl rounded-lg w-full max-w-md border border-[#1D1A4B]">
        <h2 className="text-3xl font-bold text-center text-[#E0E0E0] mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.email@exemplo.com"
            required
            autoFocus
          />
          <Input
            label="Senha"
            id="senha"
            name="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Sua senha"
            required
          />
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <Button type="submit" variant="primary" className="w-full !py-3 text-lg" size="lg" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
        <p className="text-sm text-center mt-4 text-[#A0A0A0]">
          Não tem uma conta?{' '}
          <Link to="/register" className="font-medium text-[#8C8A6C] hover:text-[#E0E0E0] underline">
            Registre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
};