import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css'; //импортируем стили 
import { ProductCardProps } from './ProductCard.props';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';
import { MouseEvent } from 'react';


function ProductCard(props: ProductCardProps) {
    const dispatch = useDispatch<AppDispatch>();
    
    const add = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(cartActions.incrementItem(props.id))
    }


    return (
        <Link to={`/product/${props.id}`} className={styles['link']}>
        <div className={styles['card-wrapper']}>
            <div className={styles['head']} style={{ backgroundImage: `url('${props.image}')`}}>
                <div className={styles['price']}>
                    {props.price}&nbsp;
                    <span className={styles['currency']}>₽</span> 
                </div>
                <div className={styles['rating']}>
                    {props.rating}&nbsp;
                    <img src="./star.svg" alt="иконка звездочки" />
                </div>
                <button className={styles['add-to-cart']} onClick={add}>
                    <img src="./buy-icon.svg" alt="иконка покупка" />
                </button>
            </div>
            <div className={styles['footer']}>
                <div className={styles['name']}>{props.name}</div> 
                <div className={styles['description']}>{props.description}</div> 
            </div>
        </div>
        </Link>
    );
} 


export default ProductCard;