import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Input.module.css'; //импортируем стили 
import { InputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement>(function Input({ isValid = true, className, ...props }: InputProps, ref) {
    return (
        <div className={styles['input']}>
            <input 
                ref={ref} 
                className={cn(styles['input'], className, {
                [styles['invalid']]: isValid,
            })} 
            {...props} />
            {/* <img className={styles['icon']} src="/search-icon.svg" alt="иконка поиска" /> */}
        </div>
       
    );
})

export default Input;