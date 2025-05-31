
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type WorkoutProgram = Tables<'workout_programs'>;

export const useWorkouts = () => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<WorkoutProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  const fetchWorkouts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('workout_programs')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorkouts(data || []);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createWorkout = async (workout: Omit<WorkoutProgram, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: 'User not authenticated' };

    const { error } = await supabase
      .from('workout_programs')
      .insert(workout);

    if (!error) {
      await fetchWorkouts();
    }

    return { error };
  };

  return {
    workouts,
    loading,
    createWorkout,
    refetch: fetchWorkouts
  };
};
