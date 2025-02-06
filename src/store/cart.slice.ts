import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//Интерфейс элементов корзины
export interface CartItem {
    id: number;
    count: number;
}

//Интерфейс состояния корзины
export interface CartState {
   items: CartItem[];
}

//Начальное состояние корзины
const initialState: CartState = {
    items: []
};

//создание слайса
export const cartSlice = createSlice({
    name:'cart',
    initialState,
    //набор функций которые меняют состояния приложения
    //можно создавать неогранич число редюсоров которые меняют состояние
    reducers: {
        //добавляем товар в корзину
        incrementItem: (state, action: PayloadAction<number>) => { 
            const itemId = action.payload;
            //ищем товар с таким же id в корзине
            const existingItem = state.items.find(item => item.id === itemId);

                if (existingItem) {
                    //если товар уже есть, увеличиваем количество
                   existingItem.count += 1;
                } else {
                    //если товара нет, добавляем его с count = 1
                state.items.push({ id: itemId, count: 1 });
            }  
        },

        //удаляем товар из корзины 
        removeItem: (state, action: PayloadAction<number>) => {
            const itemId = action.payload;
            state.items.filter(item => item.id !== itemId)
        },

        //уменьшение кол-ва товара
        decrementItem: (state, action: PayloadAction<number>) => {
            const itemId = action.payload;
            const existingItem = state.items.find(item => item.id === itemId);

            if (existingItem) {
                if (existingItem.count > 1) {
                    existingItem.count -= 1;
                } else { 
                    //если кол-во равно 1, то удаляем товар из корзины
                    state.items = state.items.filter(item => item.id !== itemId)    
                }
            }

         }
    }
            
            
    });





export default cartSlice.reducer;
export const cartActions = cartSlice.actions;