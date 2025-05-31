import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Users, Plus, MessageSquare, Calendar, Dumbbell, BarChart, Brain } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import TrainerRequests from '@/components/TrainerRequests';

const TrainerDashboard = () => {
  const { profile } = useProfile();
  const [activeTab, setActiveTab] = useState('requests');

  // This would be replaced with real data from hooks
  const clients: any[] = []; // Will be populated when we implement client fetching
  const workoutTemplates = [
    { name: "HIIT Beginner", exercises: 8, duration: "25 min", aiGenerated: true },
    { name: "Strength Upper Body", exercises: 12, duration: "45 min", aiGenerated: false },
    { name: "Cardio Blast", exercises: 6, duration: "30 min", aiGenerated: true },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Welcome, {profile?.full_name || 'Trainer'}!
          </h2>
          <p className="text-slate-600">Manage your clients and programs with AI assistance</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Program
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
          <TrainerRequests />
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                My Clients
              </CardTitle>
              <CardDescription>Track your client progress and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              {clients.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">No Clients Yet</h3>
                  <p className="text-slate-500 mb-6">
                    When clients request you as their trainer and you accept, they'll appear here.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveTab('requests')}
                  >
                    Check Requests
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {client.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold">{client.name}</h3>
                          <p className="text-sm text-slate-600">Last check-in: {client.lastCheckIn}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">{client.progress}%</div>
                          <Progress value={client.progress} className="w-16" />
                        </div>
                        <Badge variant="secondary">Active</Badge>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-dashed border-2 border-slate-300 hover:border-blue-500 cursor-pointer transition-colors">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <Brain className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">AI Generate Workout</h3>
                <p className="text-sm text-slate-600 mb-4">Let AI create a personalized workout plan</p>
                <Button variant="outline">Generate with AI</Button>
              </CardContent>
            </Card>
            
            {workoutTemplates.map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Dumbbell className="w-5 h-5" />
                      {template.name}
                    </CardTitle>
                    {template.aiGenerated && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                        <Brain className="w-3 h-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Exercises:</span>
                      <span>{template.exercises}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Duration:</span>
                      <span>{template.duration}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                    <Button size="sm" className="flex-1">Assign</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{clients.length}</div>
                <p className="text-sm text-green-600">Active clients</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">0</div>
                <p className="text-sm text-slate-600">Programs created</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">0</div>
                <p className="text-sm text-slate-600">Generated this week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Client Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">--</div>
                <p className="text-sm text-slate-600">Average rating</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainerDashboard;
