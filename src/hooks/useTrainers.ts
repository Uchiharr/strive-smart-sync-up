
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;
type TrainerProfile = Tables<'trainer_profiles'>;

export const useTrainers = () => {
  const [trainers, setTrainers] = useState<(Profile & { trainer_profile?: TrainerProfile })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          trainer_profile:trainer_profiles(*)
        `)
        .eq('user_type', 'trainer');

      if (error) throw error;
      setTrainers(data || []);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    trainers,
    loading,
    refetch: fetchTrainers
  };
};
