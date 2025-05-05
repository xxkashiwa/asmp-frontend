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
import { Link, useNavigate } from 'react-router-dom';
const passwordSchema = z
    .string()
    .min(8, { message: "密码至少8位" })
    .regex(/[a-z]/, { message: "至少包含1个小写字母" })
   .regex(/[A-Z]/, { message: "至少包含1个大写字母" })
   .regex(/[0-9]/, { message: "至少包含1个数字" })

const formSchema = z.object({
    name: z.string().min(1,{ message: '用户名不能为空'}),
    email: z.string().min(1,{ message: '邮箱不能为空'}),
    password: passwordSchema,
    confirmPassword: z.string(),
}).refine((data)=>data.password === data.confirmPassword,
                { message: '两次密码不一致', path: ['confirmPassword'] });
type FormData = z.infer<typeof formSchema>

const Register : React.FC = () => {
    const userForm = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''  
        }
    });
    const navigate = useNavigate();
    const onSubmit = (data: FormData)=>{
        console.log(data);
        navigate('/');
    }
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
                <h1 className='text-2xl font-bold text-center mb-6'>注册</h1>
                <Form {...userForm}>
                    <form onSubmit={userForm.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField 
                            name = 'name'
                            control = {userForm.control}
                            render = {
                                ({field})=>(
                                    <FormItem>
                                        <FormLabel>用户名</FormLabel>
                                        <FormControl>
                                            <Input {...field} type='text' placeholder='请输入用户名' className="w-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                        />

                        <FormField 
                            name = 'email'
                            control = {userForm.control}
                            render = {
                                ({field})=>(
                                    <FormItem>
                                        <FormLabel>邮箱</FormLabel>
                                        <FormControl>
                                            <Input {...field} type='email' placeholder='请输入邮箱' className="w-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                        />
                        
                        <FormField 
                            name = 'password'
                            control = {userForm.control}
                            render = {
                                ({field})=>(
                                    <FormItem>
                                        <FormLabel>
                                            <span>密码</span>
                                            <span className="text-sm text-gray-500 ml-2">(至少八位，包含大小写字母和数字)</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type='password' placeholder='请输入密码' className="w-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                        />
                    
                        <FormField 
                            name = 'confirmPassword'
                            control = {userForm.control}
                            render = {
                                ({field})=>(
                                    <FormItem>
                                        <FormLabel>确认密码</FormLabel>
                                        <FormControl>
                                            <Input {...field} type='password' placeholder='请再次输入密码' className="w-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }
                        />
                        <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white border-0 mt-6'>
                            注册
                        </Button>
                    </form>
                </Form>
                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">已有账号?</span>
                    <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800" asChild>
                        <Link to='/login'>点击登录</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Register;