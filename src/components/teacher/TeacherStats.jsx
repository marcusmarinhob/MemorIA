import React from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, BarChart3, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TeacherStats = ({ stats }) => {
  const statItems = [
    {
      icon: Users,
      value: stats.totalStudents,
      label: "Total de Alunos",
      color: "text-yellow-400", 
    },
    {
      icon: GraduationCap,
      value: stats.activeClasses,
      label: "Turmas Ativas",
      color: "text-purple-400",
    },
    {
      icon: BarChart3,
      value: (
        stats.classes.reduce((acc, cls) => acc + cls.averageGrade, 0) /
        stats.classes.length
      ).toFixed(1),
      label: "Média Geral",
      color: "text-green-400",
    },
    {
      icon: AlertTriangle,
      value: stats.classes.reduce((acc, cls) => acc + cls.needsAttention, 0),
      label: "Precisam de Atenção",
      color: "text-red-400",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <Card
              className="glass-effect rounded-2xl"
              style={{ backgroundColor: "#153c4b" }} 
            >
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/10 rounded-full p-3">
                    <Icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                </div>

                <div className="text-2xl font-bold text-white mb-2">
                  {item.value}
                </div>
                <p className="text-white/80 text-sm">{item.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TeacherStats;
