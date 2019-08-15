import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/layout/Layout.vue';

Vue.use(Router);

export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index.vue'), hidden: true},

];


export default new Router({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  mode: 'history',
  // base: process.env.BASE_URL, //页面基础路径,设置之后，使用 vue-router api 进行跳转 都会加上这个 base 路径
  routes: constantRouterMap
});


export const asyncRouterMap = [
  
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'home',
    children: [{
      path: '/home',
      component: () => import('@/views/home/index.vue'),
      name: 'home',
      meta: {
        title: '首页',
        activeindex: '/home',
        icon: 'dashboard',
        noCache: true,
        roles: ['m_001'],
        index: 1
      }
    }]
  },
  
  //用户路由
  {
    path: '/user',
    component: Layout,
    name: 'user',
    meta: {roles: ['m_002']},
    children: [
      //渠道
      {
        path: '/user/agentChannel',
        component: () => import('@/views/agentChannel/index.vue'),
        name: 'agentChannel',
        meta: {
          title: '用户',
          sidetitle: '渠道管理',
          activeindex: '/user',
          sidebaractive: 'agentChannel',
          icon: 'peoples',
          noCache: false,
          index: 1,
          roles: ['m_002_001']
        },
      },

    ]
  },

  // //运营路由
  // {
  //   path: '/operate',
  //   component: Layout,
  //   name: 'operate',
  //   meta: {roles: ['m_003']},
  //   children: [
  //     {
  //       path: '/operate/gold',
  //       redirect: '/operate/gold/index',
  //       name: 'goldListF',
  //       meta: {
  //         title: '运营',
  //         sidetitle: '金币场管理',
  //         activeindex: '/operate',
  //         sidebaractive: 'gold',
  //         icon: 'component',
  //         roles: ['m_011'],
  //         index: 1,
  //       },
  //       children: []
  //     },


  //   ]

  // },

  
  
  
  // //账户路由

  // {
  //   path: '/account',
  //   component: Layout,
  //   name: 'account',
  //   meta: {roles: ['m_004']},
  //   children: [
  //     {
  //       path: '/account/chargeList',
  //       redirect: '/account/chargeList/index',
  //       name: 'chargeListF',
  //       meta: {
  //         title: '账户',
  //         sidetitle: '订单管理',
  //         activeindex: '/account',
  //         sidebaractive: 'chargeList',
  //         icon: 'component',
  //         roles: ['m_012_001'],
  //         index: 1,
  //       },
  //       children: []
  //     },
  //   ]
  // },


  //数据报表
  {
    path: '/report',
    component: Layout,
    name: 'report',
    meta: {roles: ['m_005']},
    children: [

      {
        path: '/report/roundHistory',
        component: () => import('@/views/agentChannel/index.vue'),
        name: 'roundHistory',
        meta: {
          title: '数据',
          sidetitle: '历史战绩',
          activeindex: '/report',
          icon: 'chart',
          noCache: true,
          sidebaractive: 'roundHistory',
          roles: ['m_005_002']
        }
      },
   


    ]
  },


  //系统设置
  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: {roles: ['m_009']},
    children: [
      {
        path: '/system/userLists',
        component: () => import('@/views/agentChannel/index.vue'),
        name: 'userLists',
        meta: {
          title: '系统',
          sidetitle: '用户管理',
          activeindex: '/system',
          sidebaractive: 'userLists',
          icon: 'chart',
          roles: ['m_009_001']
        }
      },


    ]
  },

  //游戏管理
  {
    path: '/game',
    component: Layout,
    name: 'game',
    meta: {roles: ['m_017']},
    children: [
      // {
      //   path: '/game/version',
      //   component: _import('system/version/index'),
      //   name: 'version',
      //   meta: {
      //     title: '游戏管理',
      //     sidetitle: '版本管理',
      //     activeindex: '/game',
      //     sidebaractive: 'version',
      //     icon: 'chart',
      //     roles: ['m_011_009']
      //   }
      // },
    ]
  },


]





