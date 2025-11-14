import React, { useState } from "react";
import FilterBar from "@/components/FilterBar"; // ⬅️ import do filtro

const ProfessorHome = () => {
  // estados e opções do filtro ⬇️
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const grades = ["6º ano", "7º ano", "8º ano", "9º ano"];
  const subjects = [
    "Matemática",
    "Português",
    "Ciências",
    "História",
    "Geografia",
    "Inglês",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold text-[#153c4b] mb-10 text-center">
        Área do Professor
      </h1>

      {/* Filtro adicionado no mesmo alinhamento */}
      <div className="max-w-5xl mx-auto mb-12">
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGrade={selectedGrade}
          setSelectedGrade={setSelectedGrade}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          grades={grades}
          subjects={subjects}
        />
      </div>
    </div>
  );
};

export default ProfessorHome;
