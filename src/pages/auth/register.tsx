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
import { register } from '@/services/auth-service';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
const passwordSchema = z.string().min(8, { message: '密码至少8位' });
// 注册表单验证
const formSchema = z
  .object({
    email: z.string().email({ message: '请输入有效的邮箱地址' }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '两次密码不一致',
    path: ['confirmPassword'],
  });
type FormData = z.infer<typeof formSchema>;

const Register: React.FC = () => {
  const userForm = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    try {
      await register(data.email, data.password);
      navigate('/login');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '注册失败，请重试');
      return;
    }
  };
  // 注册表单
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">注册</h1>
        <Form {...userForm}>
          <form
            onSubmit={userForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              name="email"
              control={userForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>邮箱</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="请输入邮箱"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={userForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>密码</span>
                    <span className="ml-2 text-sm text-gray-500">
                      (至少八位，包含大小写字母和数字)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="请输入密码"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={userForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>确认密码</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="请再次输入密码"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-6 w-full border-0 bg-blue-600 text-white hover:bg-blue-700"
            >
              注册
            </Button>
          </form>
        </Form>
        <div className="mt-4 flex items-center justify-center gap-2 border-t border-gray-200 pt-4">
          <span className="text-sm text-gray-500">已有账号?</span>
          <Button
            variant="link"
            className="h-auto p-0 text-blue-600 hover:text-blue-800"
            asChild
          >
            <Link to="/login">点击登录</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
