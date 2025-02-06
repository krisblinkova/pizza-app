import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Search.module.css'; //импортируем стили 
import { SearchProps } from './Search.props';


const Search = forwardRef<HTMLInputElement>(function Search({ isValid = true, className, ...props }: SearchProps, ref) {
    return (
        <div className={styles['input-wrapper']}>
            <input 
                ref={ref} 
                className={cn(styles['search'], className, {
                [styles['invalid']]: isValid,
            })} 
                placeholder="Введите блюдо или состав"
            {...props} />
            <img className={styles['icon']} src="/search-icon.svg" alt="иконка поиска" />
        </div>
       
    );
})

export default Search