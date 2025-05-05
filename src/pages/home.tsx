import React from 'react';
import  useAuthStore  from '@/stores/auth-store';
import { useNavigate } from'react-router-dom';
const Home: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div>
     <h1>home page</h1>
     { isAuthenticated ? (
      <div>
        <p>你已经登录了</p>
      </div>
     ) : (
      <div>
        <p>你还没有登录</p>
        <button onClick={()=>navigate('/login')}>登录</button>
      </div>
     )}
    </div>
  );
};

export default Home;
