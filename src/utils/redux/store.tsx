import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "src/utils/saga/rootSaga";
import wishListReducer from "src/utils/redux/wishListReducer";
import productsReducer from "src/utils/redux/productsReducer";
import userSelectionReducer from "src/utils/redux/userSelectionReducer";

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
