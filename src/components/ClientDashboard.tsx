
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, Play, BarChart, MessageSquare, Calendar, Brain, Users } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useWorkouts } from '@/hooks/useWorkouts';
import TrainerSearch from '@/components/TrainerSearch';
import TrainerRequests from '@/components/TrainerRequests';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const ClientDashboard = () => {
  const { profile, clientProfile } = useProfile();
  const { workouts, loading: workoutsLoading } = useWorkouts();
  const [completedExercises, setCompletedExercises] = useState<boolean[]>([]);
  
  // Check if client has a trainer - moved before useState that uses it
  const hasTrainer = clientProfile?.trainer_id;
  const [activeTab, setActiveTab] = useState(hasTrainer ? "today" : "trainer");
  const [selectedFeeling, setSelectedFeeling] = useState<number | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<string | null>(null);

  // Get today's workout (most recent one)
  const todayWorkout = workouts.length > 0 ? workouts[0] : null;
  
  React.useEffect(() => {
    if (todayWorkout?.exercises) {
      try {
        const exercises = Array.isArray(todayWorkout.exercises) 
          ? todayWorkout.exercises 
          : JSON.parse(todayWorkout.exercises as string);
        setCompletedExercises(new Array(exercises.length).fill(false));
      } catch (error) {
        console.error('Error parsing exercises:', error);
        setCompletedExercises([]);
      }
    }
  }, [todayWorkout]);

  const toggleExercise = (index: number) => {
    const newCompleted = [...completedExercises];
    newCompleted[index] = !newCompleted[index];
    setCompletedExercises(newCompleted);
  };

  const getExercises = () => {
    if (!todayWorkout?.exercises) return [];
    try {
      return Array.isArray(todayWorkout.exercises) 
        ? todayWorkout.exercises 
        : JSON.parse(todayWorkout.exercises as string);
    } catch (error) {
      console.error('Error parsing exercises:', error);
      return [];
    }
  };

  const exercises = getExercises();

  const handleSubmitCheckIn = async () => {
    if (!selectedFeeling || !selectedEnergy) {
      toast.error('Please complete all check-in questions');
      return;
    }

    if (!hasTrainer) {
      toast.error('You need to connect with a trainer first');
      return;
    }

    try {
      const responses = {
        feeling: selectedFeeling,
        energy: selectedEnergy,
        timestamp: new Date().toISOString()
      };

      const { error } = await supabase
        .from('check_ins')
        .insert({
          client_id: profile?.id,
          trainer_id: clientProfile?.trainer_id,
          responses: JSON.stringify(responses),
          week_number: Math.ceil(new Date().getDate() / 7) // Simple week calculation
        });

      if (error) throw error;

      toast.success('Check-in submitted successfully! Your trainer will review your feedback.');
      setSelectedFeeling(null);
      setSelectedEnergy(null);
    } catch (error) {
      console.error('Error submitting check-in:', error);
      toast.error('Failed to submit check-in');
    }
  };

  const handleEnergySelect = (energy: string) => {
    setSelectedEnergy(energy);
  };

  const handleFeelingSelect = (index: number) => {
    setSelectedFeeling(index);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Welcome back, {profile?.full_name || 'there'}!
        </h2>
        <p className="text-slate-600">
          {hasTrainer 
            ? "Ready for today's workout? You're doing amazing!" 
            : "Let's find you a personal trainer to get started!"
          }
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-5">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="checkin">Check-in</TabsTrigger>
          <TabsTrigger value="trainer">Trainer</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          {!hasTrainer ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Trainer Assigned</h3>
                <p className="text-slate-600 mb-6">
                  You need to connect with a personal trainer to get customized workouts and guidance.
                </p>
                <Button onClick={() => setActiveTab("trainer")}>
                  Find a Trainer
                </Button>
              </CardContent>
            </Card>
          ) : workoutsLoading ? (
            <Card>
              <CardContent className="p-8">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-32 bg-slate-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ) : !todayWorkout ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Workout Today</h3>
                <p className="text-slate-600">
                  Your trainer hasn't assigned a workout for today yet. Check back later!
                </p>
              </CardContent>
            </Card>
          ) : (
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
                        <CardDescription>
                          {todayWorkout.description || 'Assigned by your trainer'}
                        </CardDescription>
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600">
                        Today's Workout
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {exercises.map((exercise: any, index: number) => (
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
                                {exercise.name || `Exercise ${index + 1}`}
                              </h4>
                              <p className="text-sm text-slate-600">
                                {exercise.sets || exercise.reps || exercise.duration || 'See instructions'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {exercises.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">
                            Progress: {completedExercises.filter(Boolean).length}/{completedExercises.length} exercises
                          </span>
                          <Progress 
                            value={exercises.length > 0 ? (completedExercises.filter(Boolean).length / completedExercises.length) * 100 : 0} 
                            className="w-32" 
                          />
                        </div>
                      </div>
                    )}
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
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                        <div key={index} className="text-center">
                          <div className="text-xs text-slate-600 mb-1">{day}</div>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index < 3 ? 'bg-green-500 text-white' : 'bg-slate-200'
                          }`}>
                            {index < 3 && <CheckCircle className="w-4 h-4" />}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{workouts.length}/7</div>
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
                      "Great job staying consistent! Every workout brings you closer to your goals. 
                      Keep up the excellent work! 💪"
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Workouts Assigned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{workouts.length}</div>
                <p className="text-sm text-slate-600">Total programs</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {workouts.length > 0 ? Math.round((completedExercises.filter(Boolean).length / completedExercises.length) * 100) || 0 : 0}%
                </div>
                <p className="text-sm text-slate-600">This workout</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">3</div>
                <p className="text-sm text-slate-600">Days active</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Goal Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {workouts.length > 0 ? Math.min(workouts.length * 10, 100) : 0}%
                </div>
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
                      <button 
                        key={index} 
                        className={`text-2xl p-2 rounded-lg transition-colors ${
                          selectedFeeling === index ? 'bg-blue-100 border-2 border-blue-500' : 'hover:bg-slate-100'
                        }`}
                        onClick={() => handleFeelingSelect(index)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Energy levels compared to last week?</h4>
                  <div className="flex gap-2">
                    {['Much Lower', 'Lower', 'Same', 'Higher', 'Much Higher'].map((energy) => (
                      <Button 
                        key={energy}
                        variant={selectedEnergy === energy ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => handleEnergySelect(energy)}
                      >
                        {energy}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">AI Insight Preview</h4>
                  <p className="text-sm text-blue-800">
                    Based on your responses, the AI will analyze your patterns and provide 
                    personalized recommendations for next week's training and nutrition.
                  </p>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  disabled={!hasTrainer || !selectedFeeling || !selectedEnergy}
                  onClick={handleSubmitCheckIn}
                >
                  {hasTrainer ? 'Submit Check-in' : 'Connect with a trainer first'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trainer" className="space-y-6">
          <TrainerSearch />
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <TrainerRequests />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;
