import {EMPTY_STRING} from "src/utils/constants/constants";

export const createProductObjectFromFormData = (data) => {
    const imageUrls = [];
    for (let key in data) {
        if (key.startsWith("image")) {
            if (data[key] !== EMPTY_STRING) {
                imageUrls.push(data[key]);
            }
            delete data[key];
        }
    }
    return {...data, images: imageUrls};
}
