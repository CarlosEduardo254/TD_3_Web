// Corresponde ao CadastroUsuarioDTO.cs
export interface CadastroUsuarioDTO {
  nome: string;
  email: string;
  senha?: string;
  confirmacaoSenha?: string;
}

// Corresponde ao PerfilUsuarioDto.cs
export interface PerfilUsuarioDTO {
  id: string; 
  nome: string;
  email: string;
}