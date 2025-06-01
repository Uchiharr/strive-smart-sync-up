
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TrainerDashboard from '@/components/TrainerDashboard';
import ClientDashboard from '@/components/ClientDashboard';
import FeatureOverview from '@/components/FeatureOverview';
import { Brain, Dumbbell, MessageSquare, BarChart } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { profile, loading: profileLoading } = useProfile();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  console.log('Index component rendered');
  console.log('Auth user:', user);
  console.log('Profile:', profile);
  console.log('Auth loading:', authLoading);
  console.log('Profile loading:', profileLoading);

  // Show loading while auth is initializing
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If user is not authenticated, show overview with sign in button
  if (!user) {
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
              
              {/* Sign In / Sign Up Button */}
              <div className="mb-8">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8 py-4"
                  onClick={() => navigate('/auth')}
                >
                  Sign In / Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Only Overview */}
        <div className="container mx-auto px-4 py-12">
          <FeatureOverview />
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

  // If user is authenticated but profile is loading or doesn't exist yet
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // If user has trainer type, show trainer dashboard
  if (profile.user_type === 'trainer') {
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

  // If user has client type, show client dashboard
  if (profile.user_type === 'client') {
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

  // Fallback for unknown user types - show overview
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
                Welcome, {profile.full_name}!
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <FeatureOverview />
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
        </footer>
      </div>
    );
  }
};

export default Index;
