import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, BarChart3, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "Alta":
      return "bg-red-500";
    case "Média":
      return "bg-yellow-500";
    case "Baixa":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const AISuggestions = ({ suggestions }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.7 }}
  >
    <Card className="glass-effect" style={{ backgroundColor: "#57b4b1" }}>
      <CardHeader>
        <CardTitle
          className="text-3xl text-center font-bold mt-2"
          style={{ color: "#153c4b" }}
        >
          Sugestões da IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="p-3 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm text-[#153c4b]">
                {suggestion.title}
              </span>
              <Badge
                className={`${getPriorityColor(
                  suggestion.priority
                )} text-white text-xs`}
              >
                {suggestion.priority}
              </Badge>
            </div>
            <p className="text-xs text-white/70">{suggestion.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  </motion.div>
);

const RecentActivity = ({ activity }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.8 }}
  >
    <Card className="glass-effect" style={{ backgroundColor: "#57b4b1" }}>
      <CardHeader>
        <CardTitle
          className="text-3xl text-center font-bold mt-2"
          style={{ color: "#153c4b" }}
        >
          Atividade Recente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activity.map((item, index) => (
          <div key={index} className="p-3 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm text-[#153c4b]">
                {item.student}
              </span>
              {item.score && (
                <Badge variant="secondary" className="text-xs">
                  {item.score}%
                </Badge>
              )}
            </div>
            <p className="text-xs text-white/70 mb-1">{item.action}</p>
            <p className="text-xs text-white/50">{item.time}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  </motion.div>
);

const QuickActions = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.9 }}
  >
    <Card className="glass-effect" style={{ backgroundColor: "#57b4b1" }}>
      <CardHeader>
        <CardTitle
          className="text-2xl text-center font-bold mt-2"
          style={{ color: "#153c4b" }}
        >
          Ações Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10"
          onClick={() =>
            toast({
              title: "Criar Atividade",
              description:
                "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
            })
          }
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Criar Atividade
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10"
          onClick={() =>
            toast({
              title: "Relatório Geral",
              description:
                "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
            })
          }
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Relatório Geral
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10"
          onClick={() =>
            toast({
              title: "Configurações",
              description:
                "🚧 Esta funcionalidade ainda não está implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
            })
          }
        >
          <Users className="w-4 h-4 mr-2" />
          Configurações
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

const TeacherSidebar = ({ aiSuggestions, recentActivity }) => {
  return (
    <div className="space-y-6">
      <AISuggestions suggestions={aiSuggestions} />
      <RecentActivity activity={recentActivity} />
      <QuickActions />
    </div>
  );
};

export default TeacherSidebar;
