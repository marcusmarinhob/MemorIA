import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import Chat from "../assets/chat.jpg";
import ImagemSabia from "../assets/sabia.jpeg";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Oi! Eu sou a sabIA, sua assistente de estudos! 🤖 Como posso te ajudar hoje?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <img
          src={Chat}
          alt="Chat sabIA"
          className="w-20 h-20 object-cover rounded-full shadow-lg pulse-glow"
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 h-96"
          >
            <Card
              className="h-full flex flex-col"
              style={{ backgroundColor: "#153c4b" }}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#edbf21" }}
                  >
                    <img
                      src={ImagemSabia}
                      alt="Mascote sabIA"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-semibold">
                      <span style={{ color: "#edbf21" }}>Sab</span>
                      <span style={{ color: "#57b4b1" }}>IA</span>
                    </span>
                    <p className="text-xs" style={{ color: "#57b4b1" }}>
                      Assistente de Estudos
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-yellow-400"
                >
                  <X className="w-4 h-4" style={{ color: "#edbf21" }} />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      message.isBot ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.isBot
                          ? "bg-white/20 text-white"
                          : "bg-[#57b4b1] text-white"
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 border-t border-white/20">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Digite sua dúvida..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-[#57b4b1] text-[#edbf21] hover:bg-[#edbf21] hover:text-[#57b4b1] transition-colors duration-300"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
