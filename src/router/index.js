import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "../components/login.vue"
import  home from "../components/home.vue"
import welcome from "../components/welcome.vue"
import  userlist from "../components/userlist.vue"
import  role from   "../components/role.vue"
import power from  "../components/power.vue"
import  shoplist from "../components/shoplist.vue"
import  categories from "../components/categories.vue"
import  goodsadd from "../components/goodsadd.vue"
import  resources from "../components/resources.vue"
import address from "../components/address.vue"
import  customer from "../components/customer.vue"
import log from  "../components/log.vue"
import  regionalreport  from "../components/regionalreport.vue"
import  companyreport from "../components/companyreport.vue"
import  peoplereport from "../components/peoplereport.vue"
import  brand  from    "../components/brand.vue"
import  color from    "../components/color.vue"
import  commodity from "../components/commodity"
import  size from "../components/size.vue"
import information from "../components/information.vue"
import  shopcar from "../components/shopcar.vue"
import  order  from   "../components/order.vue"
import  chat  from   "../components/chat.vue"
import  orderitems from "../components/orderitems"
import  team from   "../components/team"
Vue.use(VueRouter)
  const routes = [
    {path:"/",redirect:"/login"},
    {path:"/login", component:login},
    {path:"/home",component: home,redirect: "/welcome",children:[{path:"/welcome",component:welcome},{path:"/users",component:userlist},
        {path:"/roles",component:role},
        {path:"/rights",component:power},
        {path:"/goods",component:shoplist},
            {path:"/categories",component:categories},
            {path:"/goods/add",component:goodsadd},
            {path:"/resources",component:resources},
            {path:"/address",component:address},
            {path:"/customer",component:customer},
            {path:"/log",component:log},
            {path:"/regionalreport",component:regionalreport},
            {path:"/companyreport",component:companyreport},
            {path:"/peoplereport",component:peoplereport},
            {path:"/brand",component:brand},
            {path:"/color",component:color},
            {path:"/commodity",component:commodity},
            {path:"/size",component:size},
            {path:"/information",component:information},
            {path:"/shoppingcar",component:shopcar},
            {path:"/order",component:order},
            {path:"/chat",component:chat},
            {path:"/orderitems",component:orderitems},
            {path:"/team",component:team}
      ]}
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
    //console.log(to);
    //console.log(from);
    /* 路由发生变化修改页面title */
    if (to.path==="/login")
       return  next()
    const isLogin = sessionStorage.getItem("token");
    if (!isLogin) return next("/login")
    next()

})



export default router
