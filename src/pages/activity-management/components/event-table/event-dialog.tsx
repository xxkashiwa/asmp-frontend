import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Activity } from '@/models/activity';
import { useState } from 'react';
import { EventForm } from './event-form';

interface EventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Activity, 'id'>) => Promise<void>;
  title: string;
  description: string;
  event?: Activity;
}

export function EventDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  event,
}: EventDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Omit<Activity, 'id'>) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <EventForm
          event={event}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
