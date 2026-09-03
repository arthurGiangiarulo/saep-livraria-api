import db from '../../src/db/dbconfig';
import type { NovoAutor } from '../../src/models/autor';
import type { NovaEditora } from '../../src/models/editora';
import type { NovoLivro } from '../../src/models/livro';

// Mesma semente do db/init.sql. Como o TRUNCATE ... RESTART IDENTITY zera os ids,
// autores viram 1..3, editoras 1..4 e os livros referenciam esses ids.
const autores: NovoAutor[] = [
  { nome: 'JRR Tolkien', nacionalidade: 'sul-africano' },
  { nome: 'Ursula LeGuin', nacionalidade: 'estadunidense' },
  { nome: 'Machado de Assis', nacionalidade: 'brasileira' },
];

const editoras: NovaEditora[] = [
  { nome: 'Europa-América', cidade: 'Lisboa', email: 'e@e.com' },
  { nome: 'Morro Branco', cidade: 'São Paulo', email: 'm@m.com' },
  { nome: 'Aleph', cidade: 'São Paulo', email: 'al@al.com' },
  { nome: 'Ateliê', cidade: 'São Paulo', email: 'a@a.com' },
];

const livros: NovoLivro[] = [
  { titulo: 'O Hobbit', paginas: 230, autor_id: 1, editora_id: 1 },
  { titulo: 'O Silmarillion', paginas: 400, autor_id: 1, editora_id: 1 },
  { titulo: 'O Feiticeiro de Terramar', paginas: 450, autor_id: 2, editora_id: 2 },
  { titulo: 'Os Despossuídos', paginas: 300, autor_id: 2, editora_id: 3 },
  { titulo: 'Memórias Póstumas de Brás Cubas', paginas: 150, autor_id: 3, editora_id: 4 },
];

/** Zera as tabelas e recoloca a semente. Chame no beforeEach para cada teste começar limpo. */
export async function resetarBanco(): Promise<void> {
  await db.raw('TRUNCATE livros, editoras, autores RESTART IDENTITY CASCADE');
  await db('autores').insert(autores);
  await db('editoras').insert(editoras);
  await db('livros').insert(livros);
}

/** Fecha a conexão com o banco. Chame no afterAll para o Jest encerrar limpo. */
export async function fecharBanco(): Promise<void> {
  await db.destroy();
}
