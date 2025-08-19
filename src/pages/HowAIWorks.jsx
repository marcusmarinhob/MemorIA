import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import {
  Brain,
  MessageCircle,
  Target,
  Zap,
  BookOpen,
  Users,
  ArrowRight,
  Play,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import ChatBot from "@/components/ChatBot";
import { toast } from "@/components/ui/use-toast";

const HowAIWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Você faz uma pergunta",
      description:
        "Digite sua dúvida sobre qualquer matéria escolar no chat da sabIA",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "02",
      title: "A IA analisa seu perfil",
      description:
        "Nossa inteligência artificial considera seu nível, histórico e dificuldades",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "03",
      title: "Resposta personalizada",
      description: "Receba uma explicação adaptada ao seu jeito de aprender",
      icon: Target,
      color: "from-green-500 to-emerald-500",
    },
    {
      number: "04",
      title: "Aprendizado contínuo",
      description: "A IA aprende com você e melhora suas recomendações",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const features = [
    {
      title: "Linguagem Simples",
      description:
        "A sabIA explica conceitos complexos de forma fácil de entender, usando exemplos do seu dia a dia.",
      icon: MessageCircle,
      example:
        "Em vez de dizer 'equação linear', ela explica: 'vamos descobrir o valor de x, como um mistério matemático!'",
    },
    {
      title: "Adaptação ao Seu Ritmo",
      description:
        "Se você não entender na primeira vez, a IA explica de outro jeito, mais devagar ou com mais exemplos.",
      icon: Target,
      example:
        "Se você errar uma questão de frações, ela oferece exercícios mais básicos antes de avançar.",
    },
    {
      title: "Disponível 24/7",
      description:
        "Pode tirar dúvidas a qualquer hora, mesmo de madrugada ou nos fins de semana.",
      icon: Zap,
      example:
        "Estudando para a prova de ciências no domingo? A sabIA está sempre pronta para ajudar!",
    },
    {
      title: "Conteúdo Seguro",
      description:
        "Todas as respostas são verificadas e apropriadas para sua idade e série escolar.",
      icon: BookOpen,
      example:
        "O conteúdo é sempre educativo e adequado para estudantes do 6º ao 9º ano.",
    },
  ];

  const benefits = [
    {
      title: "Para Estudantes",
      points: [
        "Tire dúvidas na hora, sem esperar",
        "Aprenda no seu próprio ritmo",
        "Receba explicações personalizadas",
        "Acompanhe seu progresso",
      ],
      icon: "🎓",
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Para Responsáveis",
      points: [
        "Monitore o progresso do seu filho",
        "Receba relatórios semanais",
        "Veja onde precisa de mais ajuda",
        "Acompanhe as conquistas",
      ],
      icon: "👨‍👩‍👧‍👦",
      color: "from-green-500 to-blue-500",
    },
    {
      title: "Para Professores",
      points: [
        "Identifique dificuldades da turma",
        "Receba sugestões de conteúdo",
        "Acompanhe o engajamento",
        "Personalize o ensino",
      ],
      icon: "👩‍🏫",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Como a IA Funciona? - sabIA</title>
        <meta
          name="description"
          content="Entenda como nossa inteligência artificial personaliza o aprendizado e adapta o conteúdo para cada estudante do ensino fundamental."
        />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />

        <div className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 mt-10  floating-animation"
                style={{ backgroundColor: "#153c4b" }}
              >
                <Brain className="w-12 h-12 text-[#edbf21]" />{" "}
              </div>

              <h1
                className="text-4xl md:text-6xl font-bold mb-6"
                style={{ color: "#153c4b" }}
              >
                Como a IA Funciona?
              </h1>
              <p
                className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
                style={{ color: "#57b4b1" }}
              >
                Descubra como nossa inteligência artificial torna o aprendizado
                mais fácil, divertido e personalizado para você!
              </p>
              <Button
                size="lg"
                className="bg-[#153c4b] border-2 border-[#edbf21] text-[#edbf21] text-2xl sm:text-3xl px-8 sm:px-16 py-4 sm:py-6 font-bold rounded-full flex items-center justify-center 
             hover:bg-[#edbf21] hover:text-black hover:scale-105 transition-colors transition-transform duration-300 mx-auto"
                onClick={() =>
                  toast({
                    title: "Demonstração",
                    description:
                      "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
                  })
                }
              >
                <Play className="w-5 h-5 mr-2" />
                Ver Demonstração
              </Button>
            </motion.div>

            <section className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: "#153c4b" }}
                >
                  Como funciona em 4 passos simples
                </h2>
                <p
                  className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
                  style={{ color: "#57b4b1" }}
                >
                  Veja como é fácil aprender com o SabIA
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Card
                        className="h-full text-center"
                        style={{ backgroundColor: "#57b4b1" }}
                      >
                        <CardContent className="p-6">
                          <div
                            className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-3xl font-bold gradient-text mb-2">
                            {step.number}
                          </div>
                          <h3
                            className="text-lg font-semibold mb-3"
                            style={{ color: "#153c4b" }}
                          >
                            {step.title}
                          </h3>
                          <p className="text-white/70 text-sm">
                            {step.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section className="mb-20 p-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: "#153c4b" }}
                >
                  O que torna nossa IA especial?
                </h2>
                <p
                  className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
                  style={{ color: "#57b4b1" }}
                >
                  Características que fazem a diferença no seu aprendizado
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card
                        className="h-full"
                        style={{ backgroundColor: "#57b4b1" }}
                      >
                        <CardHeader>
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-12 h-12 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: "#153c4b" }}
                            >
                              <Icon className="w-6 h-6 text-[#edbf21]" />
                            </div>
                            <CardTitle style={{ color: "#153c4b" }}>
                              {feature.title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p
                            style={{ color: "rgba(255, 255, 255, 0.8)" }}
                            className="mb-4"
                          >
                            {feature.description}
                          </p>
                          <div
                            className="p-3 rounded-lg border-l-4"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.05)",
                              borderColor: "#153c4b",
                            }}
                          >
                            <p
                              style={{ color: "rgba(255, 255, 255, 0.7)" }}
                              className="text-sm italic"
                            >
                              <strong>Exemplo:</strong> {feature.example}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: "#153f4b" }}
                >
                  Benefícios para toda a comunidade escolar
                </h2>
                <p
                  className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
                  style={{ color: "#57b4b1" }}
                >
                  O SabIA ajuda estudantes, responsáveis e professores
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card
                      className="h-full"
                      style={{ backgroundColor: "#57b4b1" }}
                    >
                      <CardHeader className="text-center">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                          style={{ backgroundColor: benefit.color }}
                        >
                          <span className="text-2xl">{benefit.icon}</span>
                        </div>
                        <CardTitle style={{ color: "#153c4b" }}>
                          {benefit.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {benefit.points.map((point, pointIndex) => (
                            <li
                              key={pointIndex}
                              className="flex items-center text-white/80"
                            >
                              <div
                                className="w-2 h-2 rounded-full mr-3"
                                style={{ backgroundColor: "#edbf21" }}
                              ></div>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-effect rounded-2xl p-8 mb-16"
            >
              <div className="text-center mb-8">
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: "#153f4b" }}
                >
                  Segurança e Privacidade
                </h2>
                <p
                  className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
                  style={{ color: "#57b4b1" }}
                >
                  Seus dados estão protegidos e o conteúdo é sempre apropriado
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div
                  className="text-center"
                  style={{
                    backgroundColor: "#57b4b1",
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: "#153f4b" }}
                  >
                    <span className="text-white text-xl">🔒</span>
                  </div>
                  <h3
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{ color: "#153f4b" }}
                  >
                    Dados Protegidos
                  </h3>
                  <p
                    className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
                    style={{ color: "#ffffff" }}
                  >
                    Suas informações pessoais são criptografadas e seguras
                  </p>
                </div>

                <div
                  className="text-center"
                  style={{
                    backgroundColor: "#57b4b1",
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: "#153f4b" }}
                  >
                    <span className="text-white text-xl">✅</span>
                  </div>
                  <h3
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{ color: "#153f4b" }}
                  >
                    Conteúdo Verificado
                  </h3>
                  <p
                    className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
                    style={{ color: "#ffffff" }}
                  >
                    Todo material é revisado por especialistas em educação
                  </p>
                </div>

                <div
                  className="text-center"
                  style={{
                    backgroundColor: "#57b4b1",
                    padding: "1.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: "#153f4b" }}
                  >
                    <span className="text-white text-xl">👨‍👩‍👧‍👦</span>
                  </div>
                  <h3
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{ color: "#153f4b" }}
                  >
                    Apropriado para Idade
                  </h3>
                  <p
                    className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
                    style={{ color: "#ffffff" }}
                  >
                    Conteúdo adequado para estudantes do ensino fundamental
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "#153c4b" }}
              >
                Pronto para experimentar o SabIA?
              </h2>
              <p
                className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
                style={{ color: "#57b4b1" }}
              >
                Comece agora e descubra como a inteligência artificial pode
                transformar seus estudos!
              </p>
              <Button
                size="lg"
                className="bg-[#153c4b] border-2 border-[#edbf21] text-[#edbf21] text-2xl sm:text-3xl px-8 sm:px-16 py-4 sm:py-6 font-bold rounded-full flex items-center justify-center 
             hover:bg-[#edbf21] hover:text-black hover:scale-105 transition-colors transition-transform duration-300 mx-auto"
                onClick={() =>
                  toast({
                    title: "Demonstração",
                    description:
                      "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
                  })
                }
              >
                Começar Agora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>

        <ChatBot />
      </div>
    </>
  );
};

export default HowAIWorks;
