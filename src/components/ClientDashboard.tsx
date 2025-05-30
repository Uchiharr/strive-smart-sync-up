
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, Play, BarChart, MessageSquare, Calendar, Brain } from 'lucide-react';

const ClientDashboard = () => {
  const [completedExercises, setCompletedExercises] = useState([false, true, false, true, false]);

  const todayWorkout = {
    name: "Upper Body Strength",
    duration: "45 min",
    exercises: [
      { name: "Push-ups", sets: "3x12", completed: false },
      { name: "Dumbbell Press", sets: "3x10", completed: true },
      { name: "Pull-ups", sets: "3x8", completed: false },
      { name: "Bicep Curls", sets: "3x12", completed: true },
      { name: "Tricep Dips", sets: "3x10", completed: false },
    ]
  };

  const weeklyProgress = [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: false },
    { day: "Thu", completed: true },
    { day: "Fri", completed: false },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
  ];

  const toggleExercise = (index) => {
    const newCompleted = [...completedExercises];
    newCompleted[index] = !newCompleted[index];
    setCompletedExercises(newCompleted);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome back, Sarah!</h2>
        <p className="text-slate-600">Ready for today's workout? You're doing amazing!</p>
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="checkin">Check-in</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Play className="w-5 h-5 text-blue-600" />
                        {todayWorkout.name}
                      </CardTitle>
                      <CardDescription>Duration: {todayWorkout.duration}</CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600">
                      Today's Workout
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todayWorkout.exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          completedExercises[index] ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleExercise(index)}
                            className="text-green-600 hover:text-green-700 transition-colors"
                          >
                            {completedExercises[index] ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <Circle className="w-6 h-6" />
                            )}
                          </button>
                          <div>
                            <h4 className={`font-medium ${completedExercises[index] ? 'line-through text-slate-500' : ''}`}>
                              {exercise.name}
                            </h4>
                            <p className="text-sm text-slate-600">{exercise.sets}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">
                        Progress: {completedExercises.filter(Boolean).length}/{completedExercises.length} exercises
                      </span>
                      <Progress value={(completedExercises.filter(Boolean).length / completedExercises.length) * 100} className="w-32" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1">
                    {weeklyProgress.map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-slate-600 mb-1">{day.day}</div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          day.completed ? 'bg-green-500 text-white' : 'bg-slate-200'
                        }`}>
                          {day.completed && <CheckCircle className="w-4 h-4" />}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold text-green-600">3/7</div>
                    <div className="text-sm text-slate-600">Workouts completed</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Brain className="w-5 h-5 text-purple-600" />
                    AI Motivation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-700">
                    "You're showing great consistency! Your strength has improved 15% this month. 
                    Keep pushing yourself - you're closer to your goals than you think! 💪"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weight Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">-8 lbs</div>
                <p className="text-sm text-green-600">This month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workouts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">23</div>
                <p className="text-sm text-slate-600">Completed this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">5</div>
                <p className="text-sm text-slate-600">Days in a row</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Goal Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">73%</div>
                <p className="text-sm text-slate-600">Monthly target</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="checkin" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Weekly Check-in
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
              </CardTitle>
              <CardDescription>Help your trainer understand your progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">How did you feel during your workouts this week?</h4>
                  <div className="flex gap-2">
                    {['😫', '😓', '😊', '💪', '🔥'].map((emoji, index) => (
                      <button key={index} className="text-2xl p-2 hover:bg-slate-100 rounded-lg transition-colors">
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Energy levels compared to last week?</h4>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Much Lower</Button>
                    <Button variant="outline" size="sm">Lower</Button>
                    <Button variant="outline" size="sm">Same</Button>
                    <Button variant="outline" size="sm">Higher</Button>
                    <Button variant="outline" size="sm">Much Higher</Button>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">AI Insight Preview</h4>
                  <p className="text-sm text-blue-800">
                    Based on your previous responses, the AI will analyze your patterns and provide 
                    personalized recommendations for next week's training and nutrition.
                  </p>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  Submit Check-in
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Your Analytics
              </CardTitle>
              <CardDescription>AI-powered insights into your fitness journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🎯 Goal Achievement Prediction</h4>
                  <p className="text-sm text-green-800">
                    Based on your current progress, you're on track to reach your weight loss goal 
                    2 weeks ahead of schedule!
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">💪 Strength Improvements</h4>
                  <p className="text-sm text-purple-800">
                    Your upper body strength has increased by 23% over the past month. 
                    Consider increasing weights for continued progress.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">⚡ Optimal Workout Times</h4>
                  <p className="text-sm text-yellow-800">
                    You perform best during morning workouts (7-9 AM). Your energy levels 
                    are 34% higher compared to evening sessions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;
