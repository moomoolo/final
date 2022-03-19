import actionType from "./actionType";

const onUserInfoChange = (state, { payload }) => {
    return {
        ...state,
        userInfo: payload,
    }
}

const typeMap = {
    [actionType.changeUserInfo]: onUserInfoChange,

}
const reducer = (state, action) => {
    if (typeMap[action.type]) {
        return typeMap[action.type](state, action);
    }
    return state;
}

export default reducer;
