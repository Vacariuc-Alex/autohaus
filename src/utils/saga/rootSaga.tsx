import {all} from "redux-saga/effects";
import sagaProductsWatcher from "src/utils/saga/sagaProductsWatcher";

export default function* rootSaga() {
    yield all([
        sagaProductsWatcher()
    ]);
}
