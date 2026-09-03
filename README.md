# API Livraria — base de testes (SAEP)

API REST de uma livraria (autores, editoras, livros) para praticar **testes que rodam contra o
banco** (com seed) com **TypeScript + Express + knex + PostgreSQL + Jest/supertest**. Base do
exercício da UC Teste de Sistemas e ensaio pra prova prática do SAEP (banco ↔ back).

> A API já vem **pronta e funcionando**. Seu trabalho é **escrever os testes** (ver `TESTES.md`).

## Pré-requisitos
- **Node.js** 20+
- **PostgreSQL** instalado e rodando
- **DBeaver** (cliente pra criar e ver o banco)

## Passo a passo (setup)

### 1. Criar o banco no DBeaver
1. Abra o **DBeaver** → **Nova conexão** (ícone de tomada) → **PostgreSQL**.
2. Preencha: **Host** `localhost` · **Port** `5432` · **Username** e **Password** do seu Postgres · **Database** `postgres`.
3. **Test Connection** (baixa o driver se pedir) → **Finish**.
4. Crie o banco da aula: clique com o **direito** na conexão → **Create New Database** → nome **`livraria`** → OK.
   *(alternativa: abra um SQL Editor e rode `CREATE DATABASE livraria;`)*

### 2. Instalar o projeto
```bash
git clone https://github.com/arthurGiangiarulo/saep-livraria-api.git
cd saep-livraria-api
cp .env.example .env          # ajuste DB_USER / DB_PASSWORD com os do seu Postgres
npm install
```

### 3. Rodar o seeder (cria as tabelas + popula)
```bash
npm run db:reset              # o SEEDER: aplica o schema + a semente no banco 'livraria'
```
Confira no DBeaver (atualize com F5): as tabelas `autores`, `editoras` e `livros` aparecem populadas.

### 4. Rodar os testes
```bash
npm test                      # o exemplo GET /autores fica verde
```

Pronto — agora comece a resolver a tarefa (ver **`TESTES.md`**).
Pra ver a API na mão: `npm run dev` → `http://localhost:3000`.

> 💡 Não quer instalar o Postgres? Há um `docker-compose.yml` no repo (`docker compose up -d` sobe
> um Postgres já semeado) — mas o caminho oficial da tarefa é o **DBeaver + Postgres local** acima.

### Ver o banco pelo VS Code
Instale a extensão **SQLTools** (+ *SQLTools PostgreSQL Driver*) ou a extensão **PostgreSQL** e
conecte em `localhost:5432`, usuário `livraria`, senha `livraria`, banco `livraria`. Dá pra navegar
nas tabelas e rodar consultas sem sair do editor.

> ⚠️ A extensão é só o **cliente** (pra ver/consultar). Quem roda o servidor Postgres é o Docker.

## Scripts

| Comando | O quê |
|---|---|
| `npm run dev` | sobe a API em modo watch (tsx) |
| `npm test` | roda os testes (Jest + ts-jest) |
| `npm run test:watch` | testes em watch |
| `npm run test:cov` | cobertura |
| `npm run lint` | ESLint (teste estático) |
| `npm run lint:fix` | ESLint corrigindo o que dá |
| `npm run db:reset` | zera e repovoa o banco (schema + semente) |
| `npm run build` | compila o TS pra `dist/` |

## Estrutura

```
saep-livraria-api/
├─ docker-compose.yml      ← sobe o Postgres
├─ db/init.sql             ← schema + semente (rodado pelo Docker)
├─ src/
│  ├─ db/dbconfig.ts       ← conexão knex → pg (via .env)
│  ├─ models/              ← autor.ts · editora.ts · livro.ts
│  ├─ controllers/         ← regras de cada rota
│  ├─ routes/              ← autores/editoras/livros + index
│  ├─ middlewares/         ← asyncHandler
│  ├─ app.ts               ← o Express app (exportado pros testes)
│  └─ server.ts            ← sobe o servidor
└─ tests/
   ├─ helpers/db.ts          ← reseta o banco (seed) entre os testes
   └─ exemplo.test.ts        ← 1 teste pronto (modelo) — você cria os demais
```

## Endpoints

`/autores` · `GET` (lista) · `GET /:id` · `GET /:id/livros` · `POST` · `PUT /:id` · `DELETE /:id`
`/editoras` · `GET` (lista) · `GET /:id` · `GET /:id/livros` · `POST` · `PUT /:id` · `DELETE /:id`
`/livros` · `GET` (lista) · `GET /:id` · `POST` · `PUT /:id` · `DELETE /:id`

## O exercício
Escreva os testes da API — eles rodam **contra o banco** (com seed). O `GET /autores` já está
feito como modelo em `tests/exemplo.test.ts`. Siga o **fluxo do `TESTES.md`**: primeiro monte o
**plano inteiro** (`describe` + `it.todo`) e **commite**; depois implemente **arquivo a arquivo**,
**commitando cada parte** — com **commits semânticos** (o Husky exige) e **ESLint limpo**.
Meta: tudo verde. A **solução** fica com o professor.

## Já vem configurado (a "casa arrumada")
- **TypeScript** estrito + **ts-jest**.
- **ESLint** com `typescript-eslint` **strict type-checked** → *teste estático*: pega bug de tipo,
  promise solta, etc. **antes** de rodar (`npm run lint`).
- **Husky + commitlint** → os commits seguem **Conventional Commits** (`feat:`, `fix:`, `test:`,
  `docs:`, `chore:`…). Commit fora do padrão é recusado.
- **lint-staged** → ao commitar, o ESLint roda só nos arquivos alterados.
- **Docker Compose** → Postgres reproduzível, sem instalar banco na máquina.
