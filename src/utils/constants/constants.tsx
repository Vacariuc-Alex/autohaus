export type Product = {
    id: number,
    company: string,
    model: string,
    year: number,
    vin: string,
    color: string,
    price: number,
    image?: string
    isFavourite?: boolean
};
