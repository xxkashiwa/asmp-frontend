import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Enterprise } from '@/models/enterprise';
import { EnterpriseForm } from './enterprise-form';

interface EnterpriseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Enterprise) => Promise<void>;
  initialData?: Enterprise;
  title: string;
  description: string;
}

export function EnterpriseDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  description,
}: EnterpriseDialogProps) {
  const handleSubmit = async (formData: Enterprise) => {
    await onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <EnterpriseForm onSubmit={handleSubmit} initialData={initialData} />
      </DialogContent>
    </Dialog>
  );
}
