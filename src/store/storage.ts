
//функция чтения по ключу
export function loadState<T>(key: string): T | undefined { //возвращает либо Т либо undefined
    try {
        const jsonState = localStorage.getItem(key);
        if (!jsonState) {
            return undefined;
        }
        return JSON.parse(jsonState)
    } catch(e) {
        console.error(e);
        return undefined;
    }
}

//функция сохранения состояния 
export function saveState<T>(state: T, key: string) {
    const stringState = JSON.stringify(state);
    localStorage.setItem(key, stringState);

}
    
    
    