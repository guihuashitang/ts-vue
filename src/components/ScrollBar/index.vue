<template>
  <!-- <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll" >
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}"> -->
  <div class="scroll-container" ref="scrollContainer" >
    <div class="scroll-wrapper" ref="scrollWrapper" >
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
const delta: number = 15
@Component({
  name: 'scrollBar',
})
export default class ScrollBar extends Vue {
  top:number = 0

  handleScroll(e:any) {
    const eventDelta = e.wheelDelta || -e.deltaY * 3
    const $container: any = this.$refs.scrollContainer
    const $containerHeight = $container.offsetHeight
    const $wrapper: any = this.$refs.scrollWrapper
    const $wrapperHeight = $wrapper.offsetHeight
    if (eventDelta > 0) {
      this.top = Math.min(0, this.top + eventDelta)
    } else {
      if ($containerHeight - delta < $wrapperHeight) {
        if (this.top < -($wrapperHeight - $containerHeight + delta)) {
          this.top = this.top
        } else {
          this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
        }
      } else {
        this.top = 0
      }
    }
  }
}


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $menuBg;
  .scroll-wrapper {
    position: absolute;
    width: 100%!important;
    height: 100%;
    overflow-y: scroll
  }
  .scroll-wrapper::-webkit-scrollbar {
    display: none;
  }
}
</style>
