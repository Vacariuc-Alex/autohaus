import {all} from "redux-saga/effects";
import sagaProductsWatcher from "src/utils/saga/sagaProductsWatcher";
import sagaUsersWatcher from "src/utils/saga/sagaUsersWatcher";

export default function* rootSaga() {
    yield all([
        sagaProductsWatcher(),
        sagaUsersWatcher()
    ]);
}
