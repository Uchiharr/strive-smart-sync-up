
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, MessageSquare } from 'lucide-react';
import { useTrainers } from '@/hooks/useTrainers';
import { useTrainerRequests } from '@/hooks/useTrainerRequests';
import { toast } from 'sonner';

const TrainerSearch = () => {
  const { trainers, loading } = useTrainers();
  const { sendTrainerRequest, requests } = useTrainerRequests();
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  console.log('TrainerSearch component rendered');
  console.log('Trainers from hook:', trainers);
  console.log('Loading state:', loading);
  console.log('Requests from hook:', requests);

  const handleSendRequest = async () => {
    if (!selectedTrainer) return;

    setRequestLoading(true);
    const { error } = await sendTrainerRequest(selectedTrainer, message);
    
    if (error) {
      const errorMessage = typeof error === 'string' ? error : error?.message || 'Unknown error occurred';
      toast.error('Failed to send request: ' + errorMessage);
    } else {
      toast.success('Trainer request sent successfully!');
      setSelectedTrainer(null);
      setMessage('');
      setDialogOpen(false);
    }
    setRequestLoading(false);
  };

  const hasExistingRequest = (trainerId: string) => {
    return requests.some(r => r.trainer_id === trainerId && r.status === 'pending');
  };

  const handleRequestClick = (trainerId: string) => {
    setSelectedTrainer(trainerId);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-32 bg-slate-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Find Your Personal Trainer
        </CardTitle>
        <CardDescription>
          Connect with a certified trainer to guide your fitness journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {trainers.length === 0 ? (
            <div className="text-center text-slate-600 py-8">
              <p>No trainers available at the moment. Please check back later.</p>
              <p className="text-sm mt-2">Debug: Found {trainers.length} trainers in database</p>
            </div>
          ) : (
            trainers.map((trainer) => (
              <div key={trainer.id} className="border rounded-lg p-4 hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{trainer.full_name}</h3>
                    <p className="text-xs text-slate-500 mb-2">ID: {trainer.id}</p>
                    {trainer.trainer_profile?.business_name && (
                      <p className="text-sm text-slate-600 mb-2">{trainer.trainer_profile.business_name}</p>
                    )}
                    {trainer.trainer_profile?.bio && (
                      <p className="text-sm text-slate-700 mb-3">{trainer.trainer_profile.bio}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {trainer.trainer_profile?.specializations?.map((spec, index) => (
                        <Badge key={index} variant="secondary">{spec}</Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      {trainer.trainer_profile?.experience_years && (
                        <span>{trainer.trainer_profile.experience_years} years experience</span>
                      )}
                      {trainer.trainer_profile?.hourly_rate && (
                        <span>${trainer.trainer_profile.hourly_rate}/hour</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {hasExistingRequest(trainer.id) ? (
                      <Button disabled variant="outline">
                        Request Sent
                      </Button>
                    ) : (
                      <Button onClick={() => handleRequestClick(trainer.id)}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Trainer
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Request {trainers.find(t => t.id === selectedTrainer)?.full_name} as Your Trainer
              </DialogTitle>
              <DialogDescription>
                Send a message to introduce yourself and explain your fitness goals.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Hi! I'm interested in working with you as my personal trainer. My goals are..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSendRequest}
                  disabled={requestLoading}
                >
                  {requestLoading ? 'Sending...' : 'Send Request'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TrainerSearch;
