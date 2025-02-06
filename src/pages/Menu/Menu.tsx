import styles from './Menu.module.css'
import Headling from "../../components/Headling/Headling";
import Search from "../../components/Search/Search";
import { PREFIX } from '../../helpers/API';
import { ChangeEvent, useEffect, useState } from 'react';
import { Product } from '../../interfaces/product.interface';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    //состояние фильтра поиска
    const [filter, setFilter] = useState<string>();


    useEffect(() => {
        getMenu(filter)
    }, [filter]);
    
    
    const getMenu = async (name?: string) => {
    try {
        //говорим что загружаемся
        setIsLoading(true);
        const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
            params: {
                name
            }
        });
        setProducts(data);
        setIsLoading(false);
    } catch (e) {
        console.error(e);
        if (e instanceof AxiosError) {
            setError(e.message)
        }
        setIsLoading(false);
        return;
    }


// запрос с помощью fetch
    // const [products, setProducts ] = useState<Product[]>([]);
    
    // const getMenu = async () => {
    //     try {
    //         const res = await fetch(`${PREFIX}/products`);
    //         if (!res.ok) {
    //             return;
    //         }
    //         const data = await res.json() as Product[];
    //         setProducts(data);
    //     } catch (e) {
    //     console.error(e)
    //     return;
    //    }
    };

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    
    
    return <> 
    
        <div className={styles['head']}>
                <Headling>Меню</Headling>
                <Search onChange={updateFilter} />
        <div className={styles['body']}>
            {error && <>{error}</>}
            {!isLoading && <MenuList products={products} />}
            {isLoading && <>Загрузка продуктов...</> }       
        </div>   
    </div>           
 </>;
}

export default Menu;


