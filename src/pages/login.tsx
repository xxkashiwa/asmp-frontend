import React from 'react';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { 
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage } from '@/components/ui/form';
import { Link } from 'react-router-dom';
import { useNavigate } from'react-router-dom';
import  useAuthStore  from '@/stores/auth-store';


const formSchema = z.object({
    nameOrEmail: z.string().min(1,{message: '用户名或邮箱不能为空'}),
    password: z.string().min(6,{message: '密码至少6个字符'}),
});
type FormData = z.infer<typeof formSchema>


const Login : React.FC = () => {
    const userForm = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nameOrEmail: '',
            password: ''
        }
    });

    const { setIsAuthenticated, setAccessToken } = useAuthStore() ;
    const navigate = useNavigate();
    const onSubmit = (data: FormData)=>{
        setIsAuthenticated(true);
        setAccessToken('0d000721');
        console.log(data);
        navigate('/');
    }


    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 mx-auto space-y-6 bg-white rounded-lg shadow-md'>
                <h1 className='text-2xl font-bold text-center mb-6'>登录</h1>
                <Form {...userForm}>
                    <form onSubmit={userForm.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField 
                            control={userForm.control}
                            name = 'nameOrEmail'
                            render={({field})=>(
                                    <FormItem>
                                        <FormLabel>账户名或邮箱</FormLabel>
                                        <FormControl>
                                            <Input {...field} type='text' placeholder='请输入账户名或邮箱' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>)}
                        />

                        <FormField 
                            control = {userForm.control}
                            name = 'password'
                            render = {
                                ({field})=>(
                                    <FormItem>
                                        <FormLabel>密码</FormLabel>
                                        <FormControl>
                                            <Input {...field} type='password' placeholder='请输入密码' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                        />

                        <Button type='submit' className='w-full bg-blue-600 border-0'>登录</Button>
                    </form>
                </Form>
                <div className="flex justify-end">
                    <Button variant="link" className="p-0 h-auto" asChild>
                        <Link to='/recovery-password'>忘记密码?</Link>
                    </Button>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-gray-500">没有账号?</span>
                    <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800" asChild>
                        <Link to='/register'>注册账号</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login;