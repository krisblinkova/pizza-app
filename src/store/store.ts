import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { saveState } from "./storage";
import cartSlice from "./cart.slice";


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

//объединяем редьюсеры
const rootReducer = combineReducers({
    user: userSlice,
    cart: cartSlice
});

//применяем persistReducer к корневому редьюсеру
const persistedReducer = persistReducer(persistConfig, rootReducer);
  

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
//в случае изменения состояния берем JWT и записываем 
//подписка 
store.subscribe(() => {
    saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
});

//

//выведение типов `RootState` и `AppDispatch` из хранилища
export type RootState = ReturnType<typeof store.getState>;
// выведенные типы: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;