import db from '../db/dbconfig';

export interface Editora {
  id: number;
  nome: string;
  cidade: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export type NovaEditora = Pick<Editora, 'nome' | 'cidade' | 'email'>;

export const EditoraModel = {
  listar(): Promise<Editora[]> {
    return db<Editora>('editoras').select('*').orderBy('id');
  },

  pegarPorId(id: number): Promise<Editora | undefined> {
    return db<Editora>('editoras').where({ id }).first();
  },

  async criar(dados: NovaEditora): Promise<Editora> {
    const [editora] = await db<Editora>('editoras').insert(dados).returning('*');
    return editora;
  },

  async atualizar(id: number, dados: Partial<NovaEditora>): Promise<Editora | undefined> {
    const [editora] = await db<Editora>('editoras')
      .where({ id })
      .update({ ...dados, updated_at: new Date() })
      .returning('*');
    return editora;
  },

  excluir(id: number): Promise<number> {
    return db<Editora>('editoras').where({ id }).del();
  },
};
