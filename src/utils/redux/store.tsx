import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import wishListReducer from "./wishListReducer";
import productsReducer from "./productsReducer";
import userSelectionReducer from "./userSelectionReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        wishListStore: wishListReducer,
        productsStore: productsReducer,
        userSelectionStore: userSelectionReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
