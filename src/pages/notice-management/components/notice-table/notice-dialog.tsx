import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Notice } from '@/models/notice';
import { useState } from 'react';
import { NoticeForm } from './notice-form';

interface NoticeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Notice) => void;
  notice?: Notice;
  title: string;
  description: string;
}

export function NoticeDialog({
  isOpen,
  onClose,
  onSubmit,
  notice,
  title,
  description,
}: NoticeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Notice) => {
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
        <NoticeForm
          initialData={notice}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}