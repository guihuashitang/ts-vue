<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <navbar ></navbar>
    <sidebar v-if="activemenu!='/home'" class="sidebar-container"></sidebar>
    <tags-view class="tagsview" :style="{ left: marginLeft+ 'px' }"></tags-view>
    <div class="main-container" :style="{ left: marginLeft+ 'px' }">
			<app-main></app-main>
		</div>
	</div>
</template>

<script lang='ts'>
import { Navbar, Sidebar, AppMain, TagsView } from './components/index'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import { mapGetters } from 'vuex';

@Component({
  name: 'layout',
  components:{
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
  },

})

export default class Login extends Vue {
  mobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  isTop: boolean =  false;

  //Getter
  @Getter activemenu: any;
  @Getter sidebar: any;

  get marginLeft(){
    return (this.sidebar.opened&&this.activemenu!='/home'&&!this.mobile)?180:0
  };

}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
	  @include clearfix;
	  position: relative;
	  height: 100%;
	  width: 100%;
	}
  .tagsview{
    transition: left 0.28s;
    left: 180px;
    position: absolute;
    top: 61px;
    right: 0;
  }
</style>
