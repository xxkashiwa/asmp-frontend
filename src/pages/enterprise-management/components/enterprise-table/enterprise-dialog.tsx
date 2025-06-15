import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Enterprise } from '@/models/enterprise';
import { EnterpriseForm } from './enterprise-form';
import { useState } from 'react';
interface EnterpriseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Enterprise) => Promise<void>;
  enterprise?: Enterprise;
  title: string;
  description: string;
}

export function EnterpriseDialog({
  isOpen,
  onClose,
  onSubmit,
  enterprise,
  title,
  description,
}: EnterpriseDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (data: {
    id: string,
    name: string;
    field: string;
    address: string;
    contactPerson: string;
    contactEmail: string;
    contactPhone: string;
    addedAt?: string;
  }) => {
    setIsLoading(true);
    try {
      // Ensure addedAt is always a string before passing to onSubmit
      const enterpriseData = {
        ...data,
        addedAt: data.addedAt || new Date().toISOString(),
      };
      
      await onSubmit(enterpriseData);
      onClose();
    } catch (error) {
      console.error('Failed to submit enterprise:', error);
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
        <EnterpriseForm
          initialData={enterprise}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}