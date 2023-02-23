import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    permissions: '', //当前用户权限
    isLogin: false, //用户是否登录
    userInfo: {}, //用户信息
  },
  mutations: {
    changePermissions(state, value){
      state.permissions = value
    },
    changeIsLogin(state, value){
      state.isLogin = value
    },
  },
  actions: {
    permissionsAction(context, value){
      context.commit("changePermissions", value)
    },
    isLoginAction(context, value){
      context.commit("changeIsLogin", value)
    }
  },
})

export default store
