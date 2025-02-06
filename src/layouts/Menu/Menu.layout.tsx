import { NavLink, Outlet, useNavigate } from "react-router-dom";
import cn from 'classnames';
import styles from './Menu.layout.module.css';
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { userActions } from "../../store/user.slice";
import { cartActions } from "../../store/cart.slice";
import { axiosUserProfile } from "../../store/user.slice";
import { useEffect } from "react";

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const profile = useSelector((s: RootState) => s.user.axiosUserProfile)
    const items = useSelector((s: RootState) => s.cart.items)


//вызываем юзера
    useEffect(() => {
        dispatch(axiosUserProfile())
    }, [dispatch]);


    const logout = () => {
        dispatch(userActions.logout())
        navigate('/auth/login');
    };


    return <div className={styles['layout']}>
        <div className={styles['sidebar']}>
            <div className={styles['user']}>
                <img className={styles['avatar']} src="./avatar.png" alt="аватар пользователя" />
                <div className={styles['name']}>{profile?.name}</div>
                <div className={styles['email']}>{profile?.email}</div>
                
            </div>  

            <div className={styles['menu']}>     
                <NavLink to='/' className={({ isActive }) => cn(styles['link'], {
                    [styles.active]: isActive
                })}>
                    <img src="./menu-icon.svg" alt="иконка меню" />
                    Меню</NavLink>
                <NavLink to='cart' className={({ isActive }) => cn(styles['link'], {
                     [styles.active]: isActive
                })}>
                    <img src="./cart-icon.svg" alt="добавить в корзину"  />
                    Корзина <span className={styles['cart-count']}>{items.reduce((acc, item) => acc += item.count, 0)}</span></NavLink>
                   


            </div>
           <Button className={styles['exit']} onClick={logout}>
           <img src="./out-icon.svg" alt="иконка выхода" />
           Выход
           </Button>
        </div>
        <div className={styles['content']}>
            <Outlet />
        </div>
    </div>;
}