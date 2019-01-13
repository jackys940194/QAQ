<template>
  <div>
    <el-tabs v-model="currentTab" type="border-card" tab-position="right" style="height:500px" class="tab" >
      <el-tab-pane label="碩齋" class="tab-pane">
        <span slot="label">碩齋</span>
        {{hasOpen[0]}}
        <img v-if="hasOpen[0]" src="@/assets/opened-double-door.svg" alt="img">
        <img v-else src="@/assets/closed-double-door.svg" alt="img">
      </el-tab-pane>
      <el-tab-pane label="文齋" class="tab-pane">
        <span slot="label">文齋</span>
        {{hasOpen[1]}}
        <img v-if="hasOpen[1]" src="@/assets/opened-double-door.svg" alt="img">
        <img v-else src="@/assets/closed-double-door.svg" alt="img">
      </el-tab-pane>
      <el-tab-pane label="靜齋" class="tab-pane">
        <span slot="label">靜齋</span>
        {{hasOpen[2]}}
        <img v-if="hasOpen[2]" src="@/assets/opened-double-door.svg" alt="img">
        <img v-else src="@/assets/closed-double-door.svg" alt="img">
      </el-tab-pane>
      <el-tab-pane label="雅齋" class="tab-pane">
        <span slot="label">雅齋</span>
        {{hasOpen[3]}}
        <img v-if="hasOpen[3]" src="@/assets/opened-double-door.svg" alt="img">
        <img v-else src="@/assets/closed-double-door.svg" alt="img">
      </el-tab-pane>
      <el-tab-pane label="慧齋" class="tab-pane">
        <span slot="label">慧齋</span>
        {{hasOpen[4]}}
        <img v-if="hasOpen[4]" src="@/assets/opened-double-door.svg" alt="img">
        <img v-else src="@/assets/closed-double-door.svg" alt="img">
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
export default {
  data() {
    return{
      currentTab: 0,
      macAddress:[
        '12345612',
        '12345613',
        '12345614',
        '12345615',
        '12345616'
      ],
      hasOpen:[false, false, false, false, false]
    }
  },
  methods: {
    returnClosed(){
      // this.hasOpen.forEach(i =>{
      //   if (this.hasOpen[i]) setTimeout(() => {
      //     // this.hasOpen[i] = false;
          
      //   }, 1000);
      // });
      // setInterval(() =>{
      //   this.hasOpen.forEach(i =>{

      //   })
      // })
      setTimeout(() =>{
        this.hasOpen.forEach((i,idx) =>{
          if (i) this.$set(this.hasOpen, idx, false);
        })
      }, 15000)
    },
    callApiMulti() {
      /** 
       * 注意
       * 1. 資料型態，只有 let 或是 const
       * 2. string 可以用單引號、雙引號、冒號鍵旁邊的引號
       * 3. this.$axios.get(url)
       * 4. 善用開發者工具
      */
     const process = () => {
        let now = this.$moment();
        now = this.$moment(now).format('YYYY-MM-DD HH:mm:ss');
        let pass = this.$moment(now).subtract(5,'minute');
        pass = this.$moment(pass).format('YYYY-MM-DD HH:mm:ss');
        // console.log(123);
        for (let i = 0; i < 5; i++) {
          this.$axios.get(encodeURI(`https://iot.martinintw.com/api/v1/data/${this.macAddress[i]}?date_filter=${pass}+-+${now}`)).then(response =>{
            console.log(response);
            const data = response.data;
            if(data.length !== 0) this.$set(this.hasOpen, i, true);
          }); 
        }
      }
      process();
      setInterval(process,20000);
    }
  },
  mounted() {
    this.callApiMulti();
    this.returnClosed();
    window['vm'] = this;
  },
  watch: {
    // currentTab(){
    //   this.callApiMulti();
    // }
    hasOpen(){
      this.returnClosed();
    }
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
