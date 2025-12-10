import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import ImagemMemoria from "../assets/minha_logo.png";
import { toast } from "@/components/ui/use-toast";
import { useContent } from "@/context/ContentContext";
import { generateWithContext } from "../server/service/geminiApi";
import confetti from "canvas-confetti";


const RotateCcw = () => <span>🔄</span>;
const Check = () => <span>✓</span>;
const XErro = () => <span>❌</span>;

export default function Memory() {
  const navigate = useNavigate();
  const { selectedContent } = useContent();

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

  const [cardPairs, setCardPairs] = useState([]);

  const [isLoadingCards, setIsLoadingCards] = useState(true);

  const timerRef = useRef(null);

  useEffect(() => {
    if (!selectedContent) {
      toast({
        title: "Acesso Bloqueado ❌",
        description:
          "Por favor, selecione um conteúdo na biblioteca para jogar.",
      });
      navigate("/library");
    }
  }, [selectedContent, navigate]);

  useEffect(() => {
    async function loadCards() {
      if (!selectedContent) return;

      setIsLoadingCards(true);

      try {
        const markdown = selectedContent.markdown;
        const result = await generateWithContext("gerar cartas", markdown);

        console.log("CARTAS RECEBIDAS:", result);

        let cleaned = result
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        let cards;

        try {
          cards = JSON.parse(cleaned);
        } catch (err) {
          console.error("Erro ao converter JSON:", err);
          setIsLoadingCards(false);
          return;
        }

        if (Array.isArray(cards) && cards.length > 0) {
          setCardPairs(cards);
        } else {
          console.error("Nenhum par de cartas gerado.");
          toast({
            title: "Erro ao gerar cartas ❌",
            description: "Geração vazia.",
          });
        }
      } catch (error) {
        console.error("Erro ao gerar cartas:", error);
        toast({
          title: "Erro ao gerar cartas ❌",
          description: "Por favor, tente novamente.",
        });
      } finally {
        setIsLoadingCards(false);
      }
    }

    loadCards();
  }, [selectedContent]);

  useEffect(() => {
    if (score === 0) return;
    setScorePulse(true);
    const t = setTimeout(() => setScorePulse(false), 350);
    return () => clearTimeout(t);
  }, [score]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 2500);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const progressPercent = Math.round(
    (matchedPairs.length / cardPairs.length) * 100
  );

  const parabensStyle = `
  @keyframes pop {
    0% { transform: scale(0.2); opacity: 0; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  .parabens-anim {
    animation: pop 0.8s ease-out forwards;
  }
  `;

  <style>{parabensStyle}</style>


  useEffect(() => {
    if (cardPairs.length > 0) {
      initializeGame();
    }
  }, [cardPairs]);

  const initializeGame = () => {
    if (!cardPairs.length) return;

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
    if (selectedCards.length === 1 && selectedCards[0].type === card.type)
      return;

    const updateFn = isQuestion ? setQuestionCards : setAnswerCards;
    updateFn((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsProcessing(true);
      setTimeout(() => handleConfirm(newSelected), 2500);
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
      setTimeout(() => setJustification(""), 15000);

      setSelectedCards([]);
      setIsProcessing(false);
    } else {
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);

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
      }, 2500);
    }
  };

  const resetGame = () => initializeGame();
  const isGameComplete = matchedPairs.length === cardPairs.length;

  useEffect(() => {
  if (isGameComplete) {
    // Solta confetes por 1 segundo
    const duration = 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 10,
        spread: 70,
        startVelocity: 30,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}, [isGameComplete]);


  const renderCard = (card) => {
    const isSelected = selectedCards.some((sc) => sc.id === card.id);
    const isDisabled =
      selectedCards.length === 1 &&
      !isSelected &&
      selectedCards[0].type === card.type;

    const canClick =
      !isProcessing && !card.isFlipped && !card.isMatched && !isDisabled;

   // Define o emoji baseado no tipo da carta
   const emoji = card.type === "question" ? "❓" : "💡";

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
          <div
            className="absolute inset-0 rounded-lg flex items-center justify-center bg-[#1C475A] text-white text-5xl shadow-lg border-2"
            style={{ backfaceVisibility: "hidden" }}
          >
            {emoji}
          </div>

          <div
            className="absolute inset-0 rounded-lg flex items-center justify-center p-3 text-center text-white text-sm font-medium shadow-lg border-2 bg-[#2B6D87]"
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
      

      {showErrorToast && (
        <div className="fixed top-6 right-6 z-50 animate-fadeInOut">
          <div className="flex items-center gap-3 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg">
            <XErro />
            <span className="font-semibold">
              Ops! Esse par não corresponde 😅 Tente novamente!
            </span>
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
          </div>

          {selectedContent && (
  <div className="max-w-7xl mx-auto mt-6">

      {/* Botão de voltar */}
    <div className="relative flex items-center gap-4 mb-6 mt-4">
      <button
        onClick={() => navigate("/library")}
        className="flex items-center gap-2 text-[#153c4b] hover:opacity-70 transition font-semibold"
      >
        ← Voltar
      </button>
    </div>



    {/* Cabeçalho do conteúdo */}
    <div className="text-center mb-6">
      <h2 className="text-3xl font-bold text-[#153c4b] mt-1">
        {selectedContent.title}
      </h2>
    </div>

    {/* Estatísticas */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">

      {/* Pontuação */}
      <div className="p-4 rounded-xl bg-[#f7fafc] border border-[#1C475A]/30 shadow-sm">
        <div className="text-2xl">⭐</div>
        <p className="text-sm font-semibold text-[#1C475A]">Pontuação</p>
        <p className="text-xl font-bold text-[#003D5C]">{score}</p>
      </div>

      {/* Tentativas */}
      <div className="p-4 rounded-xl bg-[#f7fafc] border border-[#1C475A]/30 shadow-sm">
        <div className="text-2xl">🎯</div>
        <p className="text-sm font-semibold text-[#1C475A]">Tentativas</p>
        <p className="text-xl font-bold text-[#003D5C]">{attempts}</p>
      </div>

      {/* Tempo */}
      <div className="p-4 rounded-xl bg-[#f7fafc] border border-[#1C475A]/30 shadow-sm">
        <div className="text-2xl">⏱️</div>
        <p className="text-sm font-semibold text-[#1C475A]">Tempo</p>
        <p className="text-xl font-bold text-[#003D5C]">{formatTime(time)}</p>
      </div>

      {/* Pares */}
      <div className="p-4 rounded-xl bg-[#f7fafc] border border-[#1C475A]/30 shadow-sm">
        <div className="text-2xl">🎴</div>
        <p className="text-sm font-semibold text-[#1C475A]">Pares</p>
        <p className="text-xl font-bold text-[#003D5C]">
          {matchedPairs.length}/{cardPairs.length}
        </p>
      </div>

    </div>
  </div>
)}


           {isLoadingCards && (
            <div className="flex flex-col items-center justify-center py-16 text-[#003D5C]">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#1C475A] border-t-[#F5A623]"></div>
              <p className="mt-6 text-xl font-semibold">🎴 Carregando cartas...</p>
            </div>
          )}


          {!isLoadingCards && (
            <div className="max-w-7xl mx-auto">
              

              <div className="mt-6">
                <div className="w-full bg-blue-100 rounded-full h-5 overflow-hidden border-2 border-blue-200 shadow-inner">
                  <div
                    role="progressbar"
                    aria-valuenow={progressPercent}
                    className="h-full rounded-full transition-all duration-700 ease-out shadow-lg"
                    style={{
                      width: `${progressPercent}%`,
                      background: "linear-gradient(90deg, #003D5C 0%, #1C475A 50%, #F5A623 100%)",
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm font-semibold mt-2" style={{ color: "#1C475A" }}>
                  <span>📊 Progresso</span>
                  <span>{progressPercent}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {isLoadingCards ? null : (
          <>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-[#1C475A] text-white text-center p-3 rounded-lg mb-4">
                  PERGUNTAS
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {questionCards.map(renderCard)}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold bg-[#1C475A] text-white text-center p-3 rounded-lg mb-4">
                  RESPOSTAS
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {answerCards.map(renderCard)}
                </div>
              </div>
            </div>

            {justification && (
            <div className="max-w-7xl mx-auto mb-6">
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow">
                <p className="font-bold mb-1">Curiosidade:</p>
                <p>{justification}</p>
              </div>
            </div>
          )}

            <div className="text-center space-y-4">
              <div className="flex justify-center gap-8">
                
              </div>

              <div className="text-sm max-w-md mx-auto bg-white/60 p-4 rounded-lg shadow-lg text-[#021d49]">
                <p className="font-medium mb-2">Como jogar:</p>
                <p>• Clique nas cartas para virá-las</p>
                <p>• Encontre os pares de pergunta e resposta</p>
                <p>• O cronômetro começa na sua primeira jogada!</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
