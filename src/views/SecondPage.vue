<template>
  <div>
    <el-tabs v-model="currentTab" type="border-card" tab-position="right" style="height:500px" class="tab" >
      <el-tab-pane label="碩齋" class="tab-pane">
        <span slot="label">碩齋</span>
        <!-- to show -->
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="Dorm[0]"
            type="date"
            placeholder="選擇日期">
          </el-date-picker>
        </div>
        <canvas id="chartShou" class="chart"></canvas>
      </el-tab-pane>
      <el-tab-pane label="文齋" class="tab-pane">
        <span slot="label">文齋</span>
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="Dorm[1]"
            type="date"
            placeholder="選擇日期">
          </el-date-picker>
        </div>
        <canvas id="chartWen" class="chart"></canvas>
        </el-tab-pane>
      <el-tab-pane label="靜齋" class="tab-pane">
        <span slot="label">靜齋</span>
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="Dorm[2]"
            type="date"
            placeholder="選擇日期">
          </el-date-picker>
        </div>
        <canvas id="chartChing" class="chart"></canvas>
      </el-tab-pane>
      <el-tab-pane label="雅齋" class="tab-pane">
        <span slot="label">雅齋</span>
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="Dorm[3]"
            type="date"
            placeholder="選擇日期">
          </el-date-picker>
          <canvas id="chartYa" class="chart"></canvas>
        </div>
      </el-tab-pane>
      <el-tab-pane label="慧齋" class="tab-pane">
        <span slot="label">慧齋</span>
        <div class="block">
          <span class="demonstration"></span>
          <el-date-picker
            v-model="Dorm[4]"
            type="date"
            placeholder="選擇日期">
          </el-date-picker>
          <canvas id="chartHui" class="chart"></canvas>
        </div>
      </el-tab-pane>
    </el-tabs>
    
    
    
  </div>    
  
</template>

<script>

export default {
  data() {
    return {
      Dorm:['','','','',''],
      count:[
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ],
      currentTab: 0,
      macAddress:[
        '12345612',
        '12345613',
        '12345614',
        '12345615',
        '12345616'
      ],
    }
  },
  methods: {
    drawChart(){
      var canvas = document.getElementsByClassName('chart');
      var ctx = canvas[Number(this.currentTab)].getContext("2d");
      
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["0~3", "3~6", "6~9", "9~12", "12~15", "15~18", "18~21", "21~24"],
          datasets: [{
            label:'times/3hours',
            data: this.count[this.currentTab],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(95, 24, 84, 0.2)',
              'rgba(214, 248, 184, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(95, 24, 84, 1)',
              'rgba(214, 248, 184, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                  beginAtZero:true
              }
            }]
          }
        },
        
      });
      
    },
    async updatedDraw() {
      await this.callApiOnce();
      
      this.drawChart();
      
    },
    async callApiOnce() {
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
      const response = await this.$axios.get(encodeURI(`https://iot.martinintw.com/api/v1/data/${this.macAddress[this.currentTab]}?date_filter=${startTime}+-+${endTime}`));
      console.log(response); 
      const data = response.data;
      this.count[this.currentTab] = [0,0,0,0,0,0,0,0];
      data.forEach(d => {
        let time = this.$moment(d.created_at).format('YYYY-MM-DD HH:mm:ss');
        if (this.$moment(time).isBefore(compareTime + ' 03:00:00','minute')) {
          this.count[this.currentTab][0]++;
        } else if(this.$moment(time).isBefore(compareTime + ' 06:00:00','minute')){
          this.count[this.currentTab][1]++;
        } else if(this.$moment(time).isBefore(compareTime + ' 09:00:00','minute')){
          this.count[this.currentTab][2]++;
        } else if(this.$moment(time).isBefore(compareTime + ' 12:00:00','minute')){
          this.count[this.currentTab][3]++;
        } else if(this.$moment(time).isBefore(compareTime + ' 15:00:00','minute')){
          this.count[this.currentTab][4]++;
        } else if(this.$moment(time).isBefore(compareTime + ' 18:00:00','minute')){
          this.count[this.currentTab][5]++;
        } else if(this.$moment(time).isBefore(compareTime + ' 21:00:00','minute')){
          this.count[this.currentTab][6]++;
        } else {
          this.count[this.currentTab][7]++;
        }
      })
      
    },
  },
  mounted() {
    this.updatedDraw();
    window['vm'] = this;
  },
  watch: {
    Dorm() {
      this.updatedDraw();
    },
    currentTab() {
      this.updatedDraw();
    }
  }
}
</script>

<style scoped>

.chart{
  width: 100%;
  height: 300px;
}
</style>
