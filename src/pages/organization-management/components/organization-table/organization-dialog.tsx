import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Organization } from '@/types';
import { OrganizationForm } from './organization-form';
import { useState } from 'react';

interface OrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Organization, 'id'>) => void;
  title: string;
  description: string;
  organization?: Organization;
}

export function OrganizationDialog({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  organization,
}: OrganizationDialogProps) {
  const [isLoading, setIsloading] = useState(false);
  const handleSubmit = async (data: Omit<Organization, 'id'>) => {
    setIsloading(true);
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <OrganizationForm
          initialData={organization}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}