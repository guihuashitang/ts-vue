<template>
  <div class="menu-wrapper">
    <template v-for="(item,num) in routerList" v-if="!item.meta.hidden">
      <router-link v-if="!item.children" :to="item.path" :key="item.name">
        <el-menu-item :index="item.meta.sidebaractive" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span>{{item.meta.sidetitle?item.meta.sidetitle:item.meta.title}}</span>
        </el-menu-item>
      </router-link>
      <!--三级菜单 先注释 后面再加-->
      <el-submenu v-else :index="item.meta.sidebaractive" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span>{{item.meta.sidetitle?item.meta.sidetitle:item.meta.title}}</span>
        </template>

        <template v-for="(child,index) in item.children" v-if="!child.meta.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0"
                        :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="child.path" :key="child.name">
            <el-menu-item :index="child.meta.sidebaractive">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span>{{child.meta.sidetitle?child.meta.sidetitle:child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
@Component({
  name: 'SidebarItem',
})

export default class SidebarItem extends Vue {
  @Prop() private routes!: Array<any>;
  @Prop({default: false}) private isNest!: Boolean;
  @Prop() private active!: String;

  get routerList() {
    let array: Array<any> = []

    this.routes.forEach((route: any)=>{
      if(route.path!=''&&route.path==this.active){
        array.push(route)
      }
    })
    if(array[0].meta.title){}else{
      array =  array[0].children
    }
    array.map((item: any,num: any)=>{
      if(item.meta.index==2&&!item['remove']){
        let father = array.find((value: any, index: any, arr: any) => {
          return value.name==item.meta.pname
        })
        if(father!=undefined){
          father['children'].push(item)
          item['remove']=true
        }
      }
    })
    array = array.filter(function(v: any, i: any){
      return !v['remove'];
    });
    return array
  }

}

</script>

