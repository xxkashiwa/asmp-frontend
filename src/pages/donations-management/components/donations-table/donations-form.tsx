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
import { Donations } from '@/models/donations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: '项目名称不能为空' }),
  description: z.string(),
  targetAmount: z.number().min(1, { message: '目标金额不能为空' }),
  currentAmount: z.number(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELED', 'REFUNDED', 'COMPLETED'], { required_error: '状态不能为空' }),
  
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  category: z.string().optional(),
  imageUrl: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  progress: z.number().optional(),
  targetReached: z.boolean().optional(),
});

type DonationFormValues = z.infer<typeof formSchema>;

interface DonationFormProps {
  initialData?: Donations;
  onSubmit: (data: DonationFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DonationForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: DonationFormProps) {
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      targetAmount: initialData?.targetAmount || 0,
      currentAmount: initialData?.currentAmount || 0,
      status: initialData?.status || 'PENDING',
      targetReached: initialData?.targetReached || false,
      startDate: initialData?.startDate || '',
      endDate: initialData?.endDate || '',
      category: initialData?.category || '',
      imageUrl: initialData?.imageUrl || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>项目名称 *</FormLabel>
              <FormControl>
                <Input placeholder="请输入项目名称" {...field} />
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
              <FormLabel>描述 *</FormLabel>
              <FormControl>
                <Input placeholder="请输入描述" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="targetAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>目标金额 *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="请输入目标金额" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>当前金额 *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="请输入当前金额" {...field} />
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
                <FormLabel>状态 *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择状态" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="PENDING">待处理</SelectItem>
                    <SelectItem value="CONFIRMED">已确认</SelectItem>
                    <SelectItem value="CANCELED">已取消</SelectItem>
                    <SelectItem value="REFUNDED">已退款</SelectItem>
                    <SelectItem value="COMPLETED">已完成</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetReached"
            render={({ field }) => (
              <FormItem>
                <FormLabel>目标达成</FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value === 'true')} defaultValue={field.value ? 'true' : 'false'}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择是否达成目标" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">是</SelectItem>
                      <SelectItem value="false">否</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>开始日期</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
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
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>类别</FormLabel>
                <FormControl>
                  <Input placeholder="请输入类别" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>图片URL</FormLabel>
                <FormControl>
                  <Input placeholder="请输入图片URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
            {isLoading ? '提交中...' : initialData ? '更新' : '添加'}
          </Button>
        </div>
      </form>
    </Form>
  );
}