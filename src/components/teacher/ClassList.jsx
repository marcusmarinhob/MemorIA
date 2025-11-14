import React from "react";
import { motion } from "framer-motion";
import { Users, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ClassList = ({ classes }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="glass-effect" style={{ backgroundColor: "#153c4b" }}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl font-bold flex items-center gap-2 text-white">
            <Users className="w-6 h-6 text-[#edbf21]" />
            Suas Turmas
          </CardTitle>
          <Button
            variant="outline"
            size="md"
            className="
              bg-[#edbf21] 
              border-2 border-[#edbf21] 
              text-[#153c4b] 
              text-sm sm:text-base
              px-6 py-2
              font-bold 
              rounded-full 
              flex items-center justify-center 
              hover:scale-105 hover:bg-[#f5d64f] 
              transition-transform duration-300
              w-auto
              mt-2
            "
            onClick={() =>
              toast({
                title: "Nova Turma",
                description:
                  "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
              })
            }
          >
            <Plus className="w-4 h-4 mr-1" />
            Nova Turma
          </Button>
        </CardHeader>
        {/*
        <CardContent className="space-y-4">
          {classes.map((classData, index) => (
            <div key={index} className="p-4 bg-white/10 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-white">
                    {classData.name}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {classData.students} alunos
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Badge
                    variant="outline"
                    className="border-[#edbf21] text-[#edbf21] bg-transparent"
                  >
                    Média: {classData.averageGrade}
                  </Badge>
                  {classData.needsAttention > 0 && (
                    <Badge className="bg-yellow-500 text-[#153c4b] font-semibold">
                      {classData.needsAttention} atenção
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/70 text-sm">Engajamento</span>
                    <span className="text-white font-medium text-sm">
                      {classData.engagement}%
                    </span>
                  </div>
                  <Progress value={classData.engagement} className="bg-white/20" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/70 text-sm">Conclusão</span>
                    <span className="text-white font-medium text-sm">
                      {classData.completionRate}%
                    </span>
                  </div>
                  <Progress value={classData.completionRate} className="bg-white/20" />
                </div>
              </div>

              <div className="flex space-x-2 mt-3">
                <Button
                  variant="outline"
                  size="md"
                  className="
                    bg-[#edbf21] 
                    border-2 border-[#edbf21] 
                    text-[#153c4b] 
                    text-sm sm:text-base
                    px-6 py-2
                    font-bold 
                    rounded-full 
                    flex items-center justify-center 
                    hover:scale-105 hover:bg-[#f5d64f]
                    transition-transform duration-300
                    w-auto
                    mt-2
                  "
                  onClick={() =>
                    toast({
                      title: "Ver Detalhes",
                      description:
                        "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
                    })
                  }
                >
                  Ver Detalhes
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="
                    bg-[#edbf21] 
                    border-2 border-[#edbf21] 
                    text-[#153c4b] 
                    text-sm sm:text-base
                    px-6 py-2
                    font-bold 
                    rounded-full 
                    flex items-center justify-center 
                    hover:scale-105 hover:bg-[#f5d64f]
                    transition-transform duration-300
                    w-auto
                    mt-2
                  "
                  onClick={() =>
                    toast({
                      title: "Relatório",
                      description:
                        "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
                    })
                  }
                >
                  Relatório
                </Button>
              </div>
            </div>
          ))}
        </CardContent> 
        */}
      </Card>
    </motion.div>
  );
}; 

export default ClassList;
