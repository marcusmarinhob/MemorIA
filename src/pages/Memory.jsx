import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import ImagemMemoria from "../assets/minha_logo.png";

const RotateCcw = () => <span>🔄</span>;
const Check = () => <span>✓</span>;

export default function Memory() {
  const [questionCards, setQuestionCards] = useState([]);
  const [answerCards, setAnswerCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [justification, setJustification] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const cardPairs = [
    {
      id: 1,
      question: "O que diz a 1ª Lei de Newton?",
      answer: "Lei da Inércia",
      justification:
        "A 1ª Lei de Newton afirma que um corpo em repouso tende a permanecer em repouso...",
    },
    {
      id: 2,
      question: "Qual a fórmula da velocidade média?",
      answer: "Vm = ΔS/Δt",
      justification:
        "A velocidade média é a divisão da variação do espaço pela variação do tempo.",
    },
    {
      id: 3,
      question: "Qual a forma de energia associada ao movimento de um corpo?",
      answer: "Energia cinética",
      justification:
        "A energia cinética é a energia que um corpo em movimento possui.",
    },
    {
      id: 4,
      question: "O que é um corpo em queda livre?",
      answer: "Um corpo sujeito apenas à gravidade",
      justification:
        "Em queda livre, a única força que atua sobre um corpo é a gravidade.",
    },
    {
      id: 5,
      question: "Como se chama a força que se opõe ao movimento?",
      answer: "Atrito",
      justification:
        "A força de atrito é uma força que se opõe ao movimento relativo entre superfícies.",
    },
    {
      id: 6,
      question: "Qual a unidade de medida da força no SI?",
      answer: "Newton (N)",
      justification:
        "A unidade de força no SI é o Newton (N), em homenagem a Isaac Newton.",
    },
    {
      id: 7,
      question: "Qual a fórmula da 2ª Lei de Newton?",
      answer: "F = m.a",
      justification:
        "A 2ª Lei mostra que a força resultante é igual à massa vezes a aceleração.",
    },
    {
      id: 8,
      question: "Qual a 3ª Lei de Newton?",
      answer: "Ação e Reação",
      justification:
        "Para toda ação, há sempre uma reação de mesma intensidade e direção oposta.",
    },
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const questions = [];
    const answers = [];

    cardPairs.forEach((pair) => {
      questions.push({
        id: `q-${pair.id}`,
        content: pair.question,
        type: "question",
        pairId: pair.id,
        isFlipped: false,
        isMatched: false,
      });
      answers.push({
        id: `a-${pair.id}`,
        content: pair.answer,
        type: "answer",
        pairId: pair.id,
        isFlipped: false,
        isMatched: false,
      });
    });

    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

    setQuestionCards(shuffledQuestions);
    setAnswerCards(shuffledAnswers);
    setSelectedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setAttempts(0);
    setJustification("");
    setIsProcessing(false);
  };

  const handleCardClick = (cardId) => {
    if (isProcessing) return;

    let card = questionCards.find((c) => c.id === cardId);
    let isQuestion = true;

    if (!card) {
      card = answerCards.find((c) => c.id === cardId);
      isQuestion = false;
    }

    if (card.isFlipped || card.isMatched || selectedCards.length >= 2) return;

    if (selectedCards.length === 1) {
      const firstCard = selectedCards[0];
      if (firstCard.type === card.type) return;
    }

    if (isQuestion) {
      setQuestionCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
      );
    } else {
      setAnswerCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
      );
    }

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsProcessing(true);
      setTimeout(() => handleConfirm(newSelected), 1000);
    }
  };

  const handleConfirm = (cardsToProcess) => {
    if (cardsToProcess.length !== 2) return;

    setAttempts((a) => a + 1);
    const [c1, c2] = cardsToProcess;

    if (c1.pairId === c2.pairId && c1.type !== c2.type) {
      setMatchedPairs((prev) => [...prev, c1.pairId]);
      setScore((s) => s + 10);

      setQuestionCards((prev) =>
        prev.map((c) =>
          c.id === c1.id || c.id === c2.id ? { ...c, isMatched: true } : c
        )
      );
      setAnswerCards((prev) =>
        prev.map((c) =>
          c.id === c1.id || c.id === c2.id ? { ...c, isMatched: true } : c
        )
      );

      const correctPair = cardPairs.find((p) => p.id === c1.pairId);
      setJustification(correctPair.justification);

      setTimeout(() => setJustification(""), 4000);
      setSelectedCards([]);
      setIsProcessing(false);
    } else {
      setTimeout(() => {
        setQuestionCards((prev) =>
          prev.map((c) =>
            c.id === c1.id || c.id === c2.id ? { ...c, isFlipped: false } : c
          )
        );
        setAnswerCards((prev) =>
          prev.map((c) =>
            c.id === c1.id || c.id === c2.id ? { ...c, isFlipped: false } : c
          )
        );
        setSelectedCards([]);
        setIsProcessing(false);
      }, 1000);
    }
  };

  const resetGame = () => initializeGame();
  const isGameComplete = matchedPairs.length === cardPairs.length;

  const renderCard = (card) => {
    const isSelected = selectedCards.some((sc) => sc.id === card.id);
    let isDisabled = false;

    if (selectedCards.length === 1 && !isSelected) {
      const first = selectedCards[0];
      if (first.type === card.type) isDisabled = true;
    }

    const canClick =
      !isProcessing &&
      !card.isFlipped &&
      !card.isMatched &&
      selectedCards.length < 2 &&
      !isDisabled;

    return (
      <div
        key={card.id}
        onClick={canClick ? () => handleCardClick(card.id) : undefined}
        className={`relative h-32 w-full cursor-pointer ${
          card.isMatched ? "opacity-60 pointer-events-none" : ""
        }`}
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full h-full transition-transform duration-500 rounded-lg"
          style={{
            transformStyle: "preserve-3d",
            transform:
              card.isFlipped || card.isMatched
                ? "rotateY(180deg)"
                : "rotateY(0deg)",
          }}
        >
          {}
          <div
            className="absolute inset-0 rounded-lg flex items-center justify-center bg-[#0d7377] text-white text-5xl shadow-lg border-2"
            style={{ backfaceVisibility: "hidden" }}
          >
            🧠
          </div>

          {}
          <div
            className={`absolute inset-0 rounded-lg flex items-center justify-center p-3 text-center text-white text-sm font-medium shadow-lg border-2 ${
              card.type === "question" ? "bg-[#14a098]" : "bg-[#f39c12]"
            }`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {card.content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="max-w-7xl mx-auto p-6 pt-32">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden shadow-md">
              <img
                src={ImagemMemoria}
                alt="MemorIA"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h1 className="text-5xl font-bold">
              <span style={{ color: "#153c4b" }}>Memor</span>
              <span style={{ color: "#edbf21" }}>IA</span>
            </h1>
            <div className="text-2xl text-[#f39c12]">🎓</div>
          </div>
          <p className="text-lg mb-6 text-[#0a5d61]">
            Jogo da Memória com IA 🤖
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 inline-block shadow-lg border border-[#0d7377]">
            <div className="flex gap-6 font-semibold text-[#0d7377]">
              <span>Pontuação: {score}</span>
              <span>Tentativas: {attempts}</span>
              <span>
                Pares: {matchedPairs.length}/{cardPairs.length}
              </span>
            </div>
          </div>
        </div>

        {isGameComplete && (
          <div className="text-center mb-6">
            <div className="text-white p-6 rounded-lg inline-block shadow-lg bg-[#14a098]">
              <h2 className="text-3xl font-bold mb-2">
                🎉 Parabéns! Você completou o jogo!
              </h2>
              <p className="text-lg">
                Pontuação final: {score} pontos em {attempts} tentativas
              </p>
            </div>
          </div>
        )}

        {justification && (
          <div className="text-center mb-6">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative max-w-4xl mx-auto">
              <strong className="font-bold">Curiosidade: </strong>
              <span className="block sm:inline">{justification}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold bg-[#14a098] text-white p-3 rounded-lg shadow-lg">
                ❓ PERGUNTAS
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {questionCards.map(renderCard)}
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold bg-[#f39c12] text-white p-3 rounded-lg shadow-lg">
                💡 RESPOSTAS
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {answerCards.map(renderCard)}
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={resetGame}
              className="px-6 py-3 text-white rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg bg-[#f39c12] hover:opacity-90"
            >
              <RotateCcw /> Novo Jogo
            </button>
          </div>

          <div className="text-sm max-w-md mx-auto bg-white/60 p-4 rounded-lg shadow-lg text-[#0a5d61]">
            <p className="font-medium mb-2">Como jogar:</p>
            <p>• Clique nas cartas para virá-las</p>
            <p>• Encontre os pares de pergunta e resposta</p>
            <p>• Selecione uma pergunta e uma resposta para formar um par!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
