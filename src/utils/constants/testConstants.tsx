import {Product} from "./constants";

export const stubResponseData = [
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
];

export type InitialState = {
    wishListStore: {
        ids: number[];
    },
    productsStore: {
        responseData: Product[];
        loading: boolean;
        error: string | null;
        isRequestExecuted: boolean;
    },
    userSelectionStore: {
        selectedCompanies: string[];
        currentPage: number;
        numberOfPages: number;
        elementsPerPage: number;
    }
};

export const initialState: InitialState = {
    wishListStore: {
        ids: []
    },
    productsStore: {
        responseData: stubResponseData,
        loading: false,
        error: "",
        isRequestExecuted: true
    },
    userSelectionStore: {
        selectedCompanies: [],
        currentPage: 1,
        numberOfPages: 1,
        elementsPerPage: 10
    }
};
