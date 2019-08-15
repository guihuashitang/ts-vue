<template>
  <scroll-bar>
    <!--:collapse="isCollapse"-->
    <el-menu mode="vertical" :default-active="sidebaractivemenu"
              background-color="#42485b"
             text-color="#bfcbd9" active-text-color="#ffd04b">
      <sidebar-item :routes="permission_routers" :active="activemenu"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script lang='ts'>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem.vue'
import ScrollBar from '@/components/ScrollBar/index.vue'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';


@Component({
  components:{
    SidebarItem,
    ScrollBar,
  },
})
export default class Vertical extends Vue {

  @Getter permission_routers:any;
  @Getter sidebar:any;
  @Getter activemenu:any;
  @Getter sidebaractivemenu:any;

  get mobile(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  get isCollapse() {
    return !this.sidebar.opened
  }

  mounted(){

  }

}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
