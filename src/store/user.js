import api from "../api/api";
const userStore = {
    state: {
        userInfo: {}, //用户信息
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = {
                ...state.userInfo,
                ...userInfo
            };
            localStorage.setItem('THEONE_USER', JSON.stringify(state.userInfo));
        },
    },
    actions: {
        async getUserInfo(ctx) {
      
            const user_attribute_res = await api.userAttributeUserInfo().catch(e => e);
            if (user_attribute_res && user_attribute_res.data && user_attribute_res.data.code == 200) {
                const user_attribute = user_attribute_res.data.data;
                ctx.commit('setUserInfo', user_attribute);
            } else {
                //获取用户信息失败
            }
        },
    }
};
export default userStore;
