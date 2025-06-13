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
  SimpleCaptcha,
  validateSimpleCaptcha,
} from '@/components/ui/simple-captcha';
import useAuthStore from '@/stores/auth-store';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
const formSchema = z.object({
  nameOrEmail: z.string().min(1, { message: '用户名或邮箱不能为空' }),
  password: z.string().min(6, { message: '密码至少6个字符' }),
  captcha: z.string().min(1, { message: '验证码不能为空' }),
});
type FormData = z.infer<typeof formSchema>;

const Login: React.FC = () => {
  const userForm = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameOrEmail: '',
      password: '',
      captcha: '',
    },
  });

  //记录登录状态
  const { setIsAuthenticated, setAccessToken } = useAuthStore();
  const navigate = useNavigate();
  const captchaRef = useRef<HTMLInputElement>(null);
  const [captchaText, setCaptchaText] = useState<string>('');
  const onSubmit = async (data: FormData) => {
    try {
      if (!validateSimpleCaptcha(data.captcha, captchaText)) {
        throw new Error('验证码错误');
      }
      // const resp = await login(data.nameOrEmail, data.password);
      // if (resp.status !== 200) {
      //   throw new Error('登录失败');
      // }
      setIsAuthenticated(true);
      setAccessToken('0d000721');
      console.log(data);
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '验证失败');
      userForm.setValue('captcha', '');
    }
  };

  return (
    //登录界面
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">登录</h1>
        <Form {...userForm}>
          <form
            onSubmit={userForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={userForm.control}
              name="nameOrEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>账户名或邮箱</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="请输入账户名或邮箱"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={userForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="请输入密码"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>验证码</FormLabel>
              <div className="flex items-center gap-2">
                <div className="w-[70%]">
                  <FormField
                    control={userForm.control}
                    name="captcha"
                    render={({ field }) => (
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="请输入验证码"
                          ref={captchaRef}
                          className="w-full"
                        />
                      </FormControl>
                    )}
                  />
                </div>
                <div className="flex h-9 w-[30%] items-center justify-center">
                  <SimpleCaptcha
                    onGenerate={setCaptchaText}
                    height={36}
                    width={120}
                  />
                </div>
              </div>
              <FormMessage>
                {userForm.formState.errors.captcha?.message}
              </FormMessage>
            </FormItem>

            <Button type="submit" className="w-full border-0 bg-blue-600">
              登录
            </Button>
          </form>
        </Form>
        <div className="flex justify-end">
          <Button variant="link" className="h-auto p-0" asChild>
            <Link to="/recovery-password">忘记密码?</Link>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-gray-500">没有账号?</span>
          <Button
            variant="link"
            className="h-auto p-0 text-blue-600 hover:text-blue-800"
            asChild
          >
            <Link to="/register">注册账号</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
