<template>
  <view class="weekend-row date-row">
	<!-- #ifdef H5 || APP-PLUS -->
    <view class="date-col"
         :class="getActivedClass(item, index)"
         @tap="activedCurrentDay"
		 :data-row="item"
         v-for="(item, index) in dateData"
         :key="`date-${index}`">
	<!-- #endif -->
	
	<!-- #ifndef H5 || APP-PLUS -->
	<view class="date-col"
	     :class="[getActivedClass(item, index)]"
	     @tap="activedCurrentDay"
		 :data-row="item"
	     v-for="(item, index) in dateData"
	     :key="[`date-${index}`]">
	<!-- #endif -->
		 
	<!-- #ifndef  APP-PLUS -->
      <view class='circle-svg'>
        <svg xmlns="http://www.w3.org/200/svg"
             height="100%"
             width="100%">
          <circle class="circle-detail"
                  cx="25"
                  cy="25"
                  :r="circlePai"
                  fill="none"
                  :stroke-width="item.percent === 0?0:2"
                  stroke-linecap="round"
                  :stroke="item.percent !== 113 && item.dateStr !== activeDay?'#DB3030': '#2D8DFF'"
                  :stroke-dasharray="`${item.percent},10000`"></circle>
        </svg>
      </view>
	  <!-- #endif -->
	  
<!-- 	  <div class="circle-canvas">
		  <canvas style="width: 50px; height: 50px;" :canvas-id="'circleCanvas' + item.dateStr" :id="'circleCanvas' + index"></canvas>
	  </div> -->
      <text :class="item.month !== activeMonth?'not-current-month': ''">
        {{today === item.dateStr?'今': item.day}}
      </text>
    </view>
  </view>
</template>

<script>
export default {
  name: "expandCalendar",
  data() {
    return {
      currentDate: "",
      activeDay: "",
      circlePai: 18,
	  today: ''
    };
  },
  props: {
    clickDay: {
      type: String,
      default: ''
    },
    activeMonth: {
      type: Number,
      default: 1
    },
    dateData: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    clickDay: {
      handler(val) {
        if(val && val !== '') {
          this.activeDay = val
        }
      },
      immediate: true
    }
  },
	onReady: function (e) {
		// for(let i = 0;i < dateData.length;i++) {
		// 		console.log(`circleCanvas${i}`)
		// 		var context = uni.createCanvasContext("`circleCanvas${i}`")
		// 		console.log(context)  
		// 		context.setStrokeStyle("#00ff00")
		// 		context.setLineWidth(5)
		// 		context.arc(120, 80, 5, 0, 2 * Math.PI, true)
		// 		context.stroke()
		// 		context.draw()
		// }
	},
  mounted() {
	 this.today = `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`
  },
  methods: {
	  getDate() {
	    return new Date().getDate()
	  },
	  //周几
	  getDay() {
	    return new Date().getDay()
	  },
	  getFullYear() {
	    return new Date().getFullYear()
	  },
	  getMonth() {
	    return new Date().getMonth()
	  },
    getActivedClass(row, index) {
      return row.dateStr === this.activeDay ? "date-col-active" : "";
    },
    activedCurrentDay(ev) {
		const row = ev.currentTarget.dataset.row	
      this.$emit("changeDate", { data: row });
    },
  }
};
</script>

<style scoped lang="scss">
	@import './calendar.scss'
</style>
