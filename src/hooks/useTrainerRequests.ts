
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type TrainerRequest = Tables<'trainer_requests'>;
type Profile = Tables<'profiles'>;

export const useTrainerRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<(TrainerRequest & { trainer?: Profile; client?: Profile })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('trainer_requests')
        .select(`
          *,
          trainer:profiles!trainer_requests_trainer_id_fkey (
            id,
            full_name,
            email,
            user_type,
            avatar_url,
            created_at,
            updated_at
          ),
          client:profiles!trainer_requests_client_id_fkey (
            id,
            full_name,
            email,
            user_type,
            avatar_url,
            created_at,
            updated_at
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching trainer requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendTrainerRequest = async (trainerId: string, message?: string) => {
    if (!user) return { error: 'User not authenticated' };

    const { error } = await supabase
      .from('trainer_requests')
      .insert({
        client_id: user.id,
        trainer_id: trainerId,
        message: message || null
      });

    if (!error) {
      await fetchRequests();
    }

    return { error };
  };

  const updateRequestStatus = async (requestId: string, status: 'approved' | 'rejected') => {
    if (!user) return { error: 'User not authenticated' };

    const { error } = await supabase
      .from('trainer_requests')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', requestId);

    if (!error) {
      await fetchRequests();
      
      // If approved, update client's trainer_id
      if (status === 'approved') {
        const request = requests.find(r => r.id === requestId);
        if (request) {
          await supabase
            .from('client_profiles')
            .update({ trainer_id: request.trainer_id })
            .eq('id', request.client_id);
        }
      }
    }

    return { error };
  };

  return {
    requests,
    loading,
    sendTrainerRequest,
    updateRequestStatus,
    refetch: fetchRequests
  };
};
