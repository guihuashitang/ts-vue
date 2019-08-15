<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon style="color:#fff;font-size: 22px" class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh-CN">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en-US">
        English
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='th'" command="th-TH">
        ภาษาไทย
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class LangSelect extends Vue {
  get language() {
    return this.$store.getters.language
  }

  // handleSetLanguage(lang:any) {
  //   this.$i18n.locale = lang.split('-')[0]
  //   this.$store.dispatch('setLanguage', lang)
  //   if(this.language==='en'){
  //     this.$message({
  //       message: this.$t('switchLanguage.language'),
  //       type: 'success'
  //     })
  //   }else if(this.language==='th'){
  //     this.$message({
  //       message: this.$t('switchLanguage.language'),
  //       type: 'success'
  //     })
  //   }else{
  //     this.$message({
  //       message: this.$t('switchLanguage.language'),
  //       type: 'success'
  //     })
  //   }
  //   location.reload()
  // }

}

</script>
