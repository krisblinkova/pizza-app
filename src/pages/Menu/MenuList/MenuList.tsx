import ProductCard from "../../../components/ProductCard/ProductCard";
import { MenuListProps } from "./MenuList.props";


export function MenuList({ products }: MenuListProps) {
    return products.map(p => ( //если нет ошибки, то загружаем
                 <ProductCard
                 key={p.id}
                 id={p.id} 
                 name={p.name}
                 description={p.ingredients.join(', ')} 
                 image={p.image} 
                 rating={p.rating}
                 price={p.price}
             />
        ));
     }
