import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Donations } from '@/models/donations';
import { DonationForm } from './donations-form';

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Donations) => Promise<void>;
  donation?: Donations;
  title: string;
  description: string;
}

export function DonationDialog({
  isOpen,
  onClose,
  onSubmit,
  donation,
  title,
  description,
}: DonationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DonationForm
          onSubmit={onSubmit}
          defaultValues={donation}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}