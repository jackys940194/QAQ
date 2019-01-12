// 忽略這個

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Test from './views/Test.vue'
import FirstPage from './views/FirstPage.vue'
import SecondPage from './views/SecondPage.vue'
import ThirdPage from './views/ThirdPage.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {path: '/', component:FirstPage},
        {path: '/secondpage',component:SecondPage},
        {path: '/thirdpage',component:ThirdPage}
      ]
    },
    // {
    //   path: '/importApi',
    //   name: 'importApi',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/ImportApi.vue')
    // }
  ]
})
