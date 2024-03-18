import {array, number, object, string} from "yup";

export const productSchema = object().shape({
    company: string().required(),
    model: string().required(),
    year: number().required().min(1900).max(new Date().getFullYear()),
    vin: string().required().matches(/[A-HJ-NPR-Z0-9]{17}/, "Invalid VIN format\nExample of valid VIN: 4Y1SL65848Z411439"),
    color: string().required(),
    price: number().required().positive(),
    images: array().of(
        string().test({
            message: (value) => {
                const index = value.path.split(/\[|\]/)[1];
                const order = parseInt(index) + 1;
                return `Invalid URL for image ${order}!\nPlease provide a valid image URL!\nExample of valid image URL: https://example.com/image.png`;
            },
            test: (value) => {
                return /^\s*$/.test(value) || /\bhttps?:\/\/\S*\.(?:png|jpe?g|gif|webp)\b/i.test(value);
            }
        })
    )
});

export const userLoginSchema = object().shape({
    username: string().required(),
    password: string().required()
});

export const userRegistrationSchema = object().shape({
    username: string().required(),
    email: string().required().email(),
    password: string().required().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/,
        "The password is of incorrect format!" +
        "\nShould contain at lease onr lowercase character, " +
        "one uppercase character, one digit, one symbol, and to have at lease 8 characters!"),
    avatar: string().matches(
        /^\s*$|https?:\/\/\S*\.(?:png|jpe?g|gif|webp)/i,
        "Invalid URL for image!\nPlease provide a valid image URL!" +
        "\nExample of valid image URL: https://example.com/image.png"
    )
});
