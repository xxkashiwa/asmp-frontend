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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  title: z.string().min(1, '请输入活动名称'),
  type: z.string().min(1, '请选择活动类型'),
  startDate: z.string().min(1, '请选择开始日期'),
  endDate: z.string().min(1, '请选择结束日期'),
  location: z.string().min(1, '请输入活动地点'),
  description: z.string().min(1, '请输入活动描述'),
  organizer: z.string().min(1, '请输入活动组织方'),
  status: z.enum(['upcoming','ongoing', 'completed', 'cancelled']),
  maxParticipants: z.number().min(1, '请输入最大参与人数'),
  registrationDeadline: z.string().min(1, '请选择报名截止日期'),
});

type EventFormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  initialData?: Partial<EventFormValues>;
  onSubmit: (data: EventFormValues) => void;
  onCancel: () => void;
}

export function EventForm({
  initialData,
  onSubmit,
  onCancel,
}: EventFormProps) {
  const defaultValues: Partial<EventFormValues> = initialData ?
   {
    title: initialData.title,
    description: initialData.description,
    startDate: initialData.startDate,
    endDate: initialData.endDate,
    location: initialData.location,
    organizer: initialData.organizer,
    status: initialData.status,
    maxParticipants: initialData.maxParticipants,
    registrationDeadline: initialData.registrationDeadline,
    type: initialData.type,
  } :{
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    organizer: '',
    status: 'upcoming',
    maxParticipants: 0,
    registrationDeadline: '',
    type: 'reunion',
  };

  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活动名称</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活动类型</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择活动类型" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="reunion">校友聚会</SelectItem>
                  <SelectItem value="lecture">讲座</SelectItem>
                  <SelectItem value="seminar">研讨会</SelectItem>
                  <SelectItem value="workshop">工作坊</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="organizer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活动组织方</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem> 
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>开始日期</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>结束日期</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活动地点</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>活动描述</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="maxParticipants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>最大参与人数</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationDeadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>报名截止日期</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>活动状态</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择活动状态" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="draft">草稿</SelectItem>
                  <SelectItem value="published">已发布</SelectItem>
                  <SelectItem value="registration">报名中</SelectItem>
                  <SelectItem value="in_progress">进行中</SelectItem>
                  <SelectItem value="completed">已结束</SelectItem>
                  <SelectItem value="cancelled">已取消</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            取消
          </Button>
          <Button type="submit">提交</Button>
        </div>
      </form>
    </Form>
  );
}