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
import { Alumni } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  studentId: z.string().min(1, '学号不能为空'),
  name: z.string().min(1, '姓名不能为空'),
  gender: z.string().min(1, '性别不能为空'),
  school: z.string().min(1, '学院不能为空'),
  major: z.string().min(1, '专业不能为空'),
  graduationYear: z.string().min(1, '毕业年份不能为空'),
  degree: z.string().min(1, '学位不能为空'),
  currentCompany: z.string().optional(),
  jobPosition: z.string().optional(),
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
        name: initialData.name,
        gender: initialData.gender,
        school: initialData.school,
        major: initialData.major,
        graduationYear: initialData.graduationYear,
        degree: initialData.degree,
        currentCompany: initialData.currentCompany || '',
        jobPosition: initialData.jobPosition || '',
      }
    : {
        studentId: '',
        name: '',
        gender: '',
        school: '',
        major: '',
        graduationYear: '',
        degree: '',
        currentCompany: '',
        jobPosition: '',
      };

  const form = useForm<AlumniFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            name="name"
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
                    <SelectItem value="男">男</SelectItem>
                    <SelectItem value="女">女</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>学院</FormLabel>
                <FormControl>
                  <Input placeholder="请输入学院" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel>专业</FormLabel>
                <FormControl>
                  <Input placeholder="请输入专业" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="graduationYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>毕业年份</FormLabel>
                <FormControl>
                  <Input placeholder="请输入毕业年份" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>学位</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择学位" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="本科">本科</SelectItem>
                    <SelectItem value="硕士">硕士</SelectItem>
                    <SelectItem value="博士">博士</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel>当前公司</FormLabel>
                <FormControl>
                  <Input placeholder="请输入当前公司（选填）" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobPosition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>职位</FormLabel>
                <FormControl>
                  <Input placeholder="请输入职位（选填）" {...field} />
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
