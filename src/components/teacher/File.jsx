import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, User, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// 🔥 ADICIONADO:
import { useNavigate } from "react-router-dom";
import { useContent } from "@/context/ContentContext";

const FileList = () => {
  const navigate = useNavigate();
  const { setSelectedContent } = useContent();

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

  // 🔥 ADICIONADO — Função que leva ao jogo:
  const handlePlayGame = (file) => {
    if (!file.markdown) {
      toast({
        title: "Erro ⚠️",
        description: "Este arquivo ainda não foi processado.",
      });
      return;
    }

    setSelectedContent({
      title: file.contentName,
      subject: file.subject,
      grade: file.classroom,
      markdown: file.markdown,
    });

    const auth = getAuth();
    const user = auth.currentUser;

    // ➜ Depois você pode checar role do user
    navigate("/teacher/memory");
  };

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

        {/* ... FORM permanece igual ... */}

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

              <div className="flex gap-2">
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

                {/* 🔥 BOTÃO JOGAR ADICIONADO */}
                <Button
                  variant="outline"
                  className="bg-green-500 text-white font-bold rounded-full hover:scale-105 transition"
                  onClick={() => handlePlayGame(file)}
                >
                  🎮 Jogar
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
