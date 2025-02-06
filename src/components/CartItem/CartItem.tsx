
import { useDispatch } from 'react-redux';
import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

function CartItem(props: CartItemProps) {

    const dispatch = useDispatch<AppDispatch>();
    
    const increase = () => {
        dispatch(cartActions.incrementItem(props.id))
    }

    const decrease = () => {
        dispatch(cartActions.decrementItem(props.id))
    }

    const remove = () => {
        dispatch(cartActions.removeItem(props.id))
    }

    return ( 
            <div className={styles['item']}>
                <div className={styles['image']} style={{ backgroundImage: `url('${props.image}')`}}/>  
                <div className={styles['description']}>   
                    <div className={styles['name']}>{props.name}</div>
                    <div className={styles['price']}>{props.price}
                        <span className={styles['currency']}>₽</span> 
                    </div>
                </div>          
          

                <div className={styles['actions']}>
                        <button className={styles['button-remove']} onClick={decrease}>
                            <img src='remove-icon.svg' alt='удалить из корзины'/>
                        </button>

                        <div className={styles['count']}>{props.count}</div>
                    
                        <button className={styles['button-add']} onClick={increase}>
                            <img src='add-icon.svg' alt='добавить в корзину'/>
                        </button>

                        <button className={styles['button-close']} onClick={remove}>
                            <img src='close.svg' alt='удалить из корзины'/>
                        </button>
                </div>  
                        <div className={styles['count']} />
            </div>
    );
}

export default CartItem;