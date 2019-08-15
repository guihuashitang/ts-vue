
<template>
  <div class="content" @click.stop="close">
    <transition name="fade">
      <div :class="!mobile?'main-edit':'main-edit-mobile'" v-if="show3" @click.stop="stop">
        <i v-if="mobile" class="el-icon-close closeIcon" @click.stop="close"></i>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'DetailDialog',
})
export default class DetailDialog extends Vue {
  @Prop() DialogVisible!:Boolean
  @Prop() id!:[String, Number]

  show3: Boolean = false

  get mobile(){
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }

  private stop(){}
  private close(){
    this.show3=!this.show3;
    setTimeout(() => {
      this.$emit('close')
    }, 100);
  }

  mounted() {
    setTimeout(() => {
    this.show3 = this.DialogVisible
    }, 100);
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .4);
  z-index: 6666
}
.content{
  .main-edit{
    width: 700px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background: #ffffff;
    padding: 20px;
    overflow-y: scroll;
  }
  .main-edit-mobile{
    width: 100%;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background: #ffffff;
    padding: 20px;
    overflow-y: scroll;
  }
  .closeIcon{
    position: absolute;
    font-size: 18px;
    right: 20px;
    top: 30px;
    padding: 10px;
  }
}

.fade-enter-active{
  animation: fade-in .3s;
}
@keyframes fade-in {
  0% {
    transform: translateX(600px);
  }
  50% {
    transform: translateX(0) scaleX(1.1);
  }
  100% {
    transform: translateX(0) scaleX(1);
  }
}
.fade-leave-active {
  transition: all .8s 
}
</style>