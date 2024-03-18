import {EXPIRATION_PREFIX} from "src/utils/constants/constants";

export function setItemInLocalStorageWithExpiration(key, value, expirationHours) {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + expirationHours * 60 * 60 * 1000
    };
    localStorage.setItem(key, JSON.stringify(item));
    localStorage.setItem(EXPIRATION_PREFIX + key, String(item.expiry));
}

export function getItemFromLocalStorageWithExpiration(key) {
    const expiry = localStorage.getItem(EXPIRATION_PREFIX + key);
    if (!expiry) {
        return null;
    }
    const now = new Date().getTime();
    if (now > expiry) {
        deleteItemFromLocalStorage(key);
        return null;
    }
    return JSON.parse(localStorage.getItem(key));
}

export function deleteItemFromLocalStorage(key) {
    localStorage.removeItem(key);
    localStorage.removeItem(EXPIRATION_PREFIX + key);
}
