import {call, put, takeEvery} from "redux-saga/effects";
import {fetchDataError, fetchDataRequest, fetchDataSuccess} from "src/utils/redux/productsReducer";
import axios from "axios";

const fetchAxios = () => {
    return axios.get("http://localhost:3001/products");
}

function* workGetProductsFetch(): Generator<any, void, any> {
    try {
        const response = yield call(fetchAxios);
        const data = yield response.data;
        yield put(fetchDataSuccess(data));
    } catch (error: any) {
        yield put(fetchDataError(error.message));
    }
}

function* sagaProductsWatcher(): Generator<any, void> {
    yield takeEvery(fetchDataRequest.type, workGetProductsFetch);
}

export default sagaProductsWatcher;
