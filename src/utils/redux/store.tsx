import {configureStore} from "@reduxjs/toolkit";
import wishListReducer from "./wishListReducer";

import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import productsReducer from "./productsReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        wishListStore: wishListReducer,
        productsStore: productsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
