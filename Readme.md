# SabIA - Plataforma de Tutoria com Inteligência Artificial

Plataforma educacional que utiliza IA para oferecer tutoria personalizada para estudantes do ensino fundamental (6º ao 9º ano).

**Site:** https://sab-ia.vercel.app/

## Tecnologias

### Frontend

- React 18.2.0
- Vite 4.0.3
- React Router DOM 6.16.0
- Tailwind CSS 3.x
- Framer Motion 10.16.4
- Radix UI Components
- Lucide React 0.285.0

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
- Chave da API do Google Gemini

## Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd SabIA
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto:

```env
GEMINI_API_KEY=sua_chave_da_api_gemini
```

## Desenvolvimento

### Executar o projeto localmente:

```bash
npm run dev
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
│   ├── ChatBot.jsx     # Chatbot principal
│   └── Navigation.jsx  # Navegação
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Página inicial
│   ├── StudentArea.jsx # Área do estudante
│   ├── TeacherArea.jsx # Área do professor
│   └── ParentsArea.jsx # Área dos responsáveis
├── server/             # Backend Express
│   ├── server.js       # Servidor principal
│   └── service/        # Serviços (API Gemini)
├── assets/             # Imagens e recursos
└── lib/                # Utilitários
```

## Funcionalidades

### Chatbot Inteligente (SabIA)

- Tutor de IA que guia o aprendizado sem fornecer respostas prontas
- Integração com Google Gemini AI
- Interface responsiva e expansível

### Áreas Específicas

- **Estudantes**: Dashboard personalizado, gamificação, progresso por matéria
- **Professores**: Gestão de turmas, análise de desempenho, sugestões da IA
- **Responsáveis**: Monitoramento do progresso dos filhos, relatórios

### Recursos Adicionais

- Biblioteca de conteúdos educacionais
- Sistema de autenticação
- Interface responsiva (desktop/mobile)
- Animações fluidas

## Deploy

### Vercel (Recomendado)

1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente:
   - `GEMINI_API_KEY`: Sua chave da API do Google Gemini
3. O deploy será automático a cada push na branch principal

### Deploy Manual

1. Gere o build de produção:

```bash
npm run build
```

2. O conteúdo da pasta `dist/` pode ser servido por qualquer servidor web estático

### Configurações de Deploy

- **vercel.json**: Configurações específicas para Vercel
- **public/.htaccess**: Configurações para Apache (se necessário)
- Build otimizado com code splitting automático

## API do Google Gemini

### Configuração

1. Acesse o [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Gere uma chave de API
3. Adicione a chave no arquivo `.env`

### Uso

A API é utilizada através do serviço em `src/server/service/geminiApi.js`:

- Modelo: gemini-2.0-flash
- Temperatura: 0.7
- Prompt engineering focado em pedagogia construtivista

## Configurações

### Tailwind CSS

Configuração personalizada em `tailwind.config.js` com:

- Tema customizado
- Cores do projeto
- Animações personalizadas
- Componentes Radix UI integrados

### Vite

Configuração em `vite.config.js` com:

- Plugins de desenvolvimento personalizados
- Alias de importação (@/)
- Configurações de CORS
- Otimizações de build

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Teste

