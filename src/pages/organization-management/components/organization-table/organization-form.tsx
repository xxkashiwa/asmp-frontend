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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Organization } from '@/models/organization';

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, '请输入组织名称'),
  type: z.enum(['REGIONAL', 'INDUSTRIAL', 'INTEREST'], {
    description: '请选择组织类型',
  }),
  description: z.string().min(1, '请输入组织描述'),
  state: z.enum(['ACTIVE', 'DISBAND'], { description: '请选择组织状态' }),
  addedAt: z.string().optional(),
  creator: z.any().optional(),
});

type OrganizationFormValues = z.infer<typeof formSchema>;

interface OrganizationFormProps {
  initialData?: Organization;
  onSubmit: (data: Organization) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function OrganizationForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: OrganizationFormProps) {
  const defaultValues: Partial<OrganizationFormValues> = initialData || {
    id: '',
    name: '',
    type: 'REGIONAL',
    description: '',
    state: 'ACTIVE',
    addedAt: new Date().toISOString(),
  };
  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: OrganizationFormValues) => {
    // Ensure required fields are present for the Organization type
    const formData = {
      ...data,
      id: data.id || crypto.randomUUID(), // Generate a UUID if no ID exists
      addedAt: data.addedAt || new Date().toISOString(),
      creator: data.creator || null,
    } as Organization;

    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          {' '}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名字</FormLabel>
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
                <FormLabel>类型</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择组织类型" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="REGIONAL">地区性组织</SelectItem>
                    <SelectItem value="INDUSTRIAL">行业组织</SelectItem>
                    <SelectItem value="INTEREST">兴趣组织</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>描述</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>状态</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择组织状态" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">活跃中</SelectItem>
                    <SelectItem value="DISBAND">已解散</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
          <FormField
            control={form.control}
            name="addedAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>添加时间</FormLabel>
                <FormControl>
                  <Input type="date" {...field} disabled />
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
