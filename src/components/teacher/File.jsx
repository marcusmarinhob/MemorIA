import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, User, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getAuth } from "firebase/auth";

const FileList = () => {
  const [fileList, setFileList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [assunto, setAssunto] = useState("");
  const [turma, setTurma] = useState("");
  const [materia, setMateria] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [arquivo, setArquivo] = useState(null);

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

      const res = await fetch("http://localhost:3001/api/files/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        toast({
          title: "Sucesso",
          description: "Arquivo enviado com sucesso!",
        });

        const fileURL = URL.createObjectURL(arquivo);
        const newFile = {
          contentName: assunto,
          classroom: turma,
          subject: materia,
          details: detalhes,
          fileURL,
        };
        setFileList([...fileList, newFile]);

        setShowForm(false);
        setAssunto("");
        setTurma("");
        setMateria("");
        setDetalhes("");
        setArquivo(null);
      } else {
        const errorMsg = data.error || "Erro ao processar o PDF";
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível enviar o arquivo.",
      });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="glass-effect" style={{ backgroundColor: "#153c4b" }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl font-bold flex items-center gap-2 text-white">
            <FileText className="w-6 h-6 text-[#edbf21]" />
            Seus arquivos
          </CardTitle>
          <Button
            variant="outline"
            size="md"
            className="bg-[#edbf21] border-2 border-[#edbf21] text-[#153c4b] text-sm sm:text-base px-6 py-2 font-bold rounded-full flex items-center justify-center hover:scale-105 hover:bg-[#f5d64f] transition-transform duration-300 w-auto mt-2"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Novo arquivo
          </Button>
        </CardHeader>

        {showForm && (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block text-white">
                Assunto
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" />
                <Input
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  placeholder="Nome do conteúdo"
                  className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/70 border-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block text-white">
                Turma
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" />
                <Input
                  value={turma}
                  onChange={(e) => setTurma(e.target.value)}
                  placeholder="Ex: 6 Ano B"
                  className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/70 border-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block text-white">
                Matéria
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white" />
                <Input
                  value={materia}
                  onChange={(e) => setMateria(e.target.value)}
                  placeholder="Ex: Matemática"
                  className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/70 border-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block text-white">
                Detalhes
              </label>
              <Input
                value={detalhes}
                onChange={(e) => setDetalhes(e.target.value)}
                placeholder="Descrição do arquivo"
                className="h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/70 border-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block text-white">
                Arquivo PDF
              </label>
              <Input
                type="file"
                accept="application/pdf"
                onChange={(e) => setArquivo(e.target.files[0])}
                className="h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/70 border-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="bg-[#153c4b]  text-[#edbf21] text-2xl sm:text-2xl px-8 sm:px-16 py-4 sm:py-6 font-bold rounded-full flex items-center justify-center 
             hover:bg-[#edbf21] hover:text-[#153c4b] hover:scale-105 transition duration-300 mx-auto"
            >
              Enviar
            </Button>
          </form>
        )}

        <CardContent className="space-y-4">
          {fileList.map((file, index) => (
            <div key={index} className="p-4 bg-white/10 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-white">
                    {file.contentName}
                  </h3>
                  <p className="text-white/70 text-sm">{file.subject}</p>
                </div>
              </div>

              <div className="flex space-x-2 mt-3">
                <Button
                  variant="outline"
                  size="md"
                  className="bg-[#edbf21] border-2 border-[#edbf21] text-[#153c4b] px-6 py-2 font-bold rounded-full hover:scale-105 hover:bg-[#f5d64f] transition-transform duration-300"
                  onClick={() =>
                    toast({
                      title: "Detalhes do arquivo",
                      description: file.details,
                    })
                  }
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FileList;