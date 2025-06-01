
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
      
      // First, let's check what profiles exist in the database
      const { data: allProfiles, error: allProfilesError } = await supabase
        .from('profiles')
        .select('*');

      console.log('All profiles in database:', allProfiles);
      
      if (allProfilesError) {
        console.error('Error fetching all profiles:', allProfilesError);
      }

      // Now get trainer profiles specifically
      const { data: trainerProfiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'trainer');

      console.log('Query executed for trainer profiles');
      console.log('Trainer profiles response:', { data: trainerProfiles, error: profilesError });

      if (profilesError) {
        console.error('Error fetching trainer profiles:', profilesError);
        throw profilesError;
      }

      if (!trainerProfiles || trainerProfiles.length === 0) {
        console.log('No trainer profiles found');
        setTrainers([]);
        setLoading(false);
        return;
      }

      console.log('Trainer profiles found:', trainerProfiles);

      // Get the trainer_profiles data for these trainers
      const trainerIds = trainerProfiles.map(p => p.id);
      console.log('Looking for trainer details for IDs:', trainerIds);
      
      const { data: trainerDetailsData, error: detailsError } = await supabase
        .from('trainer_profiles')
        .select('*')
        .in('id', trainerIds);

      console.log('Trainer details response:', { data: trainerDetailsData, error: detailsError });

      if (detailsError) {
        console.error('Error fetching trainer details:', detailsError);
        // Don't throw here, just log and continue with basic profile data
      }

      // Combine the data
      const combinedData = trainerProfiles.map(profile => {
        const trainerDetail = trainerDetailsData?.find(detail => detail.id === profile.id);
        return {
          ...profile,
          trainer_profile: trainerDetail
        };
      });

      console.log('Final combined trainer data:', combinedData);
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
