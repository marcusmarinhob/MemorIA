import React from "react";
import { Search, ChevronDown, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const FilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedGrade,
  setSelectedGrade,
  selectedSubject,
  setSelectedSubject,
  grades,
  subjects,
}) => {
  return (
    <div className="rounded-2xl p-6 mb-12 bg-white shadow-md">
      <div className="grid md:grid-cols-4 gap-4">
        {/* Campo de busca */}
        <div className="relative h-12 flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-gray-500" />
          <Input
            placeholder="Buscar conteúdo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 h-12 rounded-full bg-[#acf9f2] text-[#153c4b] border-none shadow-sm focus:ring-2 focus:ring-[#153c4b]"
          />
        </div>

        {/* Select de série */}
        <div className="relative h-12 flex items-center">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="w-full px-4 h-12 rounded-full bg-[#acf9f2] text-[#153c4b] appearance-none border-none shadow-sm focus:ring-2 focus:ring-[#153c4b]"
          >
            <option value="all">Todas as séries</option>
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#153c4b] pointer-events-none" />
        </div>

        {/* Select de matéria */}
        <div className="relative h-12 flex items-center">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-4 h-12 rounded-full bg-[#acf9f2] text-[#153c4b] appearance-none border-none shadow-sm focus:ring-2 focus:ring-[#153c4b]"
          >
            <option value="all">Todas as matérias</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#153c4b] pointer-events-none" />
        </div>

        {/* Botão de filtros */}
        <div className="h-12 flex items-center">
          <Button
            className="w-full h-12 bg-[#153c4b] text-white font-bold rounded-full hover:bg-[#0d2a38] hover:scale-105 transition-all duration-300 flex items-center justify-center"
            onClick={() =>
              toast({
                title: "Filtros Avançados",
                description:
                  "🚧 Esta funcionalidade ainda não está implementada — mas você pode adicioná-la facilmente!",
              })
            }
          >
            <Filter className="w-5 h-5 mr-2 text-white" />
            Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
