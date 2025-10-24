import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Brain, User, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { loginUsuario, USER_TYPES } from "../lib/auth";
import { atualizarDadosUsuario, buscarDadosUsuario } from "../lib/firestore";

const Login = () => {
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    try {
      const resultadoLogin = await loginUsuario(email, password);

      if (!resultadoLogin.success) {
        let titulo = "Erro no login!";
        let descricao = resultadoLogin.error;

        if (resultadoLogin.code === "auth/user-not-found") {
          titulo = "Email não cadastrado";
          descricao =
            "Este email não está cadastrado no sistema. Verifique o email ou cadastre-se.";
        } else if (resultadoLogin.code === "auth/wrong-password") {
          titulo = "Senha incorreta";
          descricao =
            "A senha está incorreta. Tente novamente ou recupere sua senha.";
        } else if (resultadoLogin.code === "auth/invalid-email") {
          titulo = "Email inválido";
          descricao =
            "O formato do email é inválido. Verifique e tente novamente.";
        } else if (resultadoLogin.code === "auth/network-request-failed") {
          titulo = "Problema de conexão";
          descricao =
            "Erro de conexão. Verifique sua internet e tente novamente.";
        }

        toast({
          title: titulo,
          description: descricao,
          variant: "destructive",
        });
        return;
      }

      const uid = resultadoLogin.user.uid;
      const resultadoFirestore = await buscarDadosUsuario(uid);

      if (!resultadoFirestore.success) {
        toast({
          title: "Erro",
          description: "Não foi possível recuperar os dados do usuário",
          variant: "destructive",
        });
        return;
      }

      const userData = resultadoFirestore.data;
      
      const tipoMap = {
        student: "aluno",
        teacher: "professor",
        parent: "responsavel"
      }

      const tipoEsperado = tipoMap[userType];
      const tipoUsuario = userData.tipo;

      if(tipoUsuario !== tipoEsperado) {
        toast({
        title: "Acesso negado",
        description: `Este email é de um ${tipoUsuario}, não ${userType}`,
        variant: "destructive",
      });
      return;
    }
    
      await atualizarDadosUsuario(uid, {
        ultimoAcesso: new Date(),
      });

      localStorage.setItem("userType", tipoUsuario);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", userData.nome);

      toast({
        title: "Login realizado!",
        description: `Bem-vindo(a) ${userData.nome}! 🎉`,
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
          navigate("/");
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro durante o login.",
        variant: "destructive",
      });
    }
  };
  const userTypes = [
    { id: "student", label: "Estudante", icon: "🎓" },
    { id: "parent", label: "Responsável", icon: "👨‍👩‍👧‍👦" },
    { id: "teacher", label: "Professor", icon: "👩‍🏫" },
  ];

  return (
    <>
      <Helmet>
        <title>Login - SabIA</title>
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
                Entrar no SabIA
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

              <form onSubmit={handleLogin} className="space-y-4">
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
                <Button
                  size="lg"
                  className="w-full h-12 rounded-full bg-[#153c4b]  text-[#edbf21] font-bold text-lg hover:bg-[#153c4b] hover:scale-105 transition-transform duration-300"
                >
                  Entrar
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-[#153c4b]">
                  Não tem uma conta?{" "}
                  <Link to="/register" className="w-full">
                    <button className="font-medium text-[#153c4b] hover:underline">
                      Cadastre-se aqui
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

export default Login;
