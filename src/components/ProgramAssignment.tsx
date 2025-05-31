
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  difficulty_level: string;
  exercises: any;
}

interface Client {
  id: string;
  full_name: string;
}

interface ProgramAssignmentProps {
  isOpen: boolean;
  onClose: () => void;
  templateId?: string;
  templateName?: string;
}

const ProgramAssignment: React.FC<ProgramAssignmentProps> = ({ 
  isOpen, 
  onClose, 
  templateId, 
  templateName 
}) => {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(templateId || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchClients();
      if (!templateId) {
        fetchTemplates();
      }
    }
  }, [isOpen, templateId]);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .select(`
          id,
          profiles!inner(full_name)
        `)
        .eq('trainer_id', user?.id);

      if (error) throw error;
      
      const clientList = data?.map(item => ({
        id: item.id,
        full_name: item.profiles?.full_name || 'Unknown Client'
      })) || [];
      
      setClients(clientList);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to load clients');
    }
  };

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('workout_programs')
        .select('*')
        .eq('trainer_id', user?.id)
        .eq('is_template', true);

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to load workout templates');
    }
  };

  const assignProgram = async () => {
    if (!selectedClient || !selectedTemplate) {
      toast.error('Please select both a client and a workout template');
      return;
    }

    setLoading(true);
    try {
      // Get the template data
      const { data: template, error: templateError } = await supabase
        .from('workout_programs')
        .select('*')
        .eq('id', selectedTemplate)
        .single();

      if (templateError) throw templateError;

      // Create a new workout program for the client
      const { error: assignError } = await supabase
        .from('workout_programs')
        .insert({
          name: template.name,
          description: template.description,
          difficulty_level: template.difficulty_level,
          exercises: template.exercises,
          trainer_id: user?.id,
          client_id: selectedClient,
          is_template: false
        });

      if (assignError) throw assignError;

      const clientName = clients.find(c => c.id === selectedClient)?.full_name;
      toast.success(`Program "${template.name}" assigned to ${clientName}!`);
      onClose();
    } catch (error) {
      console.error('Error assigning program:', error);
      toast.error('Failed to assign program');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Assign Program to Client
          </DialogTitle>
          <DialogDescription>
            Select a client to assign this workout program to
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {templateId && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" />
                  <span className="font-medium">{templateName}</span>
                  <Badge variant="secondary">Template</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {!templateId && (
            <div>
              <label className="block text-sm font-medium mb-2">Select Workout Template</label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a workout template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name} - {template.difficulty_level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Select Client</label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.length === 0 ? (
                  <SelectItem value="no-clients" disabled>
                    No clients available
                  </SelectItem>
                ) : (
                  clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.full_name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {clients.length === 0 && (
            <div className="text-center p-4 text-slate-600">
              <Users className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <p className="text-sm">No clients yet. Accept some trainer requests first!</p>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={assignProgram} 
              disabled={loading || !selectedClient || !selectedTemplate || clients.length === 0}
              className="flex-1"
            >
              {loading ? 'Assigning...' : 'Assign Program'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramAssignment;
