import router from './router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
// import request from '@/utils/request.ts'
import list from '@/store/modules/rrrrrr'
// import i18n from '../src/lang'

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permissiom judge function
function hasPermission(roles:any, permissionRoles:any) {
  // if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  // if (!permissionRoles) return true
  try {
    return roles.some((role:any) => permissionRoles.indexOf(role) >= 0)
  } catch (error) {
    // 
    // 
  }
}

const whiteList = ['/login', '/authredirect', '/401', '/404']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入  
      next()
    } else {
      if (to.path === '/login') {
        next({ path: '/home' })
        NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
      } else {
        try {
          if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
            store.dispatch('GetUserInfo').then(res => { // 拉取user_info
              const roles = []
              for (const i in list.data.menuCodeSet) {
                roles.push(list.data.menuCodeSet[i])
              }
              store.dispatch('GenerateRoutes', {roles} ).then(() => { // 根据roles权限生成可访问的路由表
                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              })

            }).catch(() => {
              // alert('permission.js error')
              store.dispatch('FedLogOut').then(() => {
                Message({
                  message: 'FedLogOut',
                  type: 'warning'
                })
                // next()
                next({ path: '/login' })
              })
            })
          } else {
            // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
            // if (hasPermission(store.getters.roles, to.meta.roles)) {
            //   if (to.path === '/custom/customIM') {
            //     request({
            //       url: 'manager/custom/service/getImWebInitConfig',
            //       method: 'post'
            //     }).then(res => {
            //       let fulls = "left=0,screenX=0,top=0,screenY=0,scrollbars=1,menubar=no,location=no,toolbar=no";
            //       if (window.screen) {
            //         let ah = screen.availHeight - 30;
            //         let aw = screen.availWidth - 10;
            //         fulls += ",height=" + ah;
            //         fulls += ",innerHeight=" + ah;
            //         fulls += ",width=" + aw;
            //         fulls += ",innerWidth=" + aw;
            //         fulls += ",resizable"
            //       } else {
            //         fulls += ",resizable";
            //       }
            //       window.open('custom/index.html?data=' + encodeURIComponent(JSON.stringify(res.data)), "客服系统", fulls)
            //       next({ path: '/custom/history' })
            //       NProgress.done()
            //     }).catch(err => {
            //       next({ path: '/custom/history' })
            //     })
            //   } else {
            //     next()
            //     NProgress.done()
            //   }
            //   //  next()
            // } else {
            //   next({ path: '/401', replace: true, query: { noGoBack: true } })
            // }
            // 可删 ↑
            next()
          }
        } catch (e) {

          next('/login')
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
