# Tarefa — testes da API Livraria

Os testes rodam **contra o banco de verdade** (com seed). Nada de mock aqui: você chama a API
com `supertest` e confere o que voltou. O exemplo `GET /autores` já está pronto em
`tests/exemplo.test.ts` — use de modelo.

## Requisitos da tarefa

1. **Commits semânticos (Conventional Commits)** — o Husky recusa mensagem fora do padrão.
   Tipos: `feat:` `fix:` `test:` `refactor:` `docs:` `chore:`. Exemplos mais abaixo.
2. **Sem warnings do ESLint** — rode `npm run lint` e deixe **limpo** (`npm run lint:fix` ajuda).
3. **Fluxo obrigatório** (é isso que estamos treinando):
   1. **Monte o plano inteiro primeiro**: crie os arquivos de teste só com `describe` + `it.todo`
      (um `it.todo` por caso da lista abaixo). **Commit:** `test: plano de testes da API`.
   2. **Depois resolva arquivo a arquivo**: implemente um arquivo, rode, veja verde, **commit**.
      Repita. Um commit por arquivo (ou por caso, se preferir granular).

## Antes de começar: banco + seed

Faça o **setup do `README.md`** (é o passo a passo completo):

1. No **DBeaver**, conecte no seu Postgres e crie o banco **`livraria`**.
2. `cp .env.example .env` (ajuste usuário/senha) · `npm install`.
3. **`npm run db:reset`** — o **seeder**: cria as tabelas e popula.
4. `npm test` — o exemplo `GET /autores` deve ficar verde.

Semente: **3 autores** (1 JRR Tolkien, 2 Ursula LeGuin, 3 Machado de Assis) ·
**4 editoras** · **5 livros** (Tolkien tem 2). Cada teste recomeça limpo (o `beforeEach` reseta).

## A lista — o que testar (um `it` por item)

### `tests/autores.test.ts`
- [ ] `GET /autores` → **200** e **3** autores
- [ ] `GET /autores/1` → **200**, `nome` = "JRR Tolkien"
- [ ] `GET /autores/999` → **404**
- [ ] `POST /autores` (`{ nome, nacionalidade }`) → **201** com o autor criado (tem `id`)
- [ ] `PUT /autores/1` (`{ nacionalidade }`) → **200** com a nacionalidade nova
- [ ] `DELETE /autores/:id` → **crie** um autor novo (sem livros) e delete-o → **204**
- [ ] `GET /autores/1/livros` → **2** livros

### `tests/editoras.test.ts`
- [ ] `GET /editoras` → **200** e **4** editoras
- [ ] `GET /editoras/1` → **200**
- [ ] `GET /editoras/999` → **404**
- [ ] `POST /editoras` (`{ nome, cidade, email }`) → **201**
- [ ] `PUT /editoras/1` → **200**
- [ ] `DELETE /editoras/:id` → **crie** uma editora nova e delete-a → **204**

### `tests/livros.test.ts`
- [ ] `GET /livros` → **200** e **5** livros
- [ ] `GET /livros/1` → **200**, `titulo` = "O Hobbit"
- [ ] `GET /livros/999` → **404**
- [ ] `POST /livros` (`{ titulo, paginas, autor_id, editora_id }`) → **201**
- [ ] `PUT /livros/1` (`{ paginas }`) → **200**
- [ ] `DELETE /livros/5` → **204**

> 🔑 **Pegadinha das FKs:** no Postgres a *foreign key* é obrigatória. Deletar um autor/editora
> que **tem livros** dá erro. Por isso o DELETE cria um registro novo (sem livros) e deleta esse.

## Exemplos de commit semântico

```bash
git commit -m "test: plano de testes da API"       # o plano inteiro (it.todo)
git commit -m "test: testes de autores"            # implementou tests/autores.test.ts
git commit -m "test: testes de editoras"
git commit -m "test: testes de livros"
git commit -m "fix: corrige id no teste de DELETE"
```
