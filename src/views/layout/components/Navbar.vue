<template>

  <el-menu
    :default-active="activemenu"
    class="navbar"
    mode="horizontal"
    background-color="#373d41"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect">
    <hamburger v-if="activemenu!='/home'" class="hamburger-container" :toggleClick="toggleSideBar"
     :isActive="sidebar.opened"></hamburger>
    <h1 class="web-title">HTMLTITLE</h1>
    <template v-if="!mobile" v-for="(item,index) in permission_routers">
      <router-link v-if="item.children&&item.children.length!=0" style="float: left"
         :to="item|redirect('to')" :key="item|redirect('key')">
        <el-menu-item :index="item.children[0]?item.children[0].meta.activeindex:''">
          <svg-icon v-if="item.children[0]&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span class="nameSpan" v-if="item.children[0]&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>
    </template>
    <template v-if="mobile">
      <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        分类<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in permission_routers">
            <router-link v-if="item.children&&item.children.length!=0" style="float: left"
                         :to="item.children[0]?item.children[0].path:'/'"
                         :key="item.children[0]?item.children[0].name:index">
              <svg-icon v-if="item.children[0]&&item.children[0].meta.icon"
                        :icon-class="item.children[0].meta.icon"></svg-icon>
                <span v-if="item.children[0]&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item >
            <div @click="logout">
              <i class="el-icon-caret-right"></i>
              <span >退出</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <div v-if="!mobile" class="right-menu">
      <div class="right-menu-item">
        <span style="color: white"> 欢迎您！ name</span>
      </div>
      <div class="right-menu-item">
        <span class="logout" @click="logout">退出</span>
      </div>
    </div>
  </el-menu>

</template>

<script lang='ts'>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import { mapGetters } from 'vuex';

@Component({
  components:{
    Breadcrumb,
    Hamburger,
  },
  filters: {
    redirect: function(value:any,type:any) {
      let path = null,key=null
      for(var i = 0; i < value.children.length; i++) {
        if(value.children[i].children&&value.children[i].children.length>0){
          path=value.children[i].children[0].path
          key = value.children[i].children[0].name
          break;
        }
        if(value.children[i].children==undefined){
          path=value.children[i].path
          key = value.children[i].name
          break;
        }
      }
      if(type=='to'){
        return path
      }else{
        return key
      }
    }
  },
})
export default class Navbar extends Vue {
  isNest: boolean = false
  
  @Getter permission_routers:any;
  @Getter sidebar:any;
  @Getter activemenu:any;

  get mobile(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  private handleSelect() {
    sessionStorage.setItem('top', 'true');
  }
  private toggleSideBar() {
    this.$store.dispatch('toggleSideBar')
  }
  private logout() {
    this.$store.dispatch('LogOut').then(() => {
      sessionStorage.clear();
      location.reload()// In order to re-instantiate the vue-router object to avoid bugs
    })
  }
 
}

  // export default {

  //   components: {
  //     Breadcrumb,
  //     Hamburger
  //   },
  //   data() {
  //     return {
  //       isNest: false
  //     }
  //   },
  //   computed: {
  //     ...mapGetters([
  //       'permission_routers',
  //       'sidebar',
  //       'activemenu'
  //     ]),
  //     mobile() {
  //       return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  //     },

  //   },
  //   filters: {
  //     redirect: function(value,type) {
  //       let path = null,key=null
  //       for(var i = 0; i < value.children.length; i++) {
  //         if(value.children[i].children&&value.children[i].children.length>0){
  //           path=value.children[i].children[0].path
  //           key = value.children[i].children[0].name
  //           break;
  //         }
  //         if(value.children[i].children==undefined){
  //           path=value.children[i].path
  //           key = value.children[i].name
  //           break;
  //         }
  //       }
  //       if(type=='to'){
  //         return path
  //       }else{
  //         return key
  //       }
  //     }
  //   },
  //   methods: {
  //     handleSelect(key, keyPath) {
        
  //       sessionStorage.setItem('top', true);
  //     },
  //     toggleSideBar() {
  //       this.$store.dispatch('toggleSideBar')
  //     },
  //     logout() {
  //       this.$store.dispatch('LogOut').then(() => {
  //         sessionStorage.clear();
  //         location.reload()// In order to re-instantiate the vue-router object to avoid bugs
  //       })
  //     }
  //   },
  //   created(){
  //     // console.log('permission_routers',this.permission_routers)
  //   }
  // }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .web-title {
    // display: inline-block;
    color: white;
    font-size: 20px;
    line-height: 60px;
    margin: 0 32px;
    float: left;
  }
  @media screen and (max-width: 478px){
    .web-title {
      font-size: 12px;
      margin: 0 12px;
    }
    .el-dropdown{
      color: white;

    }
  }

  .navbar {
    height: 61px;
    line-height: 60px;
    border-radius: 0px !important;
    position: fixed;
    width: 100%;
    top: 0;
    .hamburger-container {
      line-height: 68px;
      height: 60px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container {
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .nameSpan{
      margin-left: 5px
    }
    .right-menu {
      float: right;
      height: 100%;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
        font-size: 12px;
        .logout {
          cursor: pointer;
          color: #fff;
          &:hover{
            color: #1c8de0;
          }
        }
      }
      .screenfull {
        height: 20px;
      }
      .international {
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 60px;
        margin-right: 30px;
        .avatar-wrapper {
          cursor: pointer;
          margin-top: 5px;
          position: relative;
          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
