# API Livraria — base de testes (SAEP)

API REST de uma livraria (autores, editoras, livros) para praticar **testes que rodam contra o
banco** (com seed) com **TypeScript + Express + TypeORM + PostgreSQL + Jest/supertest**. Base do
exercício da UC Teste de Sistemas e ensaio pra prova prática do SAEP (banco ↔ back).

> A API já vem **pronta e funcionando**. Seu trabalho é **escrever os testes** (ver `TESTES.md`).

## Pré-requisitos
- **Node.js** 20+
- Conta no **[Supabase](https://supabase.com)** (grátis) — o banco fica na nuvem, sem instalar Postgres
- **DBeaver** (opcional, pra inspecionar o banco)

## Etapa 1 — preparar o ambiente

### 1. Fork + clonar + instalar
Primeiro faça **fork** deste repositório (botão **Fork**, canto superior direito) — assim você
tem uma cópia **sua**, pra onde vai dar `push` dos seus commits. Depois clone o **SEU** fork:

```bash
git clone https://github.com/SEU-USUARIO/saep-livraria-api.git
cd saep-livraria-api
cp .env.example .env
npm install
```

### 2. Criar o banco no Supabase
1. Em **supabase.com** → **New project**. Dê um nome e **defina/guarde a senha do banco**.
2. Espere provisionar (~1 min).
3. Botão **Connect** (topo) → aba **Connection string** → escolha **Session pooler**.
   *(o Session pooler funciona em rede **IPv4** — o caso do laboratório; o "Direct" é só IPv6.)*
4. Copie a URI e cole no `.env` em **`DATABASE_URL=`**, trocando `[YOUR-PASSWORD]` pela senha do projeto.

> 👥 Cada aluno cria o **seu próprio** projeto Supabase. Os testes **limpam e re-semeiam** o banco a
> cada rodada — num banco compartilhado, um aluno apagaria os dados do outro.

### 3. Rodar o seeder
```bash
npm run db:reset     # cria as tabelas + a semente (3 autores, 4 editoras, 5 livros) no seu Supabase
```
Confira no Supabase (**Table Editor**) — ou conecte o **DBeaver** com os dados da mesma connection
string (SSL ligado) — que as tabelas apareceram populadas.

### 4. Pronto pra começar
A pasta `tests/` vem **vazia de propósito**: os testes a gente escreve **juntos, seguindo os slides**.
Pra ver a API rodando: `npm run dev` → `http://localhost:3000`.

> 💡 **Sem Supabase?** Dá pra usar um **Postgres local** (Opção B do `.env`): crie o banco `livraria`
> no DBeaver e preencha `DB_HOST`/`DB_USER`/`DB_PASSWORD`. Há também um `docker-compose.yml` no repo.

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
├─ src/
│  ├─ db/
│  │  ├─ dataSource.ts     ← conexão TypeORM → pg (via .env)
│  │  └─ seed.ts           ← limpa + semeia o banco
│  ├─ models/              ← as entities: autor.ts · editora.ts · livro.ts
│  ├─ controllers/         ← regras de cada rota (usam o repository)
│  ├─ routes/              ← autores/editoras/livros + index
│  ├─ middlewares/         ← asyncHandler
│  ├─ app.ts               ← o Express app (exportado pros testes)
│  └─ server.ts            ← inicializa o banco e sobe o servidor
├─ scripts/reset-db.ts     ← o seeder (npm run db:reset)
└─ tests/
   └─ helpers/db.ts        ← reseta o banco (seed) entre os testes
```

## Endpoints

`/autores` · `GET` (lista) · `GET /:id` · `GET /:id/livros` · `POST` · `PUT /:id` · `DELETE /:id`
`/editoras` · `GET` (lista) · `GET /:id` · `GET /:id/livros` · `POST` · `PUT /:id` · `DELETE /:id`
`/livros` · `GET` (lista) · `GET /:id` · `POST` · `PUT /:id` · `DELETE /:id`

## O exercício
Escreva os testes da API — eles rodam **contra o banco** (com seed). A pasta `tests/` vem **vazia**:
os testes a gente escreve **juntos, seguindo os slides**. Siga o **fluxo do `TESTES.md`**: primeiro monte o
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
- **TypeORM** → *entities* + *repository*; o `synchronize` cria as tabelas a partir das entities.
