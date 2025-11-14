import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, File, Globe, X, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getAuth } from "firebase/auth";

const FileList = () => {
  // Agora o formulário abre sempre
  const [showForm, setShowForm] = useState(true);

  // CAMPOS NA NOVA ORDEM
  const [materia, setMateria] = useState("");
  const [assunto, setAssunto] = useState("");
  const [serie, setSerie] = useState("");
  const [descricao, setDescricao] = useState("");

  const [selectedMode, setSelectedMode] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [urls, setUrls] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");

  const handlePdfChange = (e) => {
    if (e.target.files) {
      setPdfs([...pdfs, ...Array.from(e.target.files)]);
    }
  };

  const removePdf = (index) => {
    setPdfs(pdfs.filter((_, i) => i !== index));
  };

  const addUrl = () => {
    if (currentUrl.trim()) {
      setUrls([...urls, currentUrl.trim()]);
      setCurrentUrl("");
    }
  };

  const removeUrl = (index) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!materia || !assunto || !serie || !descricao || !selectedMode) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos antes de continuar.",
      });
      return;
    }

    if (selectedMode === "pdf" && pdfs.length === 0) {
      toast({
        title: "Arquivo PDF",
        description: "Adicione pelo menos um arquivo PDF.",
      });
      return;
    }

    if (selectedMode === "url" && urls.length === 0) {
      toast({
        title: "URL",
        description: "Adicione pelo menos uma URL.",
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

      const newSubject = {
        materia,
        name: assunto,
        serie,
        descricao,
        pdfs,
        urls,
        mode: selectedMode,
        createdAt: new Date(),
      };

      console.log("Novo Assunto Criado:", newSubject);

      toast({
        title: "Sucesso",
        description: "Assunto criado com sucesso!",
      });

      setMateria("");
      setAssunto("");
      setSerie("");
      setDescricao("");
      setPdfs([]);
      setUrls([]);
      setCurrentUrl("");
      setSelectedMode(null);
    } catch (error) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível criar o assunto.",
      });
    }
  };

  const isFormValid =
    materia &&
    assunto &&
    serie &&
    descricao &&
    selectedMode &&
    ((selectedMode === "pdf" && pdfs.length > 0) ||
      (selectedMode === "url" && urls.length > 0));

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
            Assuntos
          </CardTitle>

          
        </CardHeader>

        {/* Formulário sempre visível */}
        <div className="p-6 space-y-6">
          
          {/* Matéria */}
          <div>
            <label className="text-sm font-medium text-white">Matéria</label>
            <Input
              value={materia}
              onChange={(e) => setMateria(e.target.value)}
              placeholder="Conteúdo específico da disciplina"
              className="h-12 rounded-full bg-white/40 text-[#153c4b]"
            />
          </div>

          {/* Assunto */}
          <div>
            <label className="text-sm font-medium text-white">Assunto</label>
            <Input
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              placeholder="Nome do assunto"
              className="h-12 rounded-full bg-white/40 text-[#153c4b]"
            />
          </div>

          {/* Série */}
          <div>
            <label className="text-sm font-medium text-white">Série</label>
            <Input
              value={serie}
              onChange={(e) => setSerie(e.target.value)}
              placeholder="Ex: 1º ano, 2º ano..."
              className="h-12 rounded-full bg-white/40 text-[#153c4b]"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="text-sm font-medium text-white">Descrição</label>
            <Input
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite uma descrição"
              className="h-12 rounded-full bg-white/40 text-[#153c4b]"
            />
          </div>

          {/* Seleção de modo */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-white">Meios de gerar</label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedMode("pdf")}
                className={`p-6 rounded-xl border-2 ${
                  selectedMode === "pdf"
                    ? "border-purple-400 bg-purple-500/20"
                    : "border-white/20 bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <File className="h-6 w-6 text-white" />
                  <div className="font-medium text-white">PDF</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode("url")}
                className={`p-6 rounded-xl border-2 ${
                  selectedMode === "url"
                    ? "border-blue-400 bg-blue-500/20"
                    : "border-white/20 bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-white" />
                  <div className="font-medium text-white">URL</div>
                </div>
              </button>
            </div>
          </div>

          {/* Upload PDF */}
          {selectedMode === "pdf" && (
            <div className="space-y-4">
              <label className="text-sm text-white">Upload do PDF</label>
              <Input type="file" accept=".pdf" multiple onChange={handlePdfChange} className="text-white" />

              {pdfs.map((pdf, index) => (
                <div key={index} className="flex justify-between bg-white/20 p-2 rounded">
                  <span className="text-white">{pdf.name}</span>
                  <X className="text-white cursor-pointer" onClick={() => removePdf(index)} />
                </div>
              ))}
            </div>
          )}

          {/* URLs */}
          {selectedMode === "url" && (
            <div className="space-y-4">
              <label className="text-sm text-white">Adicionar URL</label>
              <div className="flex gap-2">
                <Input
                  value={currentUrl}
                  onChange={(e) => setCurrentUrl(e.target.value)}
                  placeholder="https://exemplo.com"
                  className="bg-white/30 text-white"
                />
                <Button type="button" onClick={addUrl} className="bg-white/30 text-white">
                  Adicionar
                </Button>
              </div>

              {urls.map((u, i) => (
                <div key={i} className="flex justify-between bg-white/20 p-2 rounded">
                  <span className="text-white">{u}</span>
                  <X className="text-white cursor-pointer" onClick={() => removeUrl(i)} />
                </div>
              ))}
            </div>
          )}

          {/* BOTÃO FINAL */}
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="w-full bg-[#edbf21] text-[#153c4b] text-lg py-4 font-bold rounded-full"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar novo assunto
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default FileList;
