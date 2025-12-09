import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import ClassList from "@/components/teacher/ClassList";
import FileList from "@/components/teacher/File";
import TeacherPersonalLibrary from "@/components/teacher/TeacherPersonalLibrary";
import { buscarDadosUsuario } from "../lib/firestore";
import { onAuthStateChange } from "../lib/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const TeacherArea = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState([]);

  // Função para carregar arquivos do professor
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
    const unsubscribe = onAuthStateChange((user) => {
      if (!user) {
        window.location.href = "/login";
        return;
      }

      setCurrentUser(user);

      const fetchUserData = async () => {
        const userDataResult = await buscarDadosUsuario(user.uid);
        let userName = "professor";
        let userMateria = "materia";

        if (userDataResult.success) {
          userName = userDataResult.data.nome || "professor";
          userMateria = userDataResult.data.materia || "materia";
        }

        setTeacherData({
          teacher: {
            uid: user.uid,
            name: userName.toUpperCase(),
            subject: userMateria.toUpperCase(),
            school: "Escola Cidadã Integral Técnica (ECIT) Severino Cabral",
          },
          classes: [],
        });

        setLoading(false);
      };

      fetchUserData();
    });

    return () => unsubscribe();
  }, []);

  // Carregar arquivos quando o usuário for autenticado
  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) carregarArquivos(user.uid);
      else setFileList([]);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#edbf21] mx-auto"></div>
          <p className="mt-4 text-[#ffffff]/85">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!teacherData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#ffffff]/85">Erro ao carregar dados.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Área do Professor - MemorIA</title>
        <meta
          name="description"
          content="Área exclusiva para professores acompanharem o progresso das turmas, receberem insights da IA e personalizarem o ensino."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col items-center pt-24 pb-16 px-4">
        <Navigation />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mt-8" style={{ color: "#edbf21" }}>
            Área do Professor
          </h1>
          <p className="text-2xl font-bold mt-2 text-white">
            Bem-vindo, {teacherData.teacher.name} - {teacherData.teacher.subject}
          </p>
          <p className="text-white">{teacherData.teacher.school}</p>
        </motion.div>

        {/* Formulário para adicionar novos assuntos */}
        <div className="w-full max-w-3xl mb-8">
          <FileList onFileAdded={() => carregarArquivos(currentUser?.uid)} />
        </div>

        {/* Biblioteca pessoal do professor */}
        <div className="w-full max-w-3xl mb-8">
          <TeacherPersonalLibrary 
            fileList={fileList}
            onRefresh={() => carregarArquivos(currentUser?.uid)}
          />
        </div>

        {/* Lista de turmas */}
        <div className="w-full max-w-3xl">
          <ClassList classes={teacherData.classes} />
        </div>
      </div>
    </>
  );
};

export default TeacherArea;