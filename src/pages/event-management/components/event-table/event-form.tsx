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
import { Event } from '@/types';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  title: z.string().min(1, '请输入活动名称'),
  description: z.string().min(1, '请输入活动描述'),
  startDate: z.string().min(1, '请选择开始日期'),
  endDate: z.string().min(1, '请选择结束日期'),
  location: z.string().min(1, '请输入活动地点'),
  organizer: z.string().min(1, '请输入活动组织方'),
  registrationDeadline: z.string().min(1, '请选择报名截止日期').optional(),
  status: z.enum(['upcoming','ongoing', 'completed', 'cancelled']),

  maxParticipants: z.number().min(1, '请输入最大参与人数').optional(),
  type: z.enum(['校园活动', '学术活动', '社区活动', '体育活动', '文化活动', '其他']).optional(),

});

type EventFormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  event?: Event;
  onSubmit: (data: EventFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const EventForm = ({ event, onSubmit, onCancel, isLoading }: EventFormProps) => {
  const form = useForm <EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event?.title,
      description: event?.description,
      startDate: event?.startDate,
      endDate: event?.endDate,
      location: event?.location,
      organizer: event?.organizer,
      registrationDeadline: event?.registrationDeadline,
      type: event?.type,
      status: event?.status,
      maxParticipants: event?.maxParticipants,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField 
          control={form.control}
          name = 'title'
          render={({ field })=>(
            <FormItem>
              <FormLabel>活动名称 *</FormLabel>
              <FormControl>
                <Input {...field} placeholder='请输入活动名称'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />

        <FormField
          control={form.control}
          name = 'type'
          render={({ field })=>(
            <FormItem>
              <FormLabel>活动类型 *</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger>
                    <SelectValue>{field.value}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='campus'>校园活动</SelectItem>
                    <SelectItem value='community'>社区活动</SelectItem>
                    <SelectItem value='academic'>学术活动</SelectItem>
                    <SelectItem value='sports'>体育活动</SelectItem>
                    <SelectItem value='cultural'>文化活动</SelectItem>
                    <SelectItem value='other'>其他</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name = 'startDate'
          render={({ field })=>(
            <FormItem>
              <FormLabel>开始日期 *</FormLabel>
              <FormControl>
                <Input {...field} type='date' placeholder='请选择开始日期'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name ='endDate'
          render={({ field })=>(
            <FormItem>
              <FormLabel>结束日期 *</FormLabel>
              <FormControl>
                <Input {...field} type='date' placeholder='请选择结束日期'/>
              </FormControl>
              <FormMessage />
            </FormItem> 
          )}
        />

        <FormField
          control={form.control}
          name = 'location'
          render={({ field })=>(
            <FormItem>
              <FormLabel>活动地点 *</FormLabel>
              <FormControl>
                <Input {...field} placeholder='请输入活动地点'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name = 'description'
          render={({ field })=>(
            <FormItem>
              <FormLabel>活动描述 *</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='请输入活动描述'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name = 'organizer'
          render={({ field })=>(
            <FormItem>
              <FormLabel>活动组织方 *</FormLabel>
              <FormControl>
                <Input {...field} placeholder='请输入活动组织方'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name = 'status'
          render={({ field })=>(
            <FormItem>
              <FormLabel>活动状态 *</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger>
                    <SelectValue>{field.value}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='upcoming'>未开始</SelectItem>
                    <SelectItem value='ongoing'>进行中</SelectItem>
                    <SelectItem value='completed'>已结束</SelectItem>
                    <SelectItem value='cancelled'>已取消</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name = 'maxParticipants'
          render={({ field })=>(
            <FormItem>
              <FormLabel>最大参与人数 *</FormLabel>
              <FormControl>
                <Input {...field} type='number' placeholder='请输入最大参与人数'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name ='registrationDeadline'
          render={({ field })=>(
            <FormItem>
              <FormLabel>报名截止日期 *</FormLabel>
              <FormControl>
                <Input {...field} type='date' placeholder='请选择报名截止日期'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            {isLoading ? '提交中...' : event ? '更新' : '添加'}
          </Button>
        </div>
      </form>
    </Form>
  )
}