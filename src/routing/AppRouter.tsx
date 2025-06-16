import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './Layout';
import HomePage from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import RegisterPage from '../pages/register.page';

const router = createBrowserRouter([
  {
    
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'login', element: <LoginPage/>},
      {path: 'register', element: <RegisterPage/>},
    ]
  },
  
],
  {
    basename: '/',
  });

export function AppRouter() {
  return <RouterProvider router={router} />;
}
