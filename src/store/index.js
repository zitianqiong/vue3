import {createStore} from 'vuex'

export default createStore({
    state: {
        tokenStr: "",
        userInfo: {},
        routes: [],
        breadListState: [] // 面包屑列表数据
    },
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        },
        setToken(state, data){
            state.tokenStr = data;
        },
        setUserInfo(state, data){
            state.userInfo = data
        },
        breadListMutations (state, list) {
            state.breadListState = list;
        }
    },
    actions: {},
    modules: {}
})
