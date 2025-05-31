
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, MessageSquare } from 'lucide-react';
import { useTrainerRequests } from '@/hooks/useTrainerRequests';
import { useProfile } from '@/hooks/useProfile';
import { toast } from 'sonner';

const TrainerRequests = () => {
  const { requests, loading, updateRequestStatus } = useTrainerRequests();
  const { profile } = useProfile();

  const handleUpdateStatus = async (requestId: string, status: 'approved' | 'rejected') => {
    const { error } = await updateRequestStatus(requestId, status);
    
    if (error) {
      toast.error('Failed to update request: ' + error.message);
    } else {
      toast.success(`Request ${status} successfully!`);
    }
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

  const filteredRequests = profile?.user_type === 'trainer' 
    ? requests.filter(r => r.trainer_id === profile.id)
    : requests.filter(r => r.client_id === profile?.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          {profile?.user_type === 'trainer' ? 'Client Requests' : 'My Trainer Requests'}
        </CardTitle>
        <CardDescription>
          {profile?.user_type === 'trainer' 
            ? 'Manage incoming requests from potential clients'
            : 'Track your requests to connect with trainers'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <p className="text-center text-slate-600 py-8">
              No requests at the moment.
            </p>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">
                        {profile?.user_type === 'trainer' 
                          ? request.client?.full_name 
                          : request.trainer?.full_name
                        }
                      </h3>
                      <Badge variant={
                        request.status === 'approved' ? 'default' :
                        request.status === 'rejected' ? 'destructive' : 'secondary'
                      }>
                        {request.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {request.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {request.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                        {request.status}
                      </Badge>
                    </div>
                    
                    {request.message && (
                      <p className="text-sm text-slate-700 mb-3 bg-slate-50 p-3 rounded">
                        "{request.message}"
                      </p>
                    )}
                    
                    <p className="text-xs text-slate-500">
                      {new Date(request.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  {profile?.user_type === 'trainer' && request.status === 'pending' && (
                    <div className="flex gap-2 ml-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleUpdateStatus(request.id, 'rejected')}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Decline
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleUpdateStatus(request.id, 'approved')}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainerRequests;
