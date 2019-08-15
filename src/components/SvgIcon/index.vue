<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
@Component

export default class SvgIcon extends Vue {
  @Prop() private iconClass!: string;
  @Prop() private className!: string;

  get iconName(){
    return `#icon-${this.iconClass}`
  }

  get svgClass(){
    if (this.className) {
      return 'svg-icon ' + this.className
    } else {
      return 'svg-icon'
    }
  }
}
// export default {
//   name: 'svg-icon',
//   props: {
//     iconClass: {
//       type: String,
//       required: true
//     },
//     className: {
//       type: String
//     }
//   },
//   computed: {
//     iconName() {
//       return `#icon-${this.iconClass}`
//     },
//     svgClass() {
//       if (this.className) {
//         return 'svg-icon ' + this.className
//       } else {
//         return 'svg-icon'
//       }
//     }
//   }
// }
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
