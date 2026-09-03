import db from '../db/dbconfig';

export interface Autor {
  id: number;
  nome: string;
  nacionalidade: string;
  created_at: Date;
  updated_at: Date;
}

export type NovoAutor = Pick<Autor, 'nome' | 'nacionalidade'>;

export const AutorModel = {
  listar(): Promise<Autor[]> {
    return db<Autor>('autores').select('*').orderBy('id');
  },

  pegarPorId(id: number): Promise<Autor | undefined> {
    return db<Autor>('autores').where({ id }).first();
  },

  async criar(dados: NovoAutor): Promise<Autor> {
    const [autor] = await db<Autor>('autores').insert(dados).returning('*');
    return autor;
  },

  async atualizar(id: number, dados: Partial<NovoAutor>): Promise<Autor | undefined> {
    const [autor] = await db<Autor>('autores')
      .where({ id })
      .update({ ...dados, updated_at: new Date() })
      .returning('*');
    return autor;
  },

  excluir(id: number): Promise<number> {
    return db<Autor>('autores').where({ id }).del();
  },
};
