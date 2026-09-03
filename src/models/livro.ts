import db from '../db/dbconfig';

export interface Livro {
  id: number;
  titulo: string;
  paginas: number;
  editora_id: number;
  autor_id: number;
  created_at: Date;
  updated_at: Date;
}

export type NovoLivro = Pick<Livro, 'titulo' | 'paginas' | 'editora_id' | 'autor_id'>;

export const LivroModel = {
  listar(): Promise<Livro[]> {
    return db<Livro>('livros').select('*').orderBy('id');
  },

  pegarPorId(id: number): Promise<Livro | undefined> {
    return db<Livro>('livros').where({ id }).first();
  },

  porAutor(autorId: number): Promise<Livro[]> {
    return db<Livro>('livros').where({ autor_id: autorId }).orderBy('id');
  },

  porEditora(editoraId: number): Promise<Livro[]> {
    return db<Livro>('livros').where({ editora_id: editoraId }).orderBy('id');
  },

  async criar(dados: NovoLivro): Promise<Livro> {
    const [livro] = await db<Livro>('livros').insert(dados).returning('*');
    return livro;
  },

  async atualizar(id: number, dados: Partial<NovoLivro>): Promise<Livro | undefined> {
    const [livro] = await db<Livro>('livros')
      .where({ id })
      .update({ ...dados, updated_at: new Date() })
      .returning('*');
    return livro;
  },

  excluir(id: number): Promise<number> {
    return db<Livro>('livros').where({ id }).del();
  },
};
