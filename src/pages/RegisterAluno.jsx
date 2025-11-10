// src/pages/RegisterAluno.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function RegisterAluno() {
  const [nome, setNome] = useState("");
  const [turma, setTurma] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // validações rápidas
    if (!nome || !email || !password || !confirmPassword) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Senhas não coincidem", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Senha muito curta (mín. 6)", variant: "destructive" });
      return;
    }

    // TODO: integrar com lib/auth para criar usuário + salvar dados no Firestore
    // exemplo: criarUsuarioAluno({ nome, turma, email, password })

    toast({ title: "Cadastro de aluno realizado (simulação)" });
    // redireciona para login
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mb-2 text-2xl font-semibold text-[#153c4b]">Cadastro de Aluno</div>
            <CardTitle className="text-base text-gray-600">Crie sua conta de aluno</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="turma">Turma (ex: 7º ano)</Label>
                <Input id="turma" value={turma} onChange={(e) => setTurma(e.target.value)} />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>

              <Button type="submit" className="w-full bg-[#153c4b] text-[#edbf21]">Cadastrar</Button>

              <div className="text-center mt-2">
                <p className="text-sm text-gray-600">
                  Já tem conta? <Link to="/login" className="text-[#153c4b] hover:underline">Entrar</Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
