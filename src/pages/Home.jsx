import React from "react";
import { Link } from "react-router-dom";
import { Brain, Sparkles, Zap, BookOpen, Users, Trophy } from "lucide-react";
import logo from "../assets/minha_logo.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#acf9f2]">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center">
        <img src={logo} alt="MemorIA" className="w-32 h-32 mb-6 animate-bounce" />
        <h1 className="text-5xl font-bold text-[#153c4b] mb-4">
          Aprenda com Inteligência Artificial
        </h1>
        <p className="text-xl text-[#153c4b] max-w-3xl mb-8">
          Transforme PDFs e URLs em flashcards interativos usando IA avançada e aprenda brincando com jogos gamificados.
        </p>
        <Link
          to="/login"
          className="px-8 py-4 bg-[#153c4b] text-white text-lg font-semibold rounded-full hover:bg-[#0d2a38] transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Começar Agora 🚀
        </Link>
      </section>

      {/* Recursos Principais */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-[#153c4b] mb-16">
          Recursos Principais
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Brain className="w-8 h-8 text-white" />, title: "LLM Avançado", desc: "Processamento de linguagem natural para gerar flashcards precisos automaticamente" },
            { icon: <Sparkles className="w-8 h-8 text-white" />, title: "IA Personalizada", desc: "IA que se adapta ao nível e estilo de aprendizado de cada aluno" },
            { icon: <Zap className="w-8 h-8 text-white" />, title: "RAG Technology", desc: "Recuperação aumentada por geração para respostas contextualizadas" },
            { icon: <BookOpen className="w-8 h-8 text-white" />, title: "Criação Automática", desc: "Transforme PDFs ou URLs em flashcards educativos em segundos" },
            { icon: <Users className="w-8 h-8 text-white" />, title: "Modo Multiplayer", desc: "Jogos de memória com ranking e pontuação em tempo real" },
            { icon: <Trophy className="w-8 h-8 text-white" />, title: "Acompanhamento", desc: "Estatísticas detalhadas para professores e responsáveis" },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#153c4b] rounded-2xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#153c4b] mb-4">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Por que escolher o MemorIA */}
      <section className="py-20 px-6 bg-white/50">
        <h2 className="text-4xl font-bold text-center text-[#153c4b] mb-4">
          Por que escolher o MemorIA?
        </h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-16">
          Nossa IA foi desenvolvida para revolucionar a educação e tornar o aprendizado mais divertido e eficiente.
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { title: "Para Professores", items: ["Crie quizzes a partir de PDFs ou links", "Edite e personalize cada flashcard", "Acompanhe o progresso em tempo real"] },
            { title: "Para Estudantes", items: ["Aprenda com jogos de memória interativos", "Competição saudável com ranking", "Reforço de conhecimento com repetição espaçada"] },
          ].map((section, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-10 shadow-xl">
              <h3 className="text-3xl font-bold text-[#153c4b] mb-8">{section.title}</h3>
              <div className="space-y-6">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-[#153c4b] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-[#153c4b] mb-4">
          Como Funciona
        </h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-16">
          Três passos simples para revolucionar o aprendizado
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: 1, title: "Faça Upload", desc: "Envie um PDF ou cole uma URL com o conteúdo que deseja ensinar" },
            { step: 2, title: "IA Gera Flashcards", desc: "Nossa IA analisa o conteúdo e cria flashcards personalizados automaticamente" },
            { step: 3, title: "Jogue e Aprenda", desc: "Inicie jogos de memória gamificados e acompanhe o progresso dos alunos" },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-20 h-20 bg-[#153c4b] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                {item.step}
              </div>
              <h3 className="text-2xl font-bold text-[#153c4b] mb-4">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
