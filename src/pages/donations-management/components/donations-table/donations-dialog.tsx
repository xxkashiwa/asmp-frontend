import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Donation } from '@/types';
import { DonationForm } from './donations-form';

interface DonationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Donation, 'id'>) => Promise<void>;
  donation?: Donation;
  title: string;
  description: string;
}
//添加捐赠对话框
export function DonationDialog({
  isOpen,
  onClose,
  onSubmit,
  donation,
  title,
  description,
}: DonationDialogProps) {
  const handleSubmit = async (data: Omit<Donation, 'id'>) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error('Failed to submit donation', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DonationForm donation={donation} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}