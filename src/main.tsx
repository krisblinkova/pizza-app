import React from 'react';
import './index.css'
import { Suspense, lazy } from 'react'; 
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { Layout } from './layouts/Menu/Menu.layout.tsx';
import { AuthLayout } from './layouts/Auth/Auth.layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { createRoot } from 'react-dom/client';
import { defer } from 'react-router';
import { Login } from "./pages/Login/Login.tsx";
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { Register } from './pages/Register/Register.tsx';




const Menu = lazy(() => import('./pages/Menu/Menu.tsx'));

const ErrorElement = () => <>Ошибка</>

const router = createBrowserRouter([
    {
        path: '/',
        element: <RequireAuth><Layout /></RequireAuth>,
        children: [
            {
              path: '/',
              element: (
                <Suspense fallback={<div>Загрузка...</div>}>
                <Menu />
                </Suspense>
              )
            },
            {
              path: '/cart',
              element: <Cart />, 
            },
            {
              path: '/product/:id',
              element: <Product />,
              errorElement: <ErrorElement />,
              loader: async ({ params }) => {
                return defer({
                  data: new Promise((resolve, reject) => {
                    setTimeout(() => {
                        axios.get(`${PREFIX}/products/${params.id}`)
                        .then(data => resolve(data))
                        .catch(e => reject(e))
                    }, 2000);
                  })
                });
              }
              }
            ]
          },
          {
            path: '/auth',
            element: <AuthLayout/>,
            children: [
              {
                path: 'login',
                element: <Login />  
              },
              {
                path: 'register',
                element: <Register />  
              }  
            ]
          }
  ])
              
           
           

    const rootElement = document.getElementById('root'); // Убедитесь, что в HTML есть div с id="root"
    const root = createRoot(rootElement);

    //оборачиваем в Provider, чтобы сделать хранилище доступным во всем дереве компонентов
    root.render(
      <React.StrictMode>
        <Provider store={store}> 
        <RouterProvider router={router} />
        </Provider>
      </React.StrictMode>
    );
        

      

  