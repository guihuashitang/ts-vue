const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  mutations: {
    ADD_VISITED_VIEWS: (state:any, view:any) => {
      if (state.visitedViews.some((v:any) => v.path === view.path)) return
      let title = ''
      let detailList=['agentPlayerDetail','agentDetail','agentPlayerRecord','agentPlayerGold',
        'agentsDayReport','agentsCousum','roomList','membersAdd','membersList','operateDataDetail',
        'paysettingsedit','downloadConfigEdit','currencyMappingEdit','userListsAdd','commissionManagerEdit',
        'managerDetailsEdit','produceManagerEdit','hotConfigEdit','produceManagerelementE','tagConfigEdit',
        'vipLevelConfigEdit',"gameBetaUserListAdd",'cpAdd','subsystemEdit','historyroom','accountRechargeRecord',
        'consumeList','accountCashHistory','accountGiftRecord','activeEdit','activedisplayListEdit','gameFreeListEdit',
        'alchemyAdd','showEdit','itemListEdit','webGameLogo','openConfigEdit','configEdit','qualifyLevelConfigEdit',
        'shareSmallConfigAdd','bannerAdvconfigAdd','sysmsgAdd','pushConfigAdd','smallprogramVersionConfigEdit']
      //标题 带ID
      if (detailList.some(name => view.name === name)) {
        if(view.params.title==1||view.query.title==1){
          title =  view.meta.title + '新增'
        }else if(view.params.title==2||view.query.title==2){
          title =  view.meta.title + '编辑'
        }else if(view.params.isopen==':isopen'||view.query.isopen==':isopen'){
          title =  view.meta.sidetitle
        }else if(view.params.isopen===1||view.query.isopen===1){
          title =  view.meta.sidetitle + `(${view.params.id?view.params.id:view.query.id})`
        }else{
          title =  view.meta.title + `(${view.params.id?view.params.id:view.query.id})`
        }
        
      } else {
        title =  view.meta.sidetitle ? view.meta.sidetitle : view.meta.title || 'no-name'
      }
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: title
      })
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISITED_VIEWS: (state:any, view:any) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    DEL_OTHERS_VIEWS: (state:any, view:any) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, i + 1)
          break
        }
      }
    },
    DEL_ALL_VIEWS: (state:any) => {
      state.visitedViews = []
      state.cachedViews = []
    }
  },
  actions: {
    addVisitedViews({ commit }:any, view:any) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }:any, view:any) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews({ commit, state }:any, view:any) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews({ commit, state }:any) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    }
  }
}

export default tagsView
