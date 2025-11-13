import React, { useState, useEffect, useRef } from "react";
import Navigation from "../components/Navigation";
import ImagemMemoria from "../assets/minha_logo.png";
import { toast } from "@/components/ui/use-toast";

const RotateCcw = () => <span>🔄</span>;
const Check = () => <span>✓</span>;
const XErro = () => <span>❌</span>;

export default function Memory() {
  const [questionCards, setQuestionCards] = useState([]);
  const [answerCards, setAnswerCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [justification, setJustification] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [scorePulse, setScorePulse] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const timerRef = useRef(null);

  const cardPairs = [
    { id: 1, question: "O que diz a 1ª Lei de Newton?", answer: "Lei da Inércia", justification: "A 1ª Lei afirma que um corpo em repouso tende a permanecer em repouso..." },
    { id: 2, question: "Qual a fórmula da velocidade média?", answer: "Vm = ΔS/Δt", justification: "A velocidade média é ΔS dividido por Δt." },
    { id: 3, question: "Qual a forma de energia associada ao movimento?", answer: "Energia cinética", justification: "A energia cinética é a energia do movimento de um corpo." },
    { id: 4, question: "O que é um corpo em queda livre?", answer: "Um corpo sujeito apenas à gravidade", justification: "Em queda livre, a única força atuante é a gravidade." },
    { id: 5, question: "Como se chama a força que se opõe ao movimento?", answer: "Atrito", justification: "A força de atrito se opõe ao movimento relativo entre superfícies." },
    { id: 6, question: "Qual a unidade de medida da força no SI?", answer: "Newton (N)", justification: "A unidade de força no SI é o Newton (N), homenagem a Isaac Newton." },
    { id: 7, question: "Qual a fórmula da 2ª Lei de Newton?", answer: "F = m.a", justification: "A força resultante é o produto da massa pela aceleração." },
    { id: 8, question: "Qual a 3ª Lei de Newton?", answer: "Ação e Reação", justification: "Para toda ação, há uma reação de mesma intensidade e direção oposta." },
  ];

  useEffect(() => {
    if (score === 0) return;
    setScorePulse(true);
    const t = setTimeout(() => setScorePulse(false), 350);
    return () => clearTimeout(t);
  }, [score]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const progressPercent = Math.round((matchedPairs.length / cardPairs.length) * 100);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const questions = [];
    const answers = [];

    cardPairs.forEach((pair) => {
      questions.push({ id: `q-${pair.id}`, content: pair.question, type: "question", pairId: pair.id, isFlipped: false, isMatched: false });
      answers.push({ id: `a-${pair.id}`, content: pair.answer, type: "answer", pairId: pair.id, isFlipped: false, isMatched: false });
    });

    setQuestionCards(questions.sort(() => Math.random() - 0.5));
    setAnswerCards(answers.sort(() => Math.random() - 0.5));
    setSelectedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setAttempts(0);
    setJustification("");
    setIsProcessing(false);
    setShowErrorToast(false);
    setTime(0);
    setIsRunning(false);
    setHasStarted(false);
  };

  const handleCardClick = (cardId) => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsRunning(true);
    }

    if (isProcessing) return;

    let card = questionCards.find((c) => c.id === cardId);
    let isQuestion = true;

    if (!card) {
      card = answerCards.find((c) => c.id === cardId);
      isQuestion = false;
    }

    if (card.isFlipped || card.isMatched || selectedCards.length >= 2) return;
    if (selectedCards.length === 1 && selectedCards[0].type === card.type) return;

    const updateFn = isQuestion ? setQuestionCards : setAnswerCards;
    updateFn((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)));

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

      setQuestionCards((prev) => prev.map((c) => (c.id === c1.id || c.id === c2.id ? { ...c, isMatched: true } : c)));
      setAnswerCards((prev) => prev.map((c) => (c.id === c1.id || c.id === c2.id ? { ...c, isMatched: true } : c)));

      const correctPair = cardPairs.find((p) => p.id === c1.pairId);
      setJustification(correctPair.justification);
      setTimeout(() => setJustification(""), 10000);

      setSelectedCards([]);
      setIsProcessing(false);
    } else {
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);

      setTimeout(() => {
        setQuestionCards((prev) => prev.map((c) => (c.id === c1.id || c.id === c2.id ? { ...c, isFlipped: false } : c)));
        setAnswerCards((prev) => prev.map((c) => (c.id === c1.id || c.id === c2.id ? { ...c, isFlipped: false } : c)));
        setSelectedCards([]);
        setIsProcessing(false);
      }, 1000);
    }
  };

  const resetGame = () => initializeGame();
  const isGameComplete = matchedPairs.length === cardPairs.length;

  useEffect(() => {
    if (isGameComplete) setIsRunning(false);
  }, [isGameComplete]);

  const renderCard = (card) => {
    const isSelected = selectedCards.some((sc) => sc.id === card.id);
    const isDisabled =
      selectedCards.length === 1 && !isSelected && selectedCards[0].type === card.type;

    const canClick = !isProcessing && !card.isFlipped && !card.isMatched && !isDisabled;

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
            transform: card.isFlipped || card.isMatched ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div
            className="absolute inset-0 rounded-lg flex items-center justify-center bg-[#0d7377] text-white text-5xl shadow-lg border-2"
            style={{ backfaceVisibility: "hidden" }}
          >
            🧠
          </div>

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
    <div className="min-h-screen relative">
      <Navigation />
      {showErrorToast && (
        <div className="fixed top-6 right-6 z-50 animate-fadeInOut">
          <div className="flex items-center gap-3 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg">
            <XErro />
            <span className="font-semibold">Ops! Esse par não corresponde 😅 Tente novamente!</span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          10%, 90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease-in-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto p-6 pt-32">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-md">
              <img src={ImagemMemoria} alt="MemorIA" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-5xl font-bold">
              <span style={{ color: "#153c4b" }}>Memor</span>
              <span style={{ color: "#edbf21" }}>IA</span>
            </h1>
          </div>

          <p className="text-lg mb-6 text-[#0a5d61]">Jogo da Memória com IA 🤖</p>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div
                className={`flex items-center gap-4 p-3 rounded-2xl shadow-lg border border-[#0d7377] bg-white/90 transition-transform duration-200 ${
                  scorePulse ? "scale-105" : "scale-100"
                }`}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#14a098] text-white text-xl font-bold shadow-inner">
                  <Check />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Pontuação</div>
                  <div className="text-2xl font-extrabold text-[#153c4b]">{score}</div>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="p-3 rounded-xl bg-white/90 border shadow-sm text-sm text-[#0d7377]">
                  <div className="font-medium">Tentativas</div>
                  <div className="text-lg font-semibold">{attempts}</div>
                </div>

                <div className="p-3 rounded-xl bg-white/90 border shadow-sm text-sm text-[#0d7377]">
                  <div className="font-medium">Tempo</div>
                  <div className="text-lg font-semibold">{formatTime(time)}</div>
                </div>

                <div className="p-3 rounded-xl bg-white/90 border shadow-sm text-sm text-[#0d7377]">
                  <div className="font-medium">Pares</div>
                  <div className="text-lg font-semibold">
                    {matchedPairs.length}/{cardPairs.length}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden border border-slate-200">
                <div
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${progressPercent}%`,
                    background: "linear-gradient(90deg,#14a098,#edbf21)",
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Progresso</span>
                <span>{progressPercent}%</span>
              </div>
            </div>
          </div>
        </div>

        {isGameComplete && (
          <div className="text-center mb-6">
            <div className="text-white p-6 rounded-lg inline-block shadow-lg bg-[#14a098]">
              <h2 className="text-3xl font-bold mb-2">🎉 Parabéns! Você completou o jogo!</h2>
              <p className="text-lg">
                Pontuação: {score} | Tempo: {formatTime(time)} | Tentativas: {attempts}
              </p>
            </div>
          </div>
        )}

        {justification && (
          <div className="text-center mb-6">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative max-w-4xl mx-auto">
              <strong className="font-bold">Curiosidade: </strong>
              <span>{justification}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-[#14a098] text-white text-center p-3 rounded-lg mb-4">
              ❓ PERGUNTAS
            </h2>
            <div className="grid grid-cols-2 gap-4">{questionCards.map(renderCard)}</div>
          </div>

          <div>
            <h2 className="text-2xl font-bold bg-[#f39c12] text-white text-center p-3 rounded-lg mb-4">
              💡 RESPOSTAS
            </h2>
            <div className="grid grid-cols-2 gap-4">{answerCards.map(renderCard)}</div>
          </div>
        </div>

        {/* Botões e instruções */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-8">
            {/* Botão Salvar Jogo (esquerda) */}
            <button
              onClick={() => 
                toast({
                  title: "💾 Salvar Jogo",
                  description:
                    "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Em breve estará disponível! 🚀",
                  })}
              className="px-6 py-3 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg bg-[#14a098] hover:opacity-90 transition-transform duration-300 hover:scale-105"
            >
              💾 Salvar Jogo
            </button>

            {/* Botão Novo Jogo (direita) */}
            <button
              onClick={resetGame}
              className="px-6 py-3 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg bg-[#f39c12] hover:opacity-90 transition-transform duration-300 hover:scale-105"
            >
              <RotateCcw /> Novo Jogo
            </button>
          </div>

          <div className="text-sm max-w-md mx-auto bg-white/60 p-4 rounded-lg shadow-lg text-[#0a5d61]">
            <p className="font-medium mb-2">Como jogar:</p>
            <p>• Clique nas cartas para virá-las</p>
            <p>• Encontre os pares de pergunta e resposta</p>
            <p>• O cronômetro começa na sua primeira jogada!</p>
          </div>
        </div>
      </div>
    </div>
  );
}