
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Users, Dumbbell, MessageSquare, Calendar, BarChart, Video, Palette } from 'lucide-react';

const FeatureOverview = () => {
  const trainerFeatures = [
    {
      icon: Users,
      title: "Client Dashboard",
      description: "Comprehensive client management with progress tracking, messaging, and check-ins",
      aiPowered: true
    },
    {
      icon: Dumbbell,
      title: "AI Program Builder",
      description: "Drag-and-drop workout creation with AI-generated plans and template saving",
      aiPowered: true
    },
    {
      icon: MessageSquare,
      title: "Smart Check-In System",
      description: "Weekly client prompts with AI-generated summaries and personalized feedback",
      aiPowered: true
    },
    {
      icon: Calendar,
      title: "Automated Messaging",
      description: "Welcome flows, progress nudges, and review triggers powered by AI",
      aiPowered: true
    },
    {
      icon: Video,
      title: "Video Call Integration",
      description: "Host calls with AI transcription and automatic personalized plan generation",
      aiPowered: true
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Upload logos, set brand colors, and customize communication tone",
      aiPowered: false
    }
  ];

  const clientFeatures = [
    {
      icon: Dumbbell,
      title: "Mobile Dashboard",
      description: "Access workouts, track progress, and mark completed sessions",
      aiPowered: false
    },
    {
      icon: MessageSquare,
      title: "Weekly Check-Ins",
      description: "Answer progress questions and receive AI-powered feedback",
      aiPowered: true
    },
    {
      icon: BarChart,
      title: "Progress Analytics",
      description: "Visual graphs and analytics powered by AI insights",
      aiPowered: true
    },
    {
      icon: Video,
      title: "Form Review Upload",
      description: "Upload training videos for AI analysis and PT feedback",
      aiPowered: true
    }
  ];

  return (
    <div className="space-y-12">
      {/* Product Summary */}
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Product Summary
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          CoachAI Pro is a comprehensive coaching platform that combines the power of artificial intelligence 
          with intuitive design to revolutionize personal training. Our platform automates repetitive tasks, 
          provides data-driven insights, and enables trainers to focus on what they do best - coaching and 
          building relationships with their clients.
        </p>
      </div>

      {/* Trainer Features */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-8 h-8 text-blue-600" />
          <h3 className="text-2xl font-bold text-slate-800">For Personal Trainers</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainerFeatures.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {feature.aiPowered && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500">
                  <Brain className="w-3 h-3 mr-1" />
                  AI
                </Badge>
              )}
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Client Features */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <Dumbbell className="w-8 h-8 text-purple-600" />
          <h3 className="text-2xl font-bold text-slate-800">For Clients</h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientFeatures.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {feature.aiPowered && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500">
                  <Brain className="w-3 h-3 mr-1" />
                  AI
                </Badge>
              )}
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Capabilities Highlight */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-8 h-8 text-purple-600" />
            <h3 className="text-2xl font-bold text-slate-800">AI-Powered Features</h3>
          </div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our advanced AI engine powers intelligent automation across the platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-blue-600" />
                Workout Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                AI analyzes client goals, fitness level, and preferences to generate personalized workout plans
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                Check-in Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Automatically summarizes client responses and generates actionable feedback and recommendations
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-purple-600" />
                Progress Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Tracks progress patterns and provides predictive analytics for goal achievement
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeatureOverview;
