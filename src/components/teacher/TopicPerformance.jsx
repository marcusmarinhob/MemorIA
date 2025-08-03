import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const getDifficultyColor = (difficulty) => {
  if (difficulty >= 70) return 'text-red-400';
  if (difficulty >= 50) return 'text-yellow-400';
  return 'text-green-400';
};

const TopicPerformance = ({ topics }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Performance por Tópico
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">{topic.topic}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getDifficultyColor(topic.difficulty)}`}>
                    {topic.difficulty}% dificuldade
                  </span>
                  <Badge variant="outline" className="border-white/30 text-white">
                    {topic.studentsStruggling} com dificuldade
                  </Badge>
                </div>
              </div>
              <Progress value={100 - topic.difficulty} />
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TopicPerformance;