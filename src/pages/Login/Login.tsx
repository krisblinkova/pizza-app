import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from './Login.module.css';
import Input from "../../components/Input/Input";
import Headling from "../../components/Headling/Headling";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";

//реализуем type 
export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };

}

export function Login() {

    const navigate = useNavigate();
    //хук, обеспечивающий обновление
    const dispatch = useDispatch<AppDispatch>();
    //useSelector(state(хранилище) => state.user.jwt(что мы хотим оттуда взять))
    const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user)
    

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);


    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearLoginError());
        //при нажатии submit очищаем ошибку
        //вытаскиваем данные
        const target = e.target as typeof e.target & LoginForm;
        const { email, password } = target;
        //отправляем данные
        await sendLogin(email.value, password.value);
    };

    //делаем запрос на получение токена
    const sendLogin = async (email: string, password: string) => {
        dispatch(login({ email, password }));
    };

    return <div className={styles['login']}>
        <Headling>Вход</Headling>
        {loginErrorMessage && <div className={styles['error']}>{loginErrorMessage}</div>}
            <form className={styles['form']} onSubmit={submit}>
                <div className={styles['field']}>
                    <label htmlFor="email">Ваш email</label>
                    <Input 
                    name='email'
                    id='email'
                    placeholder='Email'
                    />
                </div>

                <div className={styles['field']}>
                    <label htmlFor="password">Ваш пароль</label>
                    <Input 
                    name='password'
                    id='password'
                    type='password'
                    placeholder='Пароль'
                    />
                </div>
                <Button appearence="large">Вход</Button>
            </form>
            <div className={styles['links']}>
                <div>Нет аккаунта?</div>
                    <Link to="/auth/register">Зарегистрироваться
                    </Link>
            </div>
           
        </div>   
}
// export default Login;


