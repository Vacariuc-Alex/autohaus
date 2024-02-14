import {all} from 'redux-saga/effects';
import sagaProductsWatcher from './sagaProductsWatcher';

export default function* rootSaga() {
    yield all([
        sagaProductsWatcher()
    ]);
}
