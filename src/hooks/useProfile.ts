
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;
type TrainerProfile = Tables<'trainer_profiles'>;
type ClientProfile = Tables<'client_profiles'>;

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [trainerProfile, setTrainerProfile] = useState<TrainerProfile | null>(null);
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setTrainerProfile(null);
      setClientProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      // Fetch main profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch specific profile based on user type
      if (profileData.user_type === 'trainer') {
        const { data: trainerData, error: trainerError } = await supabase
          .from('trainer_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (trainerError) throw trainerError;
        setTrainerProfile(trainerData);
      } else if (profileData.user_type === 'client') {
        const { data: clientData, error: clientError } = await supabase
          .from('client_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (clientError) throw clientError;
        setClientProfile(clientData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (!error) {
      setProfile(prev => prev ? { ...prev, ...updates } : null);
    }

    return { error };
  };

  const updateTrainerProfile = async (updates: Partial<TrainerProfile>) => {
    if (!user) return;

    const { error } = await supabase
      .from('trainer_profiles')
      .update(updates)
      .eq('id', user.id);

    if (!error) {
      setTrainerProfile(prev => prev ? { ...prev, ...updates } : null);
    }

    return { error };
  };

  const updateClientProfile = async (updates: Partial<ClientProfile>) => {
    if (!user) return;

    const { error } = await supabase
      .from('client_profiles')
      .update(updates)
      .eq('id', user.id);

    if (!error) {
      setClientProfile(prev => prev ? { ...prev, ...updates } : null);
    }

    return { error };
  };

  return {
    profile,
    trainerProfile,
    clientProfile,
    loading,
    updateProfile,
    updateTrainerProfile,
    updateClientProfile,
    refetch: fetchProfile
  };
};
