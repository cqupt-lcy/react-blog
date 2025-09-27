import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken, removeToken } from "@/utils";
import { loginAPI, userInfoAPI } from "@/apis/user";
const userStore = createSlice({
    name: 'user',
    initialState: {
        token: getToken() || '',
        userInfo: {},
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            _setToken(action.payload);
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.token = '';
            state.userInfo = {};
            removeToken();
        },
    },
})

const { setToken, setUserInfo, clearUserInfo } = userStore.actions;
const userReducer = userStore.reducer

// React Thunk 处理异步方法
const fetchLogin = (formData) => {
    return async (dispatch) => {
        const res = await loginAPI(formData);
        dispatch(setToken(res.data.token));
    }
}
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await userInfoAPI();
        dispatch(setUserInfo(res.data));
    }
}


export { setToken, setUserInfo, clearUserInfo, fetchLogin, fetchUserInfo };
export default userReducer;