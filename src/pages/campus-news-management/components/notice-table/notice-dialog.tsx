import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { News } from '@/types';
import { useState } from 'react';
import { NewsForm } from './notice-form';

interface NewsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<News, 'id'>) => void;
  news?: News;
  title: string;
  description: string;
}

export function NewsDialog({
  isOpen,
  onClose,
  onSubmit,
  news,
  title,
  description,
}: NewsDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Omit<News, 'id'>) => {
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
        <NewsForm
          initialData={news}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}