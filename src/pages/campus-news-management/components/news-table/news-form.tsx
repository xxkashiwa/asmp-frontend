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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { News } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  description: z.string().optional(),
  url: z.string().url('请输入有效的URL').optional(),
  image: z.object({
    url: z.string().url('请输入有效的图片URL').optional(),
    alt: z.string().optional(),
  }).optional(),
  isActive: z.boolean(),
  content: z.string(),
  publishDate: z.string().min(1, '发布日期不能为空'),
  author: z.string().min(1, '作者不能为空'),
  category: z.string().min(1, '分类不能为空'),
});

type NewsFormValues = z.infer<typeof formSchema>;

interface NewsFormProps {
  initialData?: News;
  onSubmit: (data: NewsFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function NewsForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: NewsFormProps) {
  const defaultValues: Partial<NewsFormValues> = initialData
    ? {
        title: initialData.title,
        description: initialData.description,
        url: initialData.url,
        image: initialData.image,
        isActive: initialData.isActive,
        publishDate: initialData.publishDate,
        author: initialData.author,
        category: initialData.category,
      }
    : {
        title: '',
        description: undefined,
        url: undefined,
        image: undefined,
        isActive: false,
        publishDate: new Date().toISOString().split('T')[0],
        author: '',
        category: '',
      };

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>标题 *</FormLabel>
                <FormControl>
                  <Input placeholder="请输入标题" {...field} />
                </FormControl>
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
                  <Textarea placeholder="请输入描述" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>链接</FormLabel>
                <FormControl>
                  <Input placeholder="请输入链接" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image.url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>图片链接</FormLabel>
                <FormControl>
                  <Input placeholder="请输入图片链接" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image.alt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>图片描述</FormLabel>
                <FormControl>
                  <Input placeholder="请输入图片描述" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publishDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>发布日期 *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>作者 *</FormLabel>
                <FormControl>
                  <Input placeholder="请输入作者" {...field} />
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
                <FormLabel>分类 *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="校园新闻">校园新闻</SelectItem>
                    <SelectItem value="活动通知">活动通知</SelectItem>
                    <SelectItem value="学术动态">学术动态</SelectItem>
                    <SelectItem value="其他">其他</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>发布状态</FormLabel>
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