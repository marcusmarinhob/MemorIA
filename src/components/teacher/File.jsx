import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, File, Globe, Link, X, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { getAuth } from "firebase/auth";

const FileList = () => {
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [assunto, setAssunto] = useState("");
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

    if (!assunto || !selectedMode) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o assunto e escolha um meio de gerar.",
      });
      return;
    }

    if (selectedMode === "pdf" && pdfs.length === 0) {
      toast({
        title: "Arquivo PDF",
        description: "Por favor, adicione pelo menos um arquivo PDF.",
      });
      return;
    }

    if (selectedMode === "url" && urls.length === 0) {
      toast({
        title: "URL",
        description: "Por favor, adicione pelo menos uma URL.",
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
        name: assunto,
        pdfs,
        urls,
        mode: selectedMode,
        createdAt: new Date(),
      };

      setSubjects([...subjects, newSubject]);

      toast({
        title: "Sucesso",
        description: "Assunto criado com sucesso!",
      });

      setShowForm(false);
      setAssunto("");
      setPdfs([]);
      setUrls([]);
      setCurrentUrl("");
      setSelectedMode(null);
    } catch (error) {
      console.error("Erro ao criar assunto:", error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível criar o assunto.",
      });
    }
  };

  const isFormValid =
    assunto &&
    selectedMode &&
    ((selectedMode === "pdf" && pdfs.length > 0) ||
      (selectedMode === "url" && urls.length > 0));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <Card className="glass-effect" style={{ backgroundColor: "#153c4b" }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl font-bold flex items-center gap-2 text-white">
            <FileText className="w-6 h-6 text-[#edbf21]" />
            Assuntos
          </CardTitle>

          <Button
            variant="outline"
            size="md"
            className="bg-[#edbf21] border-2 border-[#edbf21] text-[#153c4b] text-sm sm:text-base px-6 py-2 font-bold rounded-full flex items-center justify-center hover:scale-105 hover:bg-[#f5d64f] transition-transform duration-300 w-auto mt-2"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? (
              <>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1" />
                Novo Assunto
              </>
            )}
          </Button>
        </CardHeader>

        {showForm && (
          <div className="p-6 space-y-6">
            {/* Assunto */}
            <div className="space-y-2">
              <label className="text-sm font-medium mb-2 block text-white">Assunto</label>
              <Input
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                placeholder="Digite seu tópico ou cole seu texto"
                className="h-12 rounded-full bg-white/40 text-[#153c4b] placeholder:text-[#153c4b]/70 border-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Seleção de modo */}
            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block text-white">Meios de gerar</label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* PDF */}
                <button
                  type="button"
                  onClick={() => setSelectedMode(selectedMode === "pdf" ? null : "pdf")}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    selectedMode === "pdf"
                      ? "border-purple-400 bg-purple-500/20"
                      : "border-white/20 bg-white/10 hover:border-white/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        selectedMode === "pdf" ? "bg-purple-500/30" : "bg-white/10"
                      }`}
                    >
                      <File
                        className={`h-6 w-6 ${
                          selectedMode === "pdf" ? "text-purple-300" : "text-white"
                        }`}
                      />
                    </div>

                    <div>
                      <div className="font-medium text-white">PDF</div>
                      <div className="text-sm text-white/70">Gerar cards a partir do seu PDF</div>
                    </div>
                  </div>
                </button>

                {/* URL */}
                <button
                  type="button"
                  onClick={() => setSelectedMode(selectedMode === "url" ? null : "url")}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    selectedMode === "url"
                      ? "border-blue-400 bg-blue-500/20"
                      : "border-white/20 bg-white/10 hover:border-white/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        selectedMode === "url" ? "bg-blue-500/30" : "bg-white/10"
                      }`}
                    >
                      <Globe
                        className={`h-6 w-6 ${
                          selectedMode === "url" ? "text-blue-300" : "text-white"
                        }`}
                      />
                    </div>

                    <div>
                      <div className="font-medium text-white">URL</div>
                      <div className="text-sm text-white/70">Gerar cards a partir de um URL</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* UPLOAD PDF */}
            {selectedMode === "pdf" && (
              <div className="space-y-4">
                <label className="text-sm font-medium mb-2 block text-white">Upload do PDF</label>

                <div className="border-2 border-dashed border-white/30 rounded-xl p-8 bg-white/5">
                  <div className="flex flex-col items-center justify-center text-center">
                    <File className="h-12 w-12 text-white/60 mb-4" />
                    <p className="text-white mb-1">Clique para fazer upload ou arraste seu arquivo PDF aqui</p>
                    <p className="text-sm text-white/60 mb-4">Tamanho máximo: 10MB</p>

                    <Input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={handlePdfChange}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label htmlFor="pdf-upload" className="cursor-pointer">
                      <span className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-white/20 text-white border border-white/30 hover:bg-white/30 h-10 px-4 py-2">
                        Escolher arquivo
                      </span>
                    </label>
                  </div>
                </div>

                {pdfs.length > 0 && (
                  <div className="space-y-2">
                    {pdfs.map((pdf, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white/10 border border-white/20 p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <File className="h-4 w-4 text-purple-400 flex-shrink-0" />
                          <span className="text-sm text-white truncate">{pdf.name}</span>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removePdf(index)}
                          className="text-white hover:bg-white/20 flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* URL */}
            {selectedMode === "url" && (
              <div className="space-y-4">
                <label className="text-sm font-medium mb-2 block text-white">Inserir URL</label>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                      <Input
                        type="url"
                        placeholder="https://exemplo.com/artigo"
                        value={currentUrl}
                        onChange={(e) => setCurrentUrl(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
                        className="bg-white/20 border-white/30 pl-10 text-white placeholder:text-white/60"
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={addUrl}
                      className="bg-white/20 text-white border border-white/30 hover:bg-white/30"
                    >
                      Adicionar
                    </Button>
                  </div>

                  <p className="text-sm text-white/70">
                    Cole o link de um artigo, página da web ou documento online
                  </p>
                </div>

                {urls.length > 0 && (
                  <div className="space-y-2">
                    {urls.map((url, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white/10 border border-white/20 p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Globe className="h-4 w-4 text-blue-400 flex-shrink-0" />
                          <span className="text-sm text-white truncate">{url}</span>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeUrl(index)}
                          className="text-white hover:bg-white/20 flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Botão final */}
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full bg-[#edbf21] text-[#153c4b] text-lg px-8 py-6 font-bold rounded-full hover:bg-[#f5d64f] hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar novo assunto
            </Button>
          </div>
        )}

        {/* Lista de assuntos */}
        {!showForm && (
          <CardContent className="space-y-4">
            {subjects.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-lg">Nenhum assunto criado ainda</p>
                <p className="text-white/40 text-sm mt-2">
                  Clique em "Novo Assunto" para começar
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/10 rounded-xl border border-white/20 hover:bg-white/15 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg text-white truncate">
                        {subject.name}
                      </h3>
                      <Badge
                        className={`${
                          subject.mode === "pdf"
                            ? "bg-purple-500/30 text-purple-200"
                            : "bg-blue-500/30 text-blue-200"
                        } border-0`}
                      >
                        {subject.mode === "pdf" ? "PDF" : "URL"}
                      </Badge>
                    </div>

                    {/* PDFs */}
                    {subject.pdfs.length > 0 && (
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-400" />
                          <span className="text-sm font-medium text-white/80">
                            PDFs: {subject.pdfs.length}
                          </span>
                        </div>

                        <div className="space-y-1">
                          {subject.pdfs.slice(0, 2).map((pdf, pdfIndex) => (
                            <div
                              key={pdfIndex}
                              className="text-xs bg-purple-500/20 border border-purple-400/30 p-2 rounded truncate text-white/70"
                            >
                              {pdf.name}
                            </div>
                          ))}

                          {subject.pdfs.length > 2 && (
                            <p className="text-xs text-white/50">
                              +{subject.pdfs.length - 2} mais
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* URLs */}
                    {subject.urls.length > 0 && (
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2">
                          <Link className="h-4 w-4 text-blue-400" />
                          <span className="text-sm font-medium text-white/80">
                            URLs: {subject.urls.length}
                          </span>
                        </div>

                        <div className="space-y-1">
                          {subject.urls.slice(0, 2).map((url, urlIndex) => (
                            <a
                              key={urlIndex}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs bg-blue-500/20 border border-blue-400/30 p-2 rounded block truncate hover:bg-blue-500/30 text-white/70 transition-colors"
                            >
                              {url}
                            </a>
                          ))}

                          {subject.urls.length > 2 && (
                            <p className="text-xs text-white/50">
                              +{subject.urls.length - 2} mais
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Ações */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1 bg-[#edbf21] text-[#153c4b] hover:bg-[#f5d64f] font-semibold"
                        size="sm"
                        onClick={() =>
                          toast({
                            title: "Gerar Jogo",
                            description: "🚧 Esta funcionalidade está em desenvolvimento! 🚀",
                          })
                        }
                      >
                        Gerar Jogo
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                        onClick={() =>
                          toast({
                            title: "Editar",
                            description: "🚧 Esta funcionalidade está em desenvolvimento! 🚀",
                          })
                        }
                      >
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default FileList;
