
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TrainerDashboard from '@/components/TrainerDashboard';
import ClientDashboard from '@/components/ClientDashboard';
import FeatureOverview from '@/components/FeatureOverview';
import { Users, Brain, Dumbbell, MessageSquare, Calendar, BarChart } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

const Index = () => {
  const { profile, loading } = useProfile();
  const [currentView, setCurrentView] = useState('overview');

  // Set the appropriate view based on user type
  React.useEffect(() => {
    if (profile?.user_type === 'trainer') {
      setCurrentView('trainer');
    } else if (profile?.user_type === 'client') {
      setCurrentView('client');
    } else {
      setCurrentView('overview');
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If user has a specific type, show only their dashboard
  if (profile?.user_type === 'trainer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Brain className="w-8 h-8" />
                <h1 className="text-4xl font-bold">EvolveCoach Pro</h1>
              </div>
              <p className="text-xl mb-8 text-blue-100">
                The AI-Powered Coaching Platform That Transforms Personal Training
              </p>
              <div className="mb-6">
                <Badge variant="secondary" className="bg-white/20 text-white text-lg px-4 py-2">
                  Welcome back, {profile.full_name}! (Trainer)
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <TrainerDashboard />
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="w-6 h-6" />
              <span className="text-xl font-semibold">EvolveCoach Pro</span>
            </div>
            <p className="text-slate-400 mb-4">
              Empowering personal trainers with AI-driven coaching tools
            </p>
            <div className="flex justify-center gap-6 text-sm text-slate-400">
              <span>Feature-Rich Dashboard</span>
              <span>•</span>
              <span>AI-Powered Insights</span>
              <span>•</span>
              <span>Seamless Client Management</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (profile?.user_type === 'client') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Brain className="w-8 h-8" />
                <h1 className="text-4xl font-bold">EvolveCoach Pro</h1>
              </div>
              <p className="text-xl mb-8 text-blue-100">
                The AI-Powered Coaching Platform That Transforms Personal Training
              </p>
              <div className="mb-6">
                <Badge variant="secondary" className="bg-white/20 text-white text-lg px-4 py-2">
                  Welcome back, {profile.full_name}! (Client)
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <ClientDashboard />
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="w-6 h-6" />
              <span className="text-xl font-semibold">EvolveCoach Pro</span>
            </div>
            <p className="text-slate-400 mb-4">
              Empowering personal trainers with AI-driven coaching tools
            </p>
            <div className="flex justify-center gap-6 text-sm text-slate-400">
              <span>Feature-Rich Dashboard</span>
              <span>•</span>
              <span>AI-Powered Insights</span>
              <span>•</span>
              <span>Seamless Client Management</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Default overview for users without a specific type
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Brain className="w-8 h-8" />
              <h1 className="text-4xl font-bold">EvolveCoach Pro</h1>
            </div>
            <p className="text-xl mb-8 text-blue-100">
              The AI-Powered Coaching Platform That Transforms Personal Training
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <Dumbbell className="w-4 h-4 mr-1" />
                Smart Workout Generation
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <MessageSquare className="w-4 h-4 mr-1" />
                AI Check-in Analysis
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                <BarChart className="w-4 h-4 mr-1" />
                Progress Analytics
              </Badge>
            </div>
            
            <Tabs value={currentView} onValueChange={setCurrentView} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-white/10 backdrop-blur-sm">
                <TabsTrigger value="overview" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="trainer" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600">
                  Trainer View
                </TabsTrigger>
                <TabsTrigger value="client" className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600">
                  Client View
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={currentView} onValueChange={setCurrentView}>
          <TabsContent value="overview">
            <FeatureOverview />
          </TabsContent>
          
          <TabsContent value="trainer">
            <TrainerDashboard />
          </TabsContent>
          
          <TabsContent value="client">
            <ClientDashboard />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-6 h-6" />
            <span className="text-xl font-semibold">EvolveCoach Pro</span>
          </div>
          <p className="text-slate-400 mb-4">
            Empowering personal trainers with AI-driven coaching tools
          </p>
          <div className="flex justify-center gap-6 text-sm text-slate-400">
            <span>Feature-Rich Dashboard</span>
            <span>•</span>
            <span>AI-Powered Insights</span>
            <span>•</span>
            <span>Seamless Client Management</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
