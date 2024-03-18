import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {fetchUserDataError, fetchUserDataRequest, fetchUserDataSuccess} from "src/utils/redux/usersReducer";

const fetchAxios = () => {
    return axios.get("http://localhost:3001/users");
}

function* workGetUsersFetch(): Generator<any, void, any> {
    try {
        const response = yield call(fetchAxios);
        const data = yield response.data;
        yield put(fetchUserDataSuccess(data));
    } catch (error: any) {
        yield put(fetchUserDataError(error.message));
    }
}

function* sagaUsersWatcher(): Generator<any, void> {
    yield takeEvery(fetchUserDataRequest.type, workGetUsersFetch);
}

export default sagaUsersWatcher;
