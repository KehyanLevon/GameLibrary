export const addToLocalStorage = async function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getFromLocalStorage = async function(key, defaultValue=null) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

export const removeFromLocalStorage = async function(key) {
    localStorage.removeItem(key);
}
