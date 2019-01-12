<template>
  <div class="ttt">
    <el-tabs v-model="currentTab" type="border-card" tab-position="right" style="height:500px" class="tab" >
      <el-tab-pane v-model="Dorm[0]" label="碩齋" class="tab-pane">
        <span slot="label">碩齋</span>
      </el-tab-pane>
      <el-tab-pane v-model="Dorm[1]" label="文齋" class="tab-pane">文齋
        <span slot="label">文齋</span>
      </el-tab-pane>
      <el-tab-pane v-model="Dorm[2]" label="靜齋" class="tab-pane">
        <span slot="label">靜齋</span>
      </el-tab-pane>
      <el-tab-pane v-model="Dorm[3]" label="雅齋" class="tab-pane">
        <span slot="label">雅齋</span>
      </el-tab-pane>
      <el-tab-pane v-model="Dorm[4]" label="慧齋" class="tab-pane">
        <span slot="label">慧齋</span>
      </el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
export default {
  data() {
    return{
      currentTab: 0,
      Dorm:['','','','','']
    }
  },
  methods: {
    callApiOnce() {
      /** 
       * 注意
       * 1. 資料型態，只有 let 或是 const
       * 2. string 可以用單引號、雙引號、冒號鍵旁邊的引號
       * 3. this.$axios.get(url)
       * 4. 善用開發者工具
      */
      const startTime = this.$moment(this.Dorm[this.currentTab]).format('YYYY-MM-DD HH:mm:ss');
      const endTime = this.$moment(startTime).add(1,'days').format('YYYY-MM-DD HH:mm:ss');
      const compareTime = this.$moment(startTime).format('YYYY-MM-DD');
      
      this.$axios.get(encodeURI(`https://iot.martinintw.com/api/v1/data/${this.macAddress[this.currentTab]}?date_filter=${startTime}+-+${endTime}`)).then(response =>{
        console.log(response);
      });
      const data = response.data;
  }
  },
  mounted() {

  }
}
</script>

<style scoped>
.tab{
  font-size: 20px!important;
}
</style>

<style>
.el-tabs__item{
  height: 60px!important;
  line-height: 66px!important;
  font-size: 20px!important;
}
</style>
