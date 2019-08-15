<template>
  <div class="container">
    <el-card style="margin-top: 32px;">
      <div slot="header">
        <span>货币收支表</span>
      </div>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="8" :md="8" :lg="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="card-title">金币净支出</span>
            </div>
            <div class="text item">
              <el-table :data="datas.tableData1" :border="true" width="100%">
                <el-table-column align="center" prop="title" label="类型"></el-table-column>
                <el-table-column align="center" prop="out" label="支付"></el-table-column>
                <el-table-column align="center" prop="in" label="回收"></el-table-column>
                <el-table-column align="center" prop="loss" label="净支出"></el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="card-title">红包劵净支出</span>
            </div>
            <div class="text item">
              <el-table :data="datas.tableData2" :border="true" width="100%">
                <el-table-column align="center" prop="title" label="类型"></el-table-column>
                <el-table-column align="center" prop="out" label="支付"></el-table-column>
                <el-table-column align="center" prop="in" label="回收"></el-table-column>
                <el-table-column align="center" prop="loss" label="净支出"></el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="8" :md="8" :lg="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="card-title">钻石净支出</span>
            </div>
            <div class="text item">
              <el-table :data="datas.tableData3" :border="true" width="100%">
                <el-table-column align="center" prop="title" label="类型"></el-table-column>
                <el-table-column align="center" prop="out" label="支付"></el-table-column>
                <el-table-column align="center" prop="in" label="回收"></el-table-column>
                <el-table-column align="center" prop="loss" label="净支出"></el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import request from '@/utils/request'
export default {
  name: "home",
  components: {
  },
  data() {
    return {
      value1: [],
      value2: [],
      activeName: "first",
      lineChartData: [0, 0, 0, 0, 0, 0],
      selectGame: "",
      tableData: [],
      panelLoading: false,
      loading: false,
      loadingOther:false,
      tableData1:[],
      datas: {
        tableData1: [],
        tableData2: [],
        tableData3: []
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              var starttime = getDay(0) + ' 00:00:00'
              var endtime = getDay(0) + ' 23:59:59'
              picker.$emit("pick", [starttime, endtime]);
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              var starttime = getDay(1) + ' 00:00:00'
              var endtime = getDay(1) + ' 23:59:59'
              picker.$emit("pick", [starttime, endtime]);
            }
          },
          {
            text: "最近7天",
            onClick(picker) {
              var starttime = getDay(6) + ' 00:00:00'
              var endtime = getDay(0) + ' 23:59:59'
              picker.$emit("pick", [starttime, endtime]);
            }
          },
        ]
      },
      ostypeMap:{},
      osType:''
    };
  },
  computed: {
    ...mapGetters(["gamestree", "gamesMap","userType","logos"]),
    mobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    }
  },
  watch: {

  },
  methods: {
  },
  mounted() {
      this.$store.dispatch("setActiveMenu", "/home");
      this.$store.dispatch("setSideBarActiveMenu", "agentChannel");


  }
};
</script>

<style >
.container{
  height: calc(100% - 61px)
}
.contai{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: calc(100% - 61px)
}
.contai img{
  width: 400px
}
</style>
