<template>
  <div class="scroll-container" ref="scrollContainer" @touchstart="touchstart" @touchmove="touchScroll" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
const padding = 15 // tag's padding

@Component({
  name: 'scrollPane',
})

export default class ScrollPane extends Vue {
  left: number = 0
  touchstartX:any = ''

  handleScroll(e:any) {
    const eventDelta:any = e.wheelDelta || -e.deltaY * 3
    const $container:any = this.$refs.scrollContainer
    const $containerWidth:any = $container.offsetWidth
    const $wrapper:any = this.$refs.scrollWrapper
    const $wrapperWidth:any = $wrapper.offsetWidth

    if (eventDelta > 0) {
      this.left = Math.min(0, this.left + eventDelta)
    } else {
      if ($containerWidth - padding < $wrapperWidth) {
        if (this.left < -($wrapperWidth - $containerWidth + padding)) {
          this.left = this.left
        } else {
          this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
        }
      } else {
        this.left = 0
      }
    }
  }
  touchScroll(e:any){
    // console.log(`变动坐标${e.touches[0].clientX}`)
    const eventDelta:any = e.touches[0].clientX
    const $container:any = this.$refs.scrollContainer
    const $containerWidth:any = $container.offsetWidth
    const $wrapper:any = this.$refs.scrollWrapper
    const $wrapperWidth:any = $wrapper.offsetWidth
    let cha:any = eventDelta-this.touchstartX
    // console.log(`移动距离:${cha}px`)
    if(eventDelta>this.touchstartX){
        // console.log('向右滑')
        this.left=Math.min(this.left+cha,0)
    }else{
        // console.log('向左滑')
        if ($containerWidth - padding < $wrapperWidth) {//有滚动
          if (this.left < -($wrapperWidth - $containerWidth + padding)) {//超出距离
            this.left = this.left
          } else {
            this.left=Math.min(this.left+cha,0)
          }
        } else {
          this.left = 0
        }
    }
  }
  touchstart(e:any){
    // console.log(`开始坐标${e.touches[0].clientX}`)
    this.touchstartX=e.touches[0].clientX
  }
  moveToTarget($target:any) {
    const $container:any = this.$refs.scrollContainer
    const $containerWidth:any = $container.offsetWidth
    const $targetLeft:any= $target.offsetLeft
    const $targetWidth:any = $target.offsetWidth

    if ($targetLeft < -this.left) {
      // tag in the left
      this.left = -$targetLeft + padding
    } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
      // tag in the current view
      // eslint-disable-line
    } else {
      // tag in the right
      this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  .scroll-wrapper {
    position: absolute;
  }
}
</style>
