export interface IMovieResponse {
  id: number;
  titulo: string;
  descricao: string;
  genero: string;
  anoLancamento: number;
  qtdVotos: number;
  mediaVotos: number;
  caminhoImagem?: string;
}
