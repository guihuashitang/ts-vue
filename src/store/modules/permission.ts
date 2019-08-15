import {  constantRouterMap, asyncRouterMap } from '@/router'
import list from './rrrrrr'
// var asyncRouterMap: any = list.data.menuList;
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles: any, route: any) {
  if (route.meta && route.meta.roles) {
    return roles.some((role:string) => route.meta.roles[0] === role)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap: any, roles: any) {
  const accessedRouters = asyncRouterMap.filter((route: any) => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state: any, routers: any) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }: any, data: any) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        // if (roles.indexOf('admin') >= 0) {
        //   accessedRouters = asyncRouterMap
        // } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        // }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
