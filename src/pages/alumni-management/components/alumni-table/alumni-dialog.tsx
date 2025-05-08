import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alumni } from '@/types';
import { useState } from 'react';
import { AlumniForm } from './alumni-form';

interface AlumniDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Alumni, 'id'>) => void;
  alumni?: Alumni;
  title: string;
  description: string;
}

export function AlumniDialog({
  isOpen,
  onClose,
  onSubmit,
  alumni,
  title,
  description,
}: AlumniDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Omit<Alumni, 'id'>) => {
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
        <AlumniForm
          initialData={alumni}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
