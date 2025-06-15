import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Activity } from '@/models/activity';
import { ActivityForm } from './activity-form';

interface ActivityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Activity) => Promise<void>;
  activity?: Activity;
  title: string;
  description: string;
}

export function ActivityDialog({
  isOpen,
  onClose,
  onSubmit,
  activity,
  title,
  description,
}: ActivityDialogProps) {
  const handleSubmit = async (data: Partial<Activity>) => {
    try {
      if (activity) {
        // 编辑时保留原有ID和组织者信息
        await onSubmit({
          ...data,
          id: activity.id,
          organizer: activity.organizer,
        } as Activity);
      } else {
        // 新增时使用默认值
        // 实际应用中，这部分应该由后端生成或获取当前用户的组织
        await onSubmit({
          ...data,
          id: Math.random().toString(36).slice(2, 10), // 临时 ID，实际应由后端生成
          organizer: {
            id: '1',
            name: '西南交通大学',
            type: 'REGIONAL',
            description: '竢实扬华，自强不息',
            addedAt: new Date().toISOString(),
            state: 'ACTIVE',
            creator: {
              studentId: '2023112513',
              realName: 'Sena',
              gender: 'MALE',
              dateOfBirth: '2005.05.29',
              address: 'SanTai County',
              companyName: 'None',
              currentJob: 'None',
              addedAt: new Date().toISOString(),
            },
          },
        } as Activity);
      }
      onClose();
    } catch (error) {
      console.error('活动提交失败', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <ActivityForm activity={activity} onSubmit={handleSubmit} />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
