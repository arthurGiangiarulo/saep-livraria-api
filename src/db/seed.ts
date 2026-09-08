import { AppDataSource } from './dataSource';
import { Autor } from '../models/autor';
import { Editora } from '../models/editora';
import { Livro } from '../models/livro';

/** Zera as tabelas e reinicia os ids (autores viram 1..3, editoras 1..4). */
export async function limpar(): Promise<void> {
  await AppDataSource.query('TRUNCATE livros, editoras, autores RESTART IDENTITY CASCADE');
}

/** Insere a semente (3 autores, 4 editoras, 5 livros). */
export async function semear(): Promise<void> {
  await AppDataSource.getRepository(Autor).save([
    { nome: 'JRR Tolkien', nacionalidade: 'sul-africano' },
    { nome: 'Ursula LeGuin', nacionalidade: 'estadunidense' },
    { nome: 'Machado de Assis', nacionalidade: 'brasileira' },
  ]);
  await AppDataSource.getRepository(Editora).save([
    { nome: 'Europa-América', cidade: 'Lisboa', email: 'e@e.com' },
    { nome: 'Morro Branco', cidade: 'São Paulo', email: 'm@m.com' },
    { nome: 'Aleph', cidade: 'São Paulo', email: 'al@al.com' },
    { nome: 'Ateliê', cidade: 'São Paulo', email: 'a@a.com' },
  ]);
  await AppDataSource.getRepository(Livro).save([
    { titulo: 'O Hobbit', paginas: 230, autor_id: 1, editora_id: 1 },
    { titulo: 'O Silmarillion', paginas: 400, autor_id: 1, editora_id: 1 },
    { titulo: 'O Feiticeiro de Terramar', paginas: 450, autor_id: 2, editora_id: 2 },
    { titulo: 'Os Despossuídos', paginas: 300, autor_id: 2, editora_id: 3 },
    { titulo: 'Memórias Póstumas de Brás Cubas', paginas: 150, autor_id: 3, editora_id: 4 },
  ]);
}
