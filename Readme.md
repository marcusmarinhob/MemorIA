# MemorIA - Plataforma de Tutoria por meio de jogo da memória com Inteligência Artificial

Plataforma educacional por meio de jogo da memória que utiliza IA para oferecer tutoria personalizada para estudantes do ensino fundamental (6º ao 9º ano).

**Site:** https://memor-ia-jet.vercel.app/

## Tecnologias

### Frontend

- React 18.2.0
- Vite 4.0.3
- React Router DOM 6.16.0
- Tailwind CSS 3.x
- Framer Motion 10.16.4
- Radix UI Components
- Lucide React 0.285.0
- Firebase 12.4.0

### Backend

- Express.js 5.1.0
- Google Gemini AI (gemini-2.0-flash)
- CORS 2.8.5
- dotenv 17.2.1

### Ferramentas de Desenvolvimento

- ESLint 8.57.1
- PostCSS 8.4.31
- Autoprefixer 10.4.16
- Babel 7.27.0

## Pré-requisitos

- Node.js 18+ (conforme .nvmrc)
- npm ou yarn

## Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto

## Desenvolvimento

### Executar o projeto localmente:

```bash
npm run dev
```

```bash
node src/server/server.js
```

O servidor de desenvolvimento será iniciado em `http://localhost:5173`

### Scripts disponíveis:

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção

## Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface
│   ├── teacher/        # Componentes específicos para professores
│   └── Navigation.jsx  # Navegação
|   └── PrivateRoute.jsx # Rotas privadas
|   └── Logout.jsx      # Logout automático
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Página inicial
|   ├── Dashboard.jsx   # Área de meu progresso
|   ├── HowAiWorks.jsx  # Área de como funciona a IA
|   ├── Library.jsx     # Área do firebase, firestore e auth
|   ├── Login.jsx       # Área de login
|   ├── Register.jsx    # Área de cadastro
│   ├── StudentArea.jsx # Área do estudante
│   ├── TeacherArea.jsx # Área do professor
├── assets/             # Imagens e recursos
└── lib/                # Utilitários
    └── auth.js         # Autenticação
    └── firebase.js     # Configuração do firebase
    └── firestore.js    # Banco de dados login e cadastro
└── App.jsx
```

## Coordenador do projeto:

Marcus Marinho- [GitHub](https://github.com/marcusmarinhob)

## Orientador do projeto:

Sergio Natan- [GitHub](https://github.com/sergionatans)

