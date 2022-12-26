import Vue from "vue";
import Vuex from "vuex";
import userStore from "./user";
Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      isShowPhoneNav: false,
	  isHideIosHeader:false,
    }
  },
  mutations: {

    setPhoneNav(state, isShow) {
      state.isShowPhoneNav = isShow;
    },
	setHideHeader(state, isHide) {
	  state.isHideIosHeader = isHide;
	}
  },
  //模块
  modules: {
    userStore
  }
});