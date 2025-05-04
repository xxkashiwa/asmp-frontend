import { BrowserRouter, useRoutes } from 'react-router-dom';
import './App.css';
import routes from './routes';

// 路由渲染组件
const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
