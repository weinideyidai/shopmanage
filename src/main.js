import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import "./assets/css/global.css"
import axios from "axios"
import TreeTable from "vue-table-with-tree-grid"
import  Nprogress from"nprogress"
import  "nprogress/nprogress.css"
import  store from "./store"
axios.defaults.baseURL="http://120.24.27.228:8080/"
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(window.sessionStorage.getItem("token")) {
    Nprogress.start()
    config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem("token")
    console.log(config);
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log(error);
  return Promise.reject(error);
});
axios.interceptors.response.use(function (response){
  // 处理响应数据
  Nprogress.done()

  return response;
}, function (error) {
  // 处理响应失败
  if(error.response.status==401){
    Vue.prototype.$message.error('登录过期，连接超时');

    router.replace({
      path: 'login',
      query: {redirect: router.currentRoute.fullPath}
    })
    //this.$message.error("过期")
    //this.$router.push("/login")
  }else if (error.response.status==404) {
    Vue.prototype.$message.error('请填写完整信息');
  }else {
    Vue.prototype.$message.error('发生错误');
  }

  return Promise.reject(error);
})
Vue.prototype.$http=axios
Vue.config.productionTip = false
Vue.component("table-tree",TreeTable)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
