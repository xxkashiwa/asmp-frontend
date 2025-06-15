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
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const activityFormSchema = z.object({
  title: z.string().min(1, '请输入活动标题'),
  location: z.string().min(1, '请输入活动地点'),
  startTime: z.string().min(1, '请选择开始时间'),
  endTime: z.string().min(1, '请选择结束时间'),
  description: z.string().min(1, '请输入活动简介'),
  maxParticipants: z.coerce.number().min(1, '请输入最大参与人数'),
  status: z.enum(['NOT_STARTED', 'STARTED', 'FINISHED'], {
    required_error: '请选择活动状态',
  }),
});

type ActivityFormValues = z.infer<typeof activityFormSchema>;

interface ActivityFormProps {
  activity?: Activity;
  onSubmit: (data: ActivityFormValues) => void;
}

export function ActivityForm({ activity, onSubmit }: ActivityFormProps) {
  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: '',
      location: '',
      startTime: '',
      endTime: '',
      description: '',
      maxParticipants: 0,
      status: 'NOT_STARTED',
    },
  });

  useEffect(() => {
    if (activity) {
      form.reset({
        title: activity.title || '',
        location: activity.location || '',
        startTime: activity.startTime || '',
        endTime: activity.endTime || '',
        description: activity.description || '',
        maxParticipants: activity.maxParticipants || 0,
        status: activity.status || 'NOT_STARTED',
      });
    }
  }, [activity, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>开始时间 *</FormLabel>
                <FormControl>
                  <Input {...field} type="datetime-local" />
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
                  <Input {...field} type="datetime-local" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活动简介 *</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="请输入活动简介" rows={3} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择活动状态" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NOT_STARTED">未开始</SelectItem>
                  <SelectItem value="STARTED">进行中</SelectItem>
                  <SelectItem value="FINISHED">已结束</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          提交
        </Button>
      </form>
    </Form>
  );
}
