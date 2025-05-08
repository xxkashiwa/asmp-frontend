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
import { Donation } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  donorName: z.string().min(1, '请输入捐赠人姓名'),
  amount: z.coerce.number().min(0, '捐赠金额必须大于0'),
  projectName: z.string().min(1, '请输入项目名称'),
  donationDate: z.string().min(1, '请选择捐赠日期'),
  purpose: z.string().min(1, '请输入捐赠目的'),
  status: z.enum(['pending', 'completed', 'cancelled']),
  thanksLetterSent: z.boolean(),
  remarks: z.string().optional(),
});

type DonationFormValues = z.infer<typeof formSchema>;

interface DonationFormProps {
  donation?: Donation;
  onSubmit: (data: DonationFormValues) => void;
}

export function DonationForm({ donation, onSubmit }: DonationFormProps) {
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      donorName: donation?.donorName ,
      amount: donation?.amount ,
      projectName: donation?.projectName ,
      donationDate: donation?.donationDate ,
      purpose: donation?.purpose,
      status: donation?.status ,
      thanksLetterSent: donation?.thanksLetterSent ,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="donorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>捐赠人姓名 *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>捐赠金额 *</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>项目名称</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="donationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>捐赠日期 *</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>捐赠目的 *</FormLabel>
              <FormControl>
                <Input {...field} />
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
                  <SelectItem value="pending">处理中</SelectItem>
                  <SelectItem value="completed">已完成</SelectItem>
                  <SelectItem value="cancelled">已取消</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thanksLetterSent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>感谢信已发送</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(value === 'true')} defaultValue={field.value ? 'true' : 'false'}>
                  <SelectTrigger>
                    <SelectValue placeholder="选择是否已发送感谢信" />
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
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>备注</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">提交</Button>
        </div>
      </form>
    </Form>
  );
}