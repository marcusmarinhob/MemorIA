import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import ClassList from "@/components/teacher/ClassList";
import FileList from "@/components/teacher/File";
import { buscarDadosUsuario } from "../lib/firestore";
import { onAuthStateChange } from "../lib/auth";

const TeacherArea = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        let userMateria = "matéria";

        if (userDataResult.success) {
          userName = userDataResult.data.nome || "professor";
          userMateria = userDataResult.data.materia || "matéria";
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
          content="Área exclusiva para professores acessarem arquivos e turmas."
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

        <div className="w-full max-w-3xl mb-8">
          <FileList />
        </div>

        <div className="w-full max-w-3xl">
          <ClassList classes={teacherData.classes} />
        </div>
      </div>
    </>
  );
};

export default TeacherArea;