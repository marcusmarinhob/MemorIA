import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, User, Lock, BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getAuth } from "firebase/auth";

const FileList = ({ onFileAdded }) => {
  const [showForm, setShowForm] = useState(false);

  const [assunto, setAssunto] = useState("");
  const [turma, setTurma] = useState("");
  const [materia, setMateria] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [arquivo, setArquivo] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const xhrRef = useRef(null);

  const cancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      xhrRef.current = null;

      setUploading(false);
      setUploadProgress(0);
      setArquivo(null);

      toast({
        title: "Cancelado",
        description: "Upload cancelado pelo usuário.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!arquivo) {
      toast({
        title: "Arquivo PDF",
        description: "Por favor, adicione um arquivo PDF.",
      });
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        toast({
          title: "Erro de autenticação",
          description: "Usuário não autenticado.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", arquivo);
      formData.append("assunto", assunto);
      formData.append("turma", turma);
      formData.append("materia", materia);
      formData.append("detalhes", detalhes);
      formData.append("professor_uid", user.uid);

      setUploading(true);
      setUploadProgress(0);

      const uploadPromise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;

        xhr.open("POST", "http://localhost:3001/api/files/upload");

        xhr.upload.onprogress = function (event) {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percent);
          }
        };

        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText || "{}"));
          } else {
            reject(
              new Error(
                `Erro ao enviar arquivo: ${xhr.status} - ${xhr.statusText}`
              )
            );
          }
        };

        xhr.onerror = () => reject(new Error("Erro de rede durante o upload"));
        xhr.onabort = () => reject(new Error("Upload abortado"));

        xhr.send(formData);
      });

      try {
        await uploadPromise;

        toast({
          title: "Sucesso ✅",
          description: "Arquivo enviado e adicionado à biblioteca!",
        });

        // Notifica o componente pai para atualizar a lista
        if (onFileAdded) {
          onFileAdded();
        }

        // Limpa o formulário
        setShowForm(false);
        setAssunto("");
        setTurma("");
        setMateria("");
        setDetalhes("");
        setArquivo(null);

      } catch (err) {
        toast({
          title: "Erro",
          description: err.message || "Erro no upload",
        });

      } finally {
        setUploading(false);
        setUploadProgress(0);
        xhrRef.current = null;
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: error.message || "Erro inesperado",
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="glass-effect" style={{ backgroundColor: "#153c4b" }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl font-bold flex items-center gap-2 text-white">
            <FileText className="w-6 h-6 text-[#edbf21]" />
            Seus Assuntos
          </CardTitle>

          <Button
            variant="outline"
            className="bg-[#edbf21] border-2 border-[#edbf21] text-[#153c4b] font-bold rounded-full hover:scale-105 transition"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="w-4 h-4 mr-1" /> 
            {showForm ? "Fechar" : "Adicionar Assunto"}
          </Button>
        </CardHeader>

        {showForm && (
          <CardContent>
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div>
                <label className="text-sm font-medium text-white">Assunto</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                  <Input
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    placeholder="Nome do conteúdo"
                    className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/60"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Turma</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                  <Input
                    value={turma}
                    onChange={(e) => setTurma(e.target.value)}
                    placeholder="Ex: 7º Ano B"
                    className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/60"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Matéria</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                  <Input
                    value={materia}
                    onChange={(e) => setMateria(e.target.value)}
                    placeholder="Ex: Matemática"
                    className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/60"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Detalhes</label>
                <Input
                  value={detalhes}
                  onChange={(e) => setDetalhes(e.target.value)}
                  placeholder="Descrição do arquivo"
                  className="h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/60"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-white">
                  Upload do PDF
                </label>

                <div className="relative">
                  <label
                    className="
                      flex flex-col items-center justify-center 
                      w-full h-48 cursor-pointer
                      bg-white/10 border-2 border-dashed border-white/40 
                      rounded-xl text-white text-center transition
                      hover:bg-white/20
                    "
                  >
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setArquivo(e.target.files[0])}
                      className="hidden"
                      required
                    />

                    <FileText className="w-10 h-10 mb-2 text-white/70" />

                    <span className="font-medium text-white/80">
                      Clique para fazer upload ou arraste seu arquivo PDF aqui
                    </span>

                    <span className="text-xs text-white/50 mt-1">
                      Tamanho máximo: 10MB
                    </span>
                  </label>
                </div>

                {arquivo && (
                  <div className="mt-3 bg-white/20 text-white px-4 py-2 rounded-lg flex items-center justify-between">
                    <span className="truncate">{arquivo.name}</span>
                    <button
                      type="button"
                      className="text-red-400 font-bold ml-4 hover:text-red-300"
                      onClick={() => setArquivo(null)}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {uploading && (
                <div className="flex items-center justify-center space-x-4 px-2 py-4 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 border-4 border-white/30 border-t-[#edbf21] rounded-full animate-spin" />
                  <p className="text-white text-sm font-medium">
                    Enviando... {uploadProgress}%
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent text-white border-white/30 hover:bg-white/10"
                    onClick={cancelUpload}
                  >
                    Cancelar
                  </Button>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  size="lg"
                  disabled={uploading}
                  className="flex-1 bg-[#edbf21] text-[#153c4b] font-bold rounded-full hover:bg-[#edbf21]/90 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "Enviando..." : "Adicionar à Biblioteca"}
                </Button>
                
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setAssunto("");
                    setTurma("");
                    setMateria("");
                    setDetalhes("");
                    setArquivo(null);
                  }}
                  className="bg-white/10 text-white border-white/30 font-bold rounded-full hover:bg-white/20 transition"
                >
                  Cancelar
                </Button>
              </div>
            </motion.form>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default FileList;