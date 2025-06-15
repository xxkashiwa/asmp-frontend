import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Partnership } from '@/types';
import { PartnershipForm } from './enterprise-form';
import { useState } from 'react';
interface PartnershipDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Partnership, 'id'>) => void;
  title: string;
  description: string;
  partnership?: Partnership;
}

export function PartnershipDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  partnership,
}: PartnershipDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (data: Omit<Partnership, 'id'>) => {
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
        <PartnershipForm
          initialData={partnership}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}