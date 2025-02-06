import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { RootState } from '../store/store';

//создаем компонент, который проверяет авторизован ли пользователь, и в случае aутентификации, 
//перенаправлять его на страницу логина
export const RequireAuth = ({ children }: { children: ReactNode }) => {
   const jwt = useSelector((s: RootState) => s.user.jwt )
 //если токен отсутствует, перенаправляем на страницу логина  
    if (!jwt) {
        return <Navigate to="/auth/login" replace />;
    }
    return children;
}

// далее оборачиваем Routes в этот компонент 