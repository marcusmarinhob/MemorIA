import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, Users, Zap, Star, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import ChatBot from '@/components/ChatBot';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "IA Personalizada",
      description: "Tutoria adaptada ao seu ritmo de aprendizado"
    },
    {
      icon: BookOpen,
      title: "Conteúdo Completo",
      description: "Materiais do 6º ao 9º ano organizados por matéria"
    },
    {
      icon: Users,
      title: "Acompanhamento",
      description: "Responsáveis e professores podem monitorar o progresso"
    },
    {
      icon: Zap,
      title: "Aprendizado Rápido",
      description: "Respostas instantâneas para suas dúvidas"
    }
  ];

  const testimonials = [
    {
      name: "Ana, 13 anos",
      text: "A sabIA me ajudou muito em matemática! Agora entendo frações de verdade!",
      grade: "7º ano"
    },
    {
      name: "Carlos, 14 anos", 
      text: "Adoro como a IA explica ciências de um jeito fácil de entender.",
      grade: "8º ano"
    },
    {
      name: "Maria, mãe da Sofia",
      text: "Minha filha melhorou muito as notas depois que começou a usar a plataforma.",
      grade: "Responsável"
    }
  ];

  return (
    <>
      <Helmet>
        <title>sabIA - Plataforma de Tutoria com Inteligência Artificial</title>
        <meta name="description" content="Plataforma educativa com IA para alunos do 6º ao 9º ano. Tutoria personalizada, conteúdo adaptativo e acompanhamento do progresso." />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="floating-animation">
                <img  alt="Mascote sabIA: um pássaro com chapéu de formatura e engrenagem" className="w-32 h-32 mx-auto rounded-full" src="https://storage.googleapis.com/hostinger-horizons-assets-prod/5b3fa98b-a199-4439-9411-aeec121e4281/981d0b32888904812190326e82de7308.jpg" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold gradient-text">
                Aprenda com a
                <br />
                <span className="text-white">sabIA</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
                A plataforma de tutoria com inteligência artificial que transforma 
                o aprendizado dos alunos do 6º ao 9º ano
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/login">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4">
                    <Play className="w-5 h-5 mr-2" />
                    Começar Agora
                  </Button>
                </Link>
                
                <Link to="/how-ai-works">
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4">
                    Como Funciona?
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Por que escolher a sabIA?
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Nossa inteligência artificial foi desenvolvida especialmente para estudantes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="glass-effect h-full">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-white/70">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-effect rounded-2xl p-8"
            >
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    10k+
                  </div>
                  <p className="text-white/80">Estudantes Ativos</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    95%
                  </div>
                  <p className="text-white/80">Melhoria nas Notas</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    24/7
                  </div>
                  <p className="text-white/80">Suporte da IA</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                O que nossos usuários dizem
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-effect h-full">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-white/80 mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-white/60">{testimonial.grade}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-effect rounded-2xl p-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Pronto para revolucionar seus estudos?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Junte-se a milhares de estudantes que já estão aprendendo com a sabIA
              </p>
              <Link to="/login">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-12 py-4">
                  Começar Gratuitamente
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <ChatBot />
      </div>
    </>
  );
};

export default Home;