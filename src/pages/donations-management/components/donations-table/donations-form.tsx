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
  name: z.string().min(1, { message: '请输入捐赠项目名称' }),
  description: z.string().min(1, { message: '请输入描述' }),
  targetAmount: z.coerce.number().positive({ message: '目标金额必须大于0' }),
  currentAmount: z.coerce
    .number()
    .nonnegative({ message: '当前金额不能为负数' })
    .default(0),
  startDate: z.string().min(1, { message: '请输入开始日期' }),
  endDate: z.string().optional(),
  status: z.enum(
    ['PENDING', 'CONFIRMED', 'CANCELED', 'REFUNDED', 'COMPLETED'],
    {
      required_error: '请选择状态',
    }
  ),
  category: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type DonationsFormValues = z.infer<typeof formSchema>;

interface DonationsFormProps {
  defaultValues: Partial<DonationsFormValues>;
  onSubmit: (data: DonationsFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function DonationsForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting,
}: DonationsFormProps) {
  const form = useForm<DonationsFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>名称</FormLabel>
              <FormControl>
                <Input placeholder="请输入捐赠项目名称" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>描述</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="请输入捐赠项目描述"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="targetAmount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>目标金额</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="请输入目标金额"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentAmount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>当前金额</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="请输入当前金额"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>开始日期</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>结束日期</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>状态</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="选择状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">待处理</SelectItem>
                  <SelectItem value="CONFIRMED">已确认</SelectItem>
                  <SelectItem value="CANCELED">已取消</SelectItem>
                  <SelectItem value="REFUNDED">已退款</SelectItem>
                  <SelectItem value="COMPLETED">已完成</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>分类</FormLabel>
              <FormControl>
                <Input placeholder="请输入分类" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>图片链接</FormLabel>
              <FormControl>
                <Input placeholder="请输入图片链接" {...field} />
              </FormControl>
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
