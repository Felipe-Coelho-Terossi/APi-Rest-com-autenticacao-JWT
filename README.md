# 🔐 JWT Auth API
🔗 **[Demo ao vivo](https://a-pi-rest-com-autenticacao-jwt.vercel.app)**

API REST de autenticação completa com JSON Web Tokens, construída com Node.js, TypeScript e PostgreSQL — integrada a um frontend em React.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)

---

## Sobre o projeto

Sistema de autenticação production-ready com as seguintes funcionalidades:

- Cadastro e login de usuários com hash de senha via **bcrypt**
- Geração de **access token** (15 min) e **refresh token** (7 dias)
- Renovação automática de sessão via refresh token
- Rotas protegidas por middleware de autenticação JWT
- Logout com revogação do refresh token no banco de dados
- Frontend em React com contexto global de autenticação e interceptors Axios

---

## Arquitetura

```
jwt-auth-api/
├── src/
│   ├── controllers/       # recebem requisições, delegam ao service
│   ├── middlewares/       # verificação de token JWT
│   ├── routes/            # mapeamento de URLs
│   ├── services/          # lógica de negócio
│   └── utils/             # geração e verificação de tokens
├── prisma/
│   └── schema.prisma      # modelos User e RefreshToken
└── frontend/
    └── src/
        ├── contexts/      # AuthContext — estado global
        ├── components/    # ProtectedRoute
        ├── pages/         # Login, Register, Dashboard
        └── services/      # axios com interceptors automáticos
```

### Decisões técnicas

**Por que dois tokens?**
O access token tem validade curta (15 min) e é verificado sem consulta ao banco — rápido e escalável. O refresh token tem validade longa (7 dias) e fica armazenado no banco, permitindo revogação explícita no logout. Essa combinação evita o tradeoff entre segurança e experiência do usuário.

**Por que Prisma?**
O ORM oferece type-safety nas queries, migrations versionadas e uma camada de abstração que facilita troca de banco futuramente. As queries tipadas evitam erros de runtime comuns em SQL puro.

**Por que arquitetura em camadas?**
Cada camada tem uma única responsabilidade. O controller não sabe como o banco funciona; o service não sabe como a rota funciona. Isso facilita testes unitários e manutenção.

---

## Fluxo de autenticação

```
REGISTER / LOGIN
  → senha transformada em hash com bcrypt
  → access token gerado (JWT, 15min)
  → refresh token gerado (JWT, 7dias) e salvo no banco
  → ambos retornados ao cliente

REQUISIÇÃO AUTENTICADA
  → axios injeta o access token automaticamente
  → middleware verifica assinatura JWT sem consultar o banco
  → userId extraído do payload e injetado na requisição

TOKEN EXPIRADO (transparente para o usuário)
  → interceptor detecta 401
  → refresh token enviado para /auth/refresh
  → novo access token gerado e salvo
  → requisição original repetida automaticamente

LOGOUT
  → refresh token deletado do banco
  → access token expira naturalmente em até 15min
```

---

## Endpoints

| Método | Rota | Autenticação | Descrição |
|--------|------|-------------|-----------|
| POST | `/auth/register` | ❌ | Cadastro de usuário |
| POST | `/auth/login` | ❌ | Login |
| POST | `/auth/refresh` | ❌ | Renovar access token |
| POST | `/auth/logout` | ❌ | Logout e revogação do refresh token |
| GET | `/auth/me` | ✅ Bearer Token | Dados do usuário autenticado |

---

## Como rodar localmente

### Pré-requisitos
- Node.js 20+
- PostgreSQL
- npm

### Backend

```bash
# Clone o repositório
git clone https://github.com/Felipe-Coelho-Terossi/API-REST-de-autentica-o-com-JWT.git
cd API-REST-de-autentica-o-com-JWT

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# Suba o banco de dados
npx prisma db push

# Inicie o servidor
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173`

### Variáveis de ambiente

Crie um `.env` na raiz do projeto com:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/auth_api"
JWT_SECRET="sua_chave_secreta"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_SECRET="sua_chave_refresh"
JWT_REFRESH_EXPIRES_IN="7d"
PORT=3000
```

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Runtime | Node.js 20 |
| Linguagem | TypeScript |
| Framework | Express |
| ORM | Prisma v7 |
| Banco de dados | PostgreSQL |
| Autenticação | JSON Web Tokens |
| Hash de senha | bcryptjs |
| Frontend | React + Vite |
| HTTP Client | Axios |
| Roteamento | React Router DOM |

---

## Autor

**Felipe Coelho Terossi**
Estudante de Sistemas de Informação — Unicamp

[![GitHub](https://img.shields.io/badge/GitHub-Felipe--Coelho--Terossi-181717?style=flat&logo=github)](https://github.com/Felipe-Coelho-Terossi)
