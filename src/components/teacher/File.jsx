import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, User, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const FileList = () => {
  const [fileList, setFileList] = useState([]);
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
          title: "Sucesso",
          description: "Arquivo enviado com sucesso!",
        });

        await carregarArquivos();

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

  const carregarArquivos = async (uid) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const professorUid = uid || (user && user.uid);
      if (!professorUid) return;

      const res = await fetch(
        `http://localhost:3001/api/files?professor_uid=${professorUid}`
      );
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.success && Array.isArray(json.data)) {
        const ownerKeys = [
          "professor_uid",
          "professorUid",
          "ownerId",
          "userId",
          "uid",
          "created_by",
        ];

        const filtered = json.data.filter((a) =>
          ownerKeys.some((k) => a[k] === professorUid)
        );

        const mapped = filtered.map((a) => ({
          id: a.id,
          contentName: a.assunto || "Sem título",
          classroom: a.turma || "",
          subject: a.materia || "",
          details: a.detalhes || "",
          markdown: a.markdown || null,
          created_at: a.created_at,
        }));

        setFileList(mapped);
      }
    } catch (err) {
      console.error("Erro ao carregar arquivos:", err);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) carregarArquivos(user.uid);
      else setFileList([]);
    });

    return () => unsub();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="glass-effect" style={{ backgroundColor: "#153c4b" }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl font-bold flex items-center gap-2 text-white">
            <FileText className="w-6 h-6 text-[#edbf21]" />
            Seus arquivos
          </CardTitle>

          <Button
            variant="outline"
            className="bg-[#edbf21] border-2 border-[#edbf21] text-[#153c4b] font-bold rounded-full hover:scale-105 transition"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="w-4 h-4 mr-1" /> Novo arquivo
          </Button>
        </CardHeader>

        {showForm && (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Assunto</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                <Input
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  placeholder="Nome do conteúdo"
                  className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b]"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white">Turma</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white" />
                <Input
                  value={turma}
                  onChange={(e) => setTurma(e.target.value)}
                  placeholder="Ex: 7º Ano B"
                  className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b]"
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
                  className="pl-10 h-12 rounded-full bg-white/40 text-[#153c4b]"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-white">Detalhes</label>
              <Input
                value={detalhes}
                onChange={(e) => setDetalhes(e.target.value)}
                placeholder="Descrição do arquivo"
                className="h-12 rounded-full bg-white/40 text-[#153c4b]"
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
        className="text-red-400 font-bold ml-4"
        onClick={() => setArquivo(null)}
      >
        X
      </button>
    </div>
  )}
</div>


            {uploading && (
              <div className="flex items-center justify-center space-x-4 px-2">
                <div className="w-8 h-8 border-4 border-white/30 border-t-[#edbf21] rounded-full animate-spin" />
                <p className="text-white text-sm">Enviando... {uploadProgress}%</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent text-white border-white/30"
                  onClick={cancelUpload}
                >
                  Cancelar
                </Button>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="bg-[#153c4b] text-[#edbf21] font-bold rounded-full hover:bg-[#edbf21] hover:text-[#153c4b] transition mx-auto px-12 py-4 text-xl"
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

              <Button
                variant="outline"
                className="bg-[#edbf21] text-[#153c4b] font-bold rounded-full hover:scale-105 transition"
                onClick={() =>
                  toast({
                    title: "Detalhes do arquivo",
                    description: file.details,
                  })
                }
              >
                Ver detalhes
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FileList;