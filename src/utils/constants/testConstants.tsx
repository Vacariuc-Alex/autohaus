import {Product} from "./constants";

//Mock store
export type InitialState = {
    wishListStore: {
        ids: number[]
    },
    productsStore: {
        responseData: Product[];
        loading: boolean;
        error: string | null;
        isRequestExecuted: boolean;
    }
};

export const initialState: InitialState = {
    wishListStore: {
        ids: []
    },
    productsStore: {
        responseData: [
            {
                id: 1,
                company: "WAZ",
                model: "2106",
                year: 1986,
                vin: "JTDZN3EU4E3035524",
                color: "Red",
                price: 250,
                isFavourite: false
            },
            {
                id: 2,
                company: "UAZ",
                model: "452",
                year: 1965,
                vin: "WAURGAFD1DN635608",
                color: "Green",
                price: 100,
                isFavourite: false
            },
        ],
        loading: false,
        error: "",
        isRequestExecuted: true
    }
};
