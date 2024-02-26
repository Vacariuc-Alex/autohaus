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
