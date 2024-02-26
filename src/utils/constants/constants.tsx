export type Product = {
    id: string;
    company: string;
    model: string;
    year: number;
    vin: string;
    color: string;
    price: number;
    images?: string[];
    isFavourite?: boolean;
};

export const EMPTY_STRING = "";
