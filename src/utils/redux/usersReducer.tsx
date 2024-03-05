import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AUTHENTICATED_USER, DEFAULT_EXPIRATION_PERIOD, User, UserLogin} from "src/utils/constants/constants";
import {
    deleteItemFromLocalStorage,
    setItemInLocalStorageWithExpiration
} from "src/utils/helpers/sessionStorageWithExpiration";
import {WRONG_CREDENTIALS} from "src/utils/constants/errorMessages";
import {encryptText} from "src/utils/helpers/encryption";

// Initial data
type DataState = {
    responseData: User[];
    loading: boolean;
    error: string | null;
    isRequestExecuted: boolean;
}

const initialState: DataState = {
    responseData: [],
    loading: false,
    error: null,
    isRequestExecuted: false,
};

// Slice
const usersSlice = createSlice({
    name: "usersSlice",
    initialState,
    reducers: {
        fetchUserDataRequest(state: DataState) {
            state.loading = true;
            state.error = null;
        },
        fetchUserDataSuccess(state: DataState, action: PayloadAction<User[]>) {
            state.responseData = action.payload;
            state.isRequestExecuted = true;
            state.loading = false;
        },
        fetchUserDataError(state: DataState, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        },
        authenticateUser(state: DataState, action: PayloadAction<UserLogin>) {
            const {username, password} = action.payload;
            const user = state.responseData
                .find((e) => e.username === username && e.password === encryptText(password));

            if(user) {
                setItemInLocalStorageWithExpiration(AUTHENTICATED_USER, user, DEFAULT_EXPIRATION_PERIOD);
            } else {
                throw new Error(WRONG_CREDENTIALS);
            }
        },
        logoutUser() {
            deleteItemFromLocalStorage(AUTHENTICATED_USER);
        }
    }
});

export const {
    fetchUserDataRequest,
    fetchUserDataSuccess,
    fetchUserDataError,
    authenticateUser,
    logoutUser,
} = usersSlice.actions;
export default usersSlice.reducer;
