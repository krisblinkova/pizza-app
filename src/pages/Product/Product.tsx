import { Await, useLoaderData } from "react-router-dom";
import { Product } from '../../interfaces/product.interface'
import { Suspense } from "react";

//компонент для отображения инфо о продукте
export function Product() {
    const data = useLoaderData() as { data: Product }; //получаем объект, где есть одно св-ва data, которое Product


    return <>
    <Suspense fallback={<div>Загрузка...</div>}>
        <Await
            resolve={data.data}
        >
            {({ data }:  { data: Product }) => (
                <>Product - {data.name}</>
            )}
        </Await>
     </Suspense>
    </>;
}