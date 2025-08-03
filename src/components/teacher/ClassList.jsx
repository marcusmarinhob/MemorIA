import React from 'react';
import { motion } from 'framer-motion';
import { Users, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ClassList = ({ classes }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="glass-effect">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Suas Turmas
          </CardTitle>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            onClick={() => toast({
              title: "Nova Turma",
              description: "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
            })}
          >
            <Plus className="w-4 h-4 mr-1" />
            Nova Turma
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {classes.map((classData, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white text-lg">{classData.name}</h3>
                  <p className="text-white/70 text-sm">{classData.students} alunos</p>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="secondary">Média: {classData.averageGrade}</Badge>
                  {classData.needsAttention > 0 && (
                    <Badge className="bg-yellow-500 text-white">
                      {classData.needsAttention} atenção
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/70 text-sm">Engajamento</span>
                    <span className="text-white text-sm">{classData.engagement}%</span>
                  </div>
                  <Progress value={classData.engagement} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/70 text-sm">Conclusão</span>
                    <span className="text-white text-sm">{classData.completionRate}%</span>
                  </div>
                  <Progress value={classData.completionRate} />
                </div>
              </div>
              
              <div className="flex space-x-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => toast({
                    title: "Ver Detalhes",
                    description: "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
                  })}
                >
                  Ver Detalhes
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => toast({
                    title: "Relatório",
                    description: "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
                  })}
                >
                  Relatório
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClassList;