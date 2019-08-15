const getters = {
  sidebar: (state:any) => state.app.sidebar,
  activemenu: (state:any) => state.app.activemenu,
  sidebaractivemenu:(state:any) => state.app.sidebaractivemenu,
  language: (state:any) => state.app.language,
  gamestree: (state:any) => state.app.gamestree,
  gamesMap: (state:any) => state.app.gamesMap,
  gamesSelectMap:(state:any) => state.app.gamesSelectMap,
  visitedViews: (state:any) => state.tagsView.visitedViews,
  cachedViews: (state:any) => state.tagsView.cachedViews,
  token: (state:any) => state.user.token,
  roles: (state:any) => state.user.roles,
  permission_routers: (state:any) => state.permission.routers,
  addRouters: (state:any) => state.permission.addRouters,
}
export default getters
