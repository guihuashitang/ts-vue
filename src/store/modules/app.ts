import Cookies from "js-cookie";
// import {getGamesTreeList, gameInfoList, agentsAccount} from '@/api/commons'

/**
 * 递归过滤游戏菜单
 * @param asyncRouterMap
 * @param roles
 */
function filterGamesTree(trees: any) {
  trees.map((tree: any) => {
    tree.list.map((child: any) => {
      if (child.list && !child.list.length) {
        delete child.list;
      }
    });
  });
  return trees;
}

const app = {
  state: {
    sidebar: {
      opened: Cookies.get("sidebarStatus")=='1'?true:false
    },
    language: Cookies.get("language") || "zh",
    gamestree: {
      data: []
    },
    gamesMap: {},
    gamesSelectMap: {},
    activemenu: Cookies.get("activemenu") || "/home",
    sidebaractivemenu: Cookies.get("sidebaractivemenu") || "agentChannel"
  },
  mutations: {
    TOGGLE_SIDEBAR: (state: any) => {
      if (state.sidebar.opened) {
        Cookies.set("sidebarStatus", "0");
      } else {
        Cookies.set("sidebarStatus", "1");
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    SET_LANGUAGE: (state: any, language: any) => {
      state.language = language;
      Cookies.set("language", language);
    },
    SET_ACTIVEMENU: (state: any, activemenu: any) => {
      state.activemenu = activemenu;
      Cookies.set("activemenu", activemenu);
    },
    SET_SIDEBARACTIVEMENU: (state: any, activemenu: any) => {
      state.sidebaractivemenu = activemenu;
      Cookies.set("sidebaractivemenu", activemenu);
    },
    SET_GAMETREE: (state: any, gamestree: any) => {
      state.gamestree = gamestree;
    },
    SET_GAMESMAP: (state: any, gamesMap: any) => {
      state.gamesMap = gamesMap;
    },
    SET_GAMESSELECTAP: (state: any, gamesSelectMap: any) => {
      state.gamesSelectMap = gamesSelectMap;
    }
  },
  actions: {
    toggleSideBar({ commit }: any) {
      commit("TOGGLE_SIDEBAR");
    },
    setLanguage({ commit }: any, language: any) {
      commit("SET_LANGUAGE", language);
    },
    setActiveMenu({ commit }: any, activemenu: any) {
      commit("SET_ACTIVEMENU", activemenu);
    },
    setSideBarActiveMenu({ commit }: any, activemenu: any) {
      commit("SET_SIDEBARACTIVEMENU", activemenu);
    },
    setGameTree({ commit }: any, gamestree: any) {
      let goldData: any = {
        0: "体验场",
        1: "初级场",
        2: "中级场",
        3: "高级场",
        4: "至尊场",
        5: "王者场"
      };
      let gameData: any = [
        { tomatoGamePlatformId: 1, gameId: "TM_DZPK", gameName: "德州扑克" },
        { tomatoGamePlatformId: 2, gameId: "TM_LHD", gameName: "龙虎斗" },
        { tomatoGamePlatformId: 3, gameId: "TM_HJK", gameName: "黑杰克" },
        { tomatoGamePlatformId: 4, gameId: "TM_QZNN", gameName: "抢庄牛牛" },
        { tomatoGamePlatformId: 6, gameId: "TM_HHDZ", gameName: "红黑大战" }
      ];

      let gamesSelectMap: any = [];
      let gamesMap: any = {};
      let allGameIds: any = [];
      gamesSelectMap = gameData;
      for (let item of gameData) {
        gamesMap[item.gameId] = item.gameName;
        allGameIds.push(item.gameId);
      }

      let goldSelectLists = [];
      let goldMap = [];
      for (let item in goldData) {
        let params = Object.assign(
          {},
          {
            value: parseInt(item),
            label: goldData[item]
          }
        );
        goldSelectLists.push(params);
      }
      goldMap = goldData;

      commit("SET_GOLDMAP", goldMap);
      commit("SET_GOLDSELECTLISTS", goldSelectLists);
      commit("SET_GAMESMAP", gamesMap);
      commit("SET_GAMESSELECTAP", gamesSelectMap);
      commit("SET_GAMEIDS", allGameIds);
    }
  }
};

export default app;
