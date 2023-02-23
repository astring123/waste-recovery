import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    //  登录
    {
      path: '/login',
      component: () => import('../views/login')
    },
    //  普通用户
    {
      path: '/',
      component: () => import('../views/user/index')
    },
    {
      path: '/classification',
      component: () => import('../views/user/classification')
    },
    {
      path: '/recycle',
      component: () => import('../views/user/recycle')
    },
    {
      path: '/recycler',
      component: () => import('../views/user/recycler')
    },

    //  回收员
    {
      path: '/recycler/order',
      component: () => import('../views/recycler/order')
    },
    {
      path: '/recycler/receive',
      component: () => import('../views/recycler/receive')
    },
    {
      path: '/recycler/info',
      component: () => import('../views/recycler/info')
    },

    // 管理员
    {
      path: '/admin/userInfo',
      component: () => import('../views/admin/userInfo')
    },
    {
      path: '/admin/recycler',
      component: () => import('../views/admin/recycler')
    },
    {
      path: '/admin/order',
      component: () => import('../views/admin/order')
    },
    {
      path: '/admin/classification',
      component: () => import('../views/admin/classification')
    },
    {
      path: '/admin/announcement',
      component: () => import('../views/admin/announcement')
    },
    {
      path: '/admin/rotograph',
      component: () => import('../views/admin/rotograph')
    },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

//路由拦截，对进入不同路由地址做判断
router.beforeEach((to, from, next) => {

  //管理员能访问的路径
  let adminRouterList =   [
      '/admin/userInfo','/admin/recycler','/admin/order',
    '/admin/classification','/admin/announcement','/admin/rotograph'
  ]
  //回收员能访问的路径
  let recyclerRouterList = [
      '/recycler/order','/recycler/receive','/recycler/info'
  ]
  //普通用户能访问的路径
  let userRouterList = [
      '/','/classification','/recycle','/recycler',
  ]
  // let newsReg = /^\/news\/show\/[0-9]{0,999}$/g
  // let musicReg = /^\/music\/show\/[0-9]{0,999}$/g

  let userInfo = JSON.parse(localStorage.getItem('userInfo')) //获取用户登录信息，未登录为null
  if(adminRouterList.indexOf(to.path) > -1){ //当访问上方定义 adminRouterList 数组中存在的这些路由地址时，判断用户是否登录，并且判断登录用户权限是否为管理员，满足就放行
    // console.log(store.state.isLogin)
    if(userInfo && userInfo.permissions == 'admin'){ //判断用户是否登录，并且登录用户权限是否为管理员
      next() //放行
    }else{
      next({ path: '/login' }) //不满足跳转到登录页
    }
  }else if(recyclerRouterList.indexOf(to.path) > -1){ //进入回收员页面
    if(userInfo && userInfo.permissions == 'recycler'){ //判断用户是否登录，并且登录用户权限是否为回收员
      next() //放行
    }else{
      next({ path: '/login' }) //不满足跳转到登录页
    }
  }else if(userRouterList.indexOf(to.path) > -1){ //进入普通用户页面，直接放行
    console.log('普通用户')
    if(userInfo && userInfo.permissions == 'user'){ //判断用户是否登录，并且登录用户权限是否为普通用户
      next() //放行
    }else{
      next({ path: '/login' }) //不满足跳转到登录页
    }
  }else if(to.path == '/login'){ //登录页
    next() //放行
  }else{ //进入没有定义的路由地址，跳转到首页
    next( { path: '/'})
  }
})

export default router
