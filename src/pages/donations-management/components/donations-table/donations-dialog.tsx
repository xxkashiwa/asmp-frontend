import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Donations } from '@/models/donations';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { DonationsForm, DonationsFormValues } from './donations-form';

interface DonationsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: Donations) => Promise<void>;
  initialData?: Donations;
  mode: 'add' | 'edit';
}

export function DonationsDialog({
  open,
  setOpen,
  onSubmit,
  initialData,
  mode,
}: DonationsDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = mode === 'add' ? '添加新捐赠项目' : '编辑捐赠项目';
  const description =
    mode === 'add' ? '创建一个新的捐赠项目' : '编辑现有的捐赠项目';

  const handleSubmit = async (data: DonationsFormValues) => {
    setIsSubmitting(true);

    try {
      // 如果是编辑模式，保留原有ID和其他字段
      const submitData = {
        ...(initialData || {}),
        ...data,
        id: initialData?.id || crypto.randomUUID(),
        progress:
          data.currentAmount && data.targetAmount
            ? (data.currentAmount / data.targetAmount) * 100
            : 0,
        targetReached: data.currentAmount >= data.targetAmount,
        createdAt: initialData?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Donations;

      await onSubmit(submitData);
      setOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (!isSubmitting) {
      setOpen(false);
    }
  };

  const defaultValues = initialData || {
    name: '',
    description: '',
    targetAmount: 0,
    currentAmount: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'PENDING' as const,
    category: '',
    imageUrl: '',
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {isSubmitting ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : (
          <DonationsForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
