import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Activity } from '@/models/activity';
import { convertToOrganization } from '@/models/organization';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  title: z.string().min(1, '请输入活动名称'),
  description: z.string().min(1, '请输入活动描述'),
  startTime: z.string().min(1, '请选择开始时间'),
  endTime: z.string().min(1, '请选择结束时间'),
  location: z.string().min(1, '请输入活动地点'),
  maxParticipants: z.number().min(1, '请输入最大参与人数'),
  organizer: z.any().optional(), // Since we'll handle this separately
  status: z.enum(['NOT_STARTED', 'STARTED', 'FINISHED']),
});

type EventFormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  event?: Activity;
  onSubmit: (data: Omit<Activity, 'id'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const EventForm = ({
  event,
  onSubmit,
  onCancel,
  isLoading,
}: EventFormProps) => {
  // This is a simplified form. In a real application, you would need to handle the organizer object properly
  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event?.title || '',
      description: event?.description || '',
      startTime: event?.startTime || '',
      endTime: event?.endTime || '',
      location: event?.location || '',
      maxParticipants: event?.maxParticipants || 0,
      organizer: event?.organizer,
      status: event?.status || 'NOT_STARTED',
    },
  });

  const handleFormSubmit = (values: EventFormValues) => {
    // If this is a new event and there's no organizer info, we'll use a default one
    // In a real app, you would select an organization from a list
    const defaultOrgData = {
      id: '1',
      addedAt: new Date().toISOString(),
      name: 'Default Organization',
      type: 'REGIONAL' as const,
      description: 'Default organization description',
      creator: {
        studentId: '10000',
        realName: 'Admin',
        gender: 'MALE',
        dateOfBirth: '2000-01-01',
        address: 'Default Address',
        companyName: '',
        currentJob: '',
        addedAt: new Date().toISOString(),
      },
      state: 'ACTIVE' as const,
    };

    const organizer = values.organizer || convertToOrganization(defaultOrgData);

    onSubmit({
      ...values,
      organizer,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活动标题 *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="请输入活动标题" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>开始时间 *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="datetime-local"
                  placeholder="请选择开始时间"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>结束时间 *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="datetime-local"
                  placeholder="请选择结束时间"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活动地点 *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="请输入活动地点" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活动描述 *</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="请输入活动描述" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxParticipants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>最大参与人数 *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="请输入最大参与人数"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活动状态 *</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.value}>
                      {field.value === 'NOT_STARTED'
                        ? '未开始'
                        : field.value === 'STARTED'
                          ? '进行中'
                          : field.value === 'FINISHED'
                            ? '已完成'
                            : '选择状态'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NOT_STARTED">未开始</SelectItem>
                    <SelectItem value="STARTED">进行中</SelectItem>
                    <SelectItem value="FINISHED">已完成</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            取消
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '提交中...' : event ? '更新' : '添加'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
