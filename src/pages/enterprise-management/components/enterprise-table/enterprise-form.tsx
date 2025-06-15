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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Enterprise } from '@/models/enterprise';
import * as z from 'zod';

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '请输入企业名称'),
  field: z.string().min(1, '请输入领域'),
  address: z.string().min(1, '请输入地址'),
  contactPerson: z.string().min(1, '请输入联系人'),
  contactEmail: z.string().email('请输入有效的邮箱地址'),
  contactPhone: z.string().min(1, '请输入联系电话'),
  addedAt: z.string().min(1, '请输入加入日期'),
});

type EnterpriseFormValues = z.infer<typeof formSchema>;

interface EnterpriseFormProps {
  initialData?: Enterprise;
  onSubmit: (data: EnterpriseFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function EnterpriseForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: EnterpriseFormProps) {
  const form = useForm<EnterpriseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name,
      field: initialData?.field,
      address: initialData?.address,
      contactPerson: initialData?.contactPerson,
      contactEmail: initialData?.contactEmail,
      contactPhone: initialData?.contactPhone,
      addedAt: initialData?.addedAt,
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>企业名称 *</FormLabel>
              <FormControl>
                <Input placeholder="请输入企业名称" {...field} />
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
              <FormLabel>领域 *</FormLabel>
              <FormControl>
                <Input placeholder="请输入领域" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>地址 *</FormLabel>
                <FormControl>
                  <Input placeholder="请输入地址" {...field} />
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
                <FormLabel>联系人 *</FormLabel>
                <FormControl>
                  <Input placeholder="请输入联系人" {...field} />
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
                <FormLabel>联系电话 *</FormLabel>
                <FormControl>
                  <Input placeholder="请输入联系电话" {...field} />
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
                <FormLabel>邮箱 *</FormLabel>
                <FormControl>
                  <Input placeholder="请输入邮箱地址" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>加入日期 *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
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