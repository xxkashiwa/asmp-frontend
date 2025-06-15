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
import { Alumni } from '@/models/alumni';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  studentId: z.string().min(1, '学号不能为空'),
  realName: z.string().min(1, '姓名不能为空'),
  gender: z.enum(['MALE', 'FEMALE'], { required_error: '性别不能为空' }),
  dateOfBirth: z.string().min(1, '生日不能为空'),
  address: z.string().optional(),
  companyName: z.string().optional(),
  currentJob: z.string().optional(),
  addedAt: z.string().optional(),
});

type AlumniFormValues = z.infer<typeof formSchema>;

interface AlumniFormProps {
  initialData?: Alumni;
  onSubmit: (data: AlumniFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function AlumniForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: AlumniFormProps) {
  // 将初始数据转换为表单值
  const defaultValues: Partial<AlumniFormValues> = initialData
    ? {
        studentId: initialData.studentId,
        realName: initialData.realName,
        gender: initialData.gender,
        dateOfBirth: initialData.dateOfBirth,
        address: initialData.address || '',
        companyName: initialData.companyName || '',
        currentJob: initialData.currentJob || '',
        addedAt: initialData.addedAt,
      }
    : {
        studentId: '',
        realName: '',
        gender: 'MALE',
        dateOfBirth: '',
        address: '',
        companyName: '',
        currentJob: '',
        addedAt: new Date().toISOString(),
      };

  const form = useForm<AlumniFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {' '}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>学号</FormLabel>
                <FormControl>
                  <Input placeholder="请输入学号" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="realName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Input placeholder="请输入姓名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>性别</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择性别" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MALE">男</SelectItem>
                    <SelectItem value="FEMALE">女</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>生日</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>地址</FormLabel>
                <FormControl>
                  <Input placeholder="请输入地址（选填）" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>公司名</FormLabel>
                <FormControl>
                  <Input placeholder="请输入公司名（选填）" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentJob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工作名</FormLabel>
                <FormControl>
                  <Input placeholder="请输入工作名（选填）" {...field} />
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
