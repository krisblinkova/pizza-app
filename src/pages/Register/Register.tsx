import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from './Register.module.css';
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { registerUser, userActions } from "../../store/user.slice";
import Headling from "../../components/Headling/Headling";


//реализуем type 
export type RegisterForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
    name: {
        value: string;
    }
}

export function Register() {

    const navigate = useNavigate();

    //хук, обеспечивающий обновление
    const dispatch = useDispatch<AppDispatch>();
    //useSelector(state(хранилище) => state.user.jwt(что мы хотим оттуда взять))
    const { jwt, registrationErrorMessage } = useSelector((s: RootState) => s.user)
    

    useEffect(() => {
        if (jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);



    // Алгорим отправки формы
    // 1 - когда пользователь отправляет форму, вызывается submit
    // 2 - стандартное поведение браузера блокируется
    // 3 - предыдущие ошибки регистрации очищаются
    // 4 - значения из полей ввода (email, password, name) - извлекаются
    // 5 - данные отправляются в экшн register, который обрабатывает регистрацию
    //обработка событий отправки формы
    const submit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearRegisterError()); 
        const target = e.target as typeof e.target & RegisterForm;
        const { email, password, name } = target; 
        dispatch(registerUser({ email: email.value, password: password.value, name: name.value}))    
    };

    

    return  <div className={styles['register']}>
    <Headling>Регистрация</Headling>
        {registrationErrorMessage && <div className={styles['error']}>{registrationErrorMessage}</div>}
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

                <div className={styles['field']}>
                    <label htmlFor="name">Ваше имя</label>
                    <Input 
                    id='name'
                    type='name'
                    placeholder='Имя'
                    />
                </div>

                <Button appearence="large">Зарегистрироваться</Button>
            </form>
            <div className={styles['links']}>
                <div>Есть аккаунт?</div>
                    <Link to="/auth/login">Войти
                    </Link>
            </div>
           
        </div>   
}

