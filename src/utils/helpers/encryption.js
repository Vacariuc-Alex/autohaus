import {EMPTY_STRING} from "src/utils/constants/constants";

export const encryptText = (value) => {
    return btoa(value);
}

export const decryptText = (value) => {
    try {
        return atob(value);
    } catch (Error) {
        return EMPTY_STRING;
    }
}
