import styles from './Button.module.css'; //импортируем стили 
import { ButtonProps } from './Button.props';
import cn from 'classnames';


function Button({ children, className, appearence = 'medium', ...props }: ButtonProps) {
    return (
        <button 
            className={cn(styles['button'], styles['accent'], className, {
                [styles['medium']]: appearence === 'medium',
                [styles['large']]: appearence === 'large'
            })} 
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;