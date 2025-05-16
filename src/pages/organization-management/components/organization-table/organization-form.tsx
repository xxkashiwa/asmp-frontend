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
  name: z.string().min(1, '请输入组织名称'),
  type: z.string().min(1, '请选择组织类型'),
  description: z.string().min(1, '请输入组织描述'),
  foundingDate: z.string().min(1, '请选择成立日期'),
  leader: z.string().min(1, '请输入负责人姓名'),
  contact: z.string().min(1, '请输入联系方式'),
  location: z.string().min(1, '请输入所在地'),
  status: z.string().min(1, '请选择组织状态'),
  memberCount: z.number().min(0, '成员数量不能为负数'),

});

type OrganizationFormValues = z.infer<typeof formSchema>;

interface OrganizationFormProps {
  initialData?: Partial<OrganizationFormValues>;
  onSubmit: (data: OrganizationFormValues) => void;
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
    type: '',
    status: 'active',
    memberCount: 0,
  };

  const form = useForm<OrganizationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className='grid grid-cols-2 gap-4'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>组织名称</FormLabel>
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
              <FormLabel>组织类型</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择组织类型" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="branch">分会</SelectItem>
                  <SelectItem value="committee">委员会</SelectItem>
                  <SelectItem value="club">俱乐部</SelectItem>
                  <SelectItem value="association">协会</SelectItem>
                  <SelectItem value="other">其他</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />


          <FormField
            control={form.control}
            name="leader"
            render={({ field }) => (
              <FormItem>
                <FormLabel>负责人</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>联系方式</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>所在地</FormLabel>
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
              <FormLabel>组织描述</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


          <FormField
            control={form.control}
            name="memberCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>成员数量</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="foundingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>成立日期</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
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
              <FormLabel>组织状态</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择组织状态" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">活跃</SelectItem>
                  <SelectItem value="inactive">不活跃</SelectItem>
                </SelectContent>
              </Select>
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