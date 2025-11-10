// src/pages/RegisterProfessor.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function RegisterProfessor() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [subjects, setSubjects] = useState([]); // { name, classes: [] }
  const [currentSubject, setCurrentSubject] = useState("");
  const [currentClass, setCurrentClass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addSubject = () => {
    if (currentSubject.trim()) {
      setSubjects([...subjects, { name: currentSubject.trim(), classes: [] }]);
      setCurrentSubject("");
    }
  };

  const addClassToSubject = (index) => {
    if (!currentClass.trim()) return;
    const updated = [...subjects];
    updated[index].classes.push(currentClass.trim());
    setSubjects(updated);
    setCurrentClass("");
  };

  const removeSubject = (i) => setSubjects(subjects.filter((_, idx) => idx !== i));
  const removeClass = (sIdx, cIdx) => {
    const updated = [...subjects];
    updated[sIdx].classes = updated[sIdx].classes.filter((_, j) => j !== cIdx);
    setSubjects(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword || !nome) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }
    if (subjects.length === 0) {
      setError("Adicione pelo menos uma matéria");
      return;
    }
    if (subjects.some((s) => s.classes.length === 0)) {
      setError("Todas as matérias devem ter pelo menos uma turma");
      return;
    }

    // TODO: integrar com lib/auth + firestore
    toast({ title: "Cadastro de professor realizado (simulação)" });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#153c4b] mb-3">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none"><path d="M12 3C8.5 3 5.5 4.5 3.5 7C3.5 7 6 6 8 8C8 8 6 9 5 11C4 13 4 16 6 18C8 20 11 20 12 20C13 20 16 20 18 18C20 16 20 13 19 11C18 9 16 8 16 8C18 6 20.5 7 20.5 7C18.5 4.5 15.5 3 12 3Z" fill="white"/></svg>
              </div>
              <h1 className="text-2xl font-semibold">Cadastro de Professor</h1>
              <p className="text-sm text-gray-600">Preencha seus dados e adicione matérias/turmas</p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
              </div>

              <div>
                <Label>Matérias</Label>
                <div className="flex gap-2 mb-3">
                  <Input placeholder="Nome da matéria (ex: Física)" value={currentSubject} onChange={(e) => setCurrentSubject(e.target.value)} />
                  <Button type="button" onClick={addSubject} variant="outline"><Plus className="w-4 h-4" /></Button>
                </div>

                <div className="space-y-3">
                  {subjects.map((s, sIdx) => (
                    <div key={sIdx} className="border rounded-lg p-3 bg-white">
                      <div className="flex justify-between items-start mb-3">
                        <strong>{s.name}</strong>
                        <Button type="button" variant="ghost" onClick={() => removeSubject(sIdx)}><X className="w-4 h-4" /></Button>
                      </div>

                      <div className="flex gap-2 mb-2">
                        <Input placeholder="Adicionar turma (ex: 3º ano A)" value={currentClass} onChange={(e) => setCurrentClass(e.target.value)} />
                        <Button type="button" onClick={() => addClassToSubject(sIdx)} variant="outline"><Plus className="w-4 h-4" /></Button>
                      </div>

                      {s.classes.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {s.classes.map((c, cIdx) => (
                            <div key={cIdx} className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-3 py-1 rounded-full">
                              <span>{c}</span>
                              <button type="button" onClick={() => removeClass(sIdx, cIdx)} className="text-teal-700"><X className="w-3 h-3" /></button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#153c4b] text-[#edbf21]">Cadastrar Professor</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
