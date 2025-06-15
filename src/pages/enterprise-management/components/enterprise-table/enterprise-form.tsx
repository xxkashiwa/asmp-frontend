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
import { Enterprise } from '@/models/enterprise';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// 定义表单验证模式
const enterpriseSchema = z.object({
  name: z.string().min(1, '必须填写企业名称'),
  field: z.string().optional(),
  address: z.string().optional(),
  contactPerson: z.string().optional(),
  contactEmail: z.string().email('邮箱格式不正确').optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  // id 和 addedAt 在提交时会处理
  id: z.string().optional(),
  addedAt: z.string().optional(),
});

type EnterpriseFormValues = z.infer<typeof enterpriseSchema>;

interface EnterpriseFormProps {
  onSubmit: (data: Enterprise) => Promise<void>;
  initialData?: Enterprise;
}

export function EnterpriseForm({ onSubmit, initialData }: EnterpriseFormProps) {
  const form = useForm<EnterpriseFormValues>({
    resolver: zodResolver(enterpriseSchema),
    defaultValues: initialData || {
      name: '',
      field: '',
      address: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
    },
  });
  const handleSubmit = async (values: EnterpriseFormValues) => {
    const currentDate = new Date().toISOString();
    const enterpriseData: Enterprise = {
      name: values.name,
      field: values.field || '',
      address: values.address || '',
      contactPerson: values.contactPerson || '',
      contactEmail: values.contactEmail || '',
      contactPhone: values.contactPhone || '',
      id: initialData?.id || crypto.randomUUID(),
      addedAt: initialData?.addedAt || currentDate,
    };
    await onSubmit(enterpriseData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>企业名称 *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="field"
          render={({ field }) => (
            <FormItem>
              <FormLabel>领域</FormLabel>
              <FormControl>
                <Input {...field} />
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

        <FormField
          control={form.control}
          name="contactPerson"
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
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>联系邮箱</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPhone"
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

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="submit">保存</Button>
        </div>
      </form>
    </Form>
  );
}
