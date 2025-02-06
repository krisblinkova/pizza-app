import styles from './AuthLayout.module.css';
import { Outlet } from 'react-router';


export function AuthLayout() {

    return <div className={styles['layout']}>
        <div className={styles['logo']}>
            <img src="/illustration.svg" alt="Логотип компании" />     
        </div>  
        <div className={styles['content']}>
            <Outlet />
    
            </div>
        </div>;
    }

export default AuthLayout;