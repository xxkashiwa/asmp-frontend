import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Notice } from '@/models/notice';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { NoticeForm, NoticeFormValues } from './notice-form';

interface NoticeDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: Notice) => Promise<void>;
  initialData?: Notice;
  mode: 'add' | 'edit';
}

export function NoticeDialog({
  open,
  setOpen,
  onSubmit,
  initialData,
  mode,
}: NoticeDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = mode === 'add' ? '添加新通知' : '编辑通知';
  const description =
    mode === 'add'
      ? '创建一条新的通知、公告或新闻'
      : '编辑现有的通知、公告或新闻';

  const handleSubmit = async (data: NoticeFormValues) => {
    setIsSubmitting(true);

    try {
      // 如果是编辑模式，保留原有ID
      const submitData = {
        ...(initialData || {}),
        ...data,
        id: initialData?.id || crypto.randomUUID(),
      } as Notice;

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
    title: '',
    content: '',
    type: '' as any,
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
          <NoticeForm
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
