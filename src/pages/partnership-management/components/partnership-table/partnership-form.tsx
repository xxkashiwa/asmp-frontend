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
  name: z.string().min(1, '请输入合作伙伴名称'),
  type: z.string().min(1, '请选择合作类型'),
  contact: z.string().min(1, '请输入联系人姓名'),
  phone: z.string().min(1, '请输入联系电话'),
  email: z.string().email('请输入有效的电子邮箱'),
  address: z.string().min(1, '请输入地址'),
  description: z.string().min(1, '请输入合作描述'),
  startDate: z.string().min(1, '请选择合作开始日期'),
  endDate: z.string().min(1, '请选择合作结束日期'),
  status: z.string().min(1, '请选择合作状态'),
});

type PartnershipFormValues = z.infer<typeof formSchema>;

interface PartnershipFormProps {
  initialData?: Partial<PartnershipFormValues>;
  onSubmit: (data: PartnershipFormValues) => void;
  onCancel: () => void;
}

export function PartnershipForm({
  initialData,
  onSubmit,
  onCancel,
}: PartnershipFormProps) {
  const defaultValues: Partial<PartnershipFormValues> = initialData || {
    type: '',
    status: 'active',
  };

  const form = useForm<PartnershipFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>合作伙伴名称</FormLabel>
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
              <FormLabel>合作类型</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择合作类型" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="enterprise">企业合作</SelectItem>
                  <SelectItem value="academic">学术合作</SelectItem>
                  <SelectItem value="research">研究合作</SelectItem>
                  <SelectItem value="project">项目合作</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>联系人</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>联系电话</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>电子邮箱</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                  <Input {...field} />
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
              <FormLabel>合作描述</FormLabel>
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
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>合作状态</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择合作状态" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">进行中</SelectItem>
                  <SelectItem value="pending">待启动</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="terminated">已终止</SelectItem>
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