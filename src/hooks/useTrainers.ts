
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
      console.log('Fetching trainers...');
      
      // First, let's get all profiles with user_type = 'trainer'
      const { data: trainerProfiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'trainer');

      if (profilesError) {
        console.error('Error fetching trainer profiles:', profilesError);
        throw profilesError;
      }

      console.log('Trainer profiles found:', trainerProfiles);

      if (!trainerProfiles || trainerProfiles.length === 0) {
        console.log('No trainer profiles found');
        setTrainers([]);
        setLoading(false);
        return;
      }

      // Now get the trainer_profiles data for these trainers
      const trainerIds = trainerProfiles.map(p => p.id);
      const { data: trainerDetailsData, error: detailsError } = await supabase
        .from('trainer_profiles')
        .select('*')
        .in('id', trainerIds);

      if (detailsError) {
        console.error('Error fetching trainer details:', detailsError);
        // Don't throw here, just log and continue with basic profile data
      }

      console.log('Trainer details found:', trainerDetailsData);

      // Combine the data
      const combinedData = trainerProfiles.map(profile => {
        const trainerDetail = trainerDetailsData?.find(detail => detail.id === profile.id);
        return {
          ...profile,
          trainer_profile: trainerDetail
        };
      });

      console.log('Combined trainer data:', combinedData);
      setTrainers(combinedData);
    } catch (error) {
      console.error('Error fetching trainers:', error);
      setTrainers([]);
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
