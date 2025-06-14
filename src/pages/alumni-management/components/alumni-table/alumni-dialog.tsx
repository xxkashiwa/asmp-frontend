import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alumni } from '@/models/alumni';
import { useState } from 'react';
import { AlumniForm } from './alumni-form';

interface AlumniDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Alumni) => void;
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
  const handleSubmit = (data: {
    studentId: string;
    realName: string;
    gender: 'MALE' | 'FEMALE';
    dateOfBirth: string;
    address?: string;
    companyName?: string;
    currentJob?: string;
    addedAt?: string;
  }) => {
    setIsLoading(true);
    try {
      // Ensure addedAt is always a string before passing to onSubmit
      const alumniData: Alumni = {
        ...data,
        addedAt: data.addedAt || new Date().toISOString(),
        address: data.address || '',
        companyName: data.companyName || '',
        currentJob: data.currentJob || '',
      };

      onSubmit(alumniData);
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
