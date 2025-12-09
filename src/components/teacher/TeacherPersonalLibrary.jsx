import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Play, Edit, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useContent } from "@/context/ContentContext";

const TeacherPersonalLibrary = ({ fileList, onRefresh }) => {
  const navigate = useNavigate();
  const { setSelectedContent } = useContent();

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

    navigate("/teacher/memory");
  };

  const handleEdit = (file) => {
    toast({
      title: "Função não implementada",
      description: "A edição do arquivo será adicionada em breve.",
    });
  };

  const handleDelete = async (file) => {
    toast({
      title: "Função não implementada",
      description: "A exclusão do arquivo será adicionada em breve.",
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="glass-effect" style={{ backgroundColor: "#153c4b" }}>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2 text-white">
            <BookOpen className="w-6 h-6 text-[#edbf21]" />
            Biblioteca Pessoal
          </CardTitle>
          <p className="text-white/70 text-sm mt-2">
            Seus materiais didáticos salvos e processados
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {fileList.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70">
                Nenhum material adicionado ainda.
              </p>
              <p className="text-white/50 text-sm mt-2">
                Use o botão "Adicionar Assunto" acima para começar.
              </p>
            </div>
          ) : (
            fileList.map((file, index) => (
              <motion.div
                key={file.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/10 rounded-lg hover:bg-white/15 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-white mb-1">
                      {file.contentName}
                    </h3>
                    <div className="flex gap-2 flex-wrap mb-2">
                      <Badge className="bg-[#edbf21] text-[#153c4b]">
                        {file.subject}
                      </Badge>
                      <Badge className="bg-white/20 text-white">
                        {file.classroom}
                      </Badge>
                    </div>
                    {file.details && (
                      <p className="text-white/60 text-sm line-clamp-2">
                        {file.details}
                      </p>
                    )}
                  </div>
                  
                  {file.markdown && (
                    <Badge className="bg-green-500/20 text-green-300 ml-2">
                      Processado
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {/* JOGAR */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-green-500 text-white font-bold rounded-full hover:scale-105 hover:bg-green-600 transition"
                    onClick={() => handlePlayGame(file)}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Jogar
                  </Button>

                  {/* VER DETALHES */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#edbf21] text-[#153c4b] font-bold rounded-full hover:scale-105 transition"
                    onClick={() =>
                      toast({
                        title: "Detalhes do arquivo",
                        description: file.details || "Sem detalhes adicionais.",
                      })
                    }
                  >
                    Ver detalhes
                  </Button>

                  {/* EDITAR */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-500 text-white font-bold rounded-full hover:scale-105 hover:bg-blue-600 transition"
                    onClick={() => handleEdit(file)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>

                  {/* EXCLUIR */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-600 text-white font-bold rounded-full hover:scale-105 hover:bg-red-700 transition"
                    onClick={() => handleDelete(file)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Excluir
                  </Button>
                </div>

                {file.created_at && (
                  <p className="text-white/40 text-xs mt-3">
                    Adicionado em: {new Date(file.created_at).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </motion.div>
            ))
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TeacherPersonalLibrary;