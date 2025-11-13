import React from "react";
import { Link } from "react-router-dom";
import { Brain, Sparkles, Zap, BookOpen, Users, Trophy } from "lucide-react";
import logo from "../assets/minha_logo.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
        <img src={logo} alt="MemorIA" className="w-32 h-32 mb-6" />
        <h1 className="text-5xl font-bold text-[#5B4FE8] mb-4">
          Aprenda com Inteligência Artificial
        </h1>
        <p className="text-xl text-[#1a7a8a] max-w-3xl mb-8">
          A plataforma educacional que transforma PDFs e URLs em flashcards interativos
          usando IA avançada. Aprenda brincando com jogos de memória gamificados.
        </p>
        <Link
          to="/login"
          className="px-8 py-4 bg-[#5B4FE8] text-white text-lg font-semibold rounded-full hover:bg-[#4a3fd6] transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Começar Agora 🚀
        </Link>
      </section>

      {/* Recursos Principais */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-[#1a7a8a] mb-16">
          Recursos Principais
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-[#5B4FE8] rounded-2xl flex items-center justify-center mb-6">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1a7a8a] mb-4">LLM Avançado</h3>
            <p className="text-gray-600">
              Processamento de linguagem natural para gerar flashcards precisos e relevantes automaticamente
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-[#5B4FE8] rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1a7a8a] mb-4">IA Personalizada</h3>
            <p className="text-gray-600">
              Inteligência artificial que se adapta ao nível e estilo de aprendizado de cada aluno
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-[#5B4FE8] rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1a7a8a] mb-4">RAG Technology</h3>
            <p className="text-gray-600">
              Recuperação aumentada por geração para respostas contextualizadas e precisas
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-[#5B4FE8] rounded-2xl flex items-center justify-center mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1a7a8a] mb-4">Criação Automática</h3>
            <p className="text-gray-600">
              Transforme qualquer PDF ou URL em flashcards educativos em segundos
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-[#5B4FE8] rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1a7a8a] mb-4">Modo Multiplayer</h3>
            <p className="text-gray-600">
              Jogos de memória gamificados com grupos, ranking e pontuação em tempo real
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-[#5B4FE8] rounded-2xl flex items-center justify-center mb-6">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1a7a8a] mb-4">Acompanhamento</h3>
            <p className="text-gray-600">
              Estatísticas detalhadas e análises de desempenho para professores e responsáveis
            </p>
          </div>
        </div>
      </section>

      {/* Por que escolher o MemorIA */}
      <section className="py-20 px-6 bg-white/50">
        <h2 className="text-4xl font-bold text-center text-[#1a7a8a] mb-4">
          Por que escolher o MemorIA?
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
          Nossa inteligência artificial foi desenvolvida especialmente para revolucionar a educação
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Para Professores */}
          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <h3 className="text-3xl font-bold text-[#1a7a8a] mb-8">Para Professores</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#5B4FE8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">Crie quizzes em minutos a partir de PDFs ou links</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#5B4FE8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">Edite e personalize cada flashcard individualmente</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#5B4FE8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">Acompanhe o progresso dos alunos em tempo real</p>
              </div>
            </div>
          </div>

          {/* Para Estudantes */}
          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <h3 className="text-3xl font-bold text-[#1a7a8a] mb-8">Para Estudantes</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#5B4FE8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">Aprenda brincando com jogos de memória interativos</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#5B4FE8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">Competição saudável com ranking de pontuação</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-[#5B4FE8] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">Reforço de conhecimento através da repetição espaçal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-[#1a7a8a] mb-4">
          Como Funciona
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
          Três passos simples para revolucionar o aprendizado
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Passo 1 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-[#5B4FE8] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 className="text-2xl font-bold text-[#1a7a8a] mb-4">Faça Upload</h3>
            <p className="text-gray-600">
              Envie um PDF ou cole uma URL com o conteúdo que deseja ensinar
            </p>
          </div>

          {/* Passo 2 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-[#5B4FE8] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 className="text-2xl font-bold text-[#1a7a8a] mb-4">IA Gera Flashcards</h3>
            <p className="text-gray-600">
              Nossa IA analisa o conteúdo e cria flashcards personalizados automaticamente
            </p>
          </div>

          {/* Passo 3 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-[#5B4FE8] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 className="text-2xl font-bold text-[#1a7a8a] mb-4">Jogue e Aprenda</h3>
            <p className="text-gray-600">
              Inicie jogos de memória gamificados e acompanhe o progresso dos alunos
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}