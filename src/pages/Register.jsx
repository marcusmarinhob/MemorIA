import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Brain, User, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { cadastrarUsuario, USER_TYPES } from "../lib/auth";
import { salvarDadosUsuario } from "../lib/firestore";

const Register = () => {
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [materia, setMateria] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !nome) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Senhas não conferem",
        description: "Confirme a senha corretamente.",
        variant: "destructive",
      });
      return;
    }
    try {
      
    const tipoMap = {
      student: "aluno",
      teacher: "professor",
      parent: "responsavel",
    };

      const tipoUsuario = tipoMap[userType];
      const resultado = await cadastrarUsuario(email, password, tipoUsuario, nome, userType === "teacher" ? materia : null);

      if (!resultado.success) {
        toast({
          title: "Erro no cadastro",
          description: resultado.error,
          variant: "destructive",
        });
        return;
      }

      const salvar = await salvarDadosUsuario(resultado.user.uid, {
        nome: nome,
        email: email,
        materia: userType === "teacher" ? materia : null,
        tipo: tipoUsuario,
      });
      
      localStorage.setItem("userType", tipoUsuario);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", nome);
      
    toast({
      title: "Cadastro realizado!",
      description: "Bem-vindo(a) ao SabIA! 🎉",
    });

    switch (tipoUsuario) {
      case "aluno":
        navigate("/student");
        break;
      case "responsavel":
        navigate("/parents");
        break;
      case "professor":
        navigate("/teacher");
        break;
      default:
        navigate("/student");
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro durante o cadastro.",
        variant: "destructive",
      });
    }
  }; 


     /* if (!salvar.success) {
        toast({
          title: "Erro ao salvar dados",
          description: salvar.error,
          variant: "destructive",
        });
        return;
      }

      localStorage.setItem("userType", userType);
      localStorage.setItem("userEmail", email);

      toast({
        title: "Cadastro realizado!",
        description: "Bem-vindo(a) ao SabIA! 🎉",
      });

      switch (userType) {
        case "student":
          navigate("/student");
          break;
        case "parent":
          navigate("/parents");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        default:
          navigate("/student");
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro durante o cadastro.",
        variant: "destructive",
      });
    }
  }; */

  const userTypes = [
    { id: "student", label: "Estudante", icon: "🎓" },
    { id: "parent", label: "Responsável", icon: "👨‍👩‍👧‍👦" },
    { id: "teacher", label: "Professor", icon: "👩‍🏫" },
  ];

  return (
    <>
      <Helmet>
        <title>Cadastro - SabIA</title>
        <meta
          name="description"
          content="Faça login na plataforma sabIA e acesse sua área personalizada de estudos com inteligência artificial."
        />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="inline-flex items-center mb-8 text-[#153c4b] hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Link>

          <Card className="rounded-2xl shadow-xl bg-white/20 backdrop-blur-lg border border-white/30">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#153c4b]">
                <Brain className="w-8 h-8 text-[#edbf21]" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#153c4b]">
                Cadastre-se no SabIA
              </CardTitle>
              <p className="text-[#153c4b]">Acesse sua área personalizada</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block text-[#153c4b]">
                  Eu sou:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {userTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setUserType(type.id)}
                      className={`p-3 rounded-xl text-center transition-all font-medium ${
                        userType === type.id
                          ? "bg-[#153c4b] text-[#edbf21]"
                          : "bg-white/30 text-[#153c4b] hover:bg-white/50"
                      }`}
                    >
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="text-xs">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-[#153c4b]">
                    Nome
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#153c4b]" />
                    <Input
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="seu Nome"
                      className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/70 border-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-[#153c4b]">
                    Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#153c4b]" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/70 border-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>

                {userType === "teacher" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block text-[#153c4b]">
                      Matéria
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#153c4b]" />
                      <Input
                        type="text"
                        value={materia}
                        onChange={(e) => setMateria(e.target.value)}
                        placeholder="matéria que leciona"
                        className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/70 border-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium mb-2 block text-[#153c4b]">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#153c4b]" />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/70 border-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-[#153c4b]">
                    Confirme a Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#153c4b]" />
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/70 border-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full h-12 rounded-full bg-[#153c4b]  text-[#edbf21] font-bold text-lg hover:bg-[#153c4b] hover:scale-105 transition-transform duration-300"
                >
                  Cadastrar
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-[#153c4b]">
                  Já tem uma conta?{" "}
                  <Link to="/login" className="w-full">
                    <button className="font-medium text-[#153c4b] hover:underline">
                      Entrar
                    </button>
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
