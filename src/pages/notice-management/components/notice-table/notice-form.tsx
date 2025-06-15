import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  title: z.string().min(1, { message: '请输入标题' }),
  content: z.string().min(1, { message: '请输入内容' }),
  type: z.enum(['news', 'announcement', 'notice'], {
    required_error: '请选择通知类型',
  }),
});

export type NoticeFormValues = z.infer<typeof formSchema>;

interface NoticeFormProps {
  defaultValues: Partial<NoticeFormValues>;
  onSubmit: (data: NoticeFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function NoticeForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting,
}: NoticeFormProps) {
  const form = useForm<NoticeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>标题</FormLabel>
              <FormControl>
                <Input placeholder="请输入通知标题" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>内容</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="请输入通知内容"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>类型</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="选择通知类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="news">新闻</SelectItem>
                  <SelectItem value="announcement">公告</SelectItem>
                  <SelectItem value="notice">通知</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            取消
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '提交中...' : '提交'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
