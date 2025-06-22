<template>
  <view class="calendar-container">
	<view class="calendar-bg-month" v-show="isExpand">
		{{currentDate.month < 10?`0${currentDate.month}`: currentDate.month}}
	</view>  
    <view class="calendar-date">
      {{currentDate.year}}年{{currentDate.month}}月
    </view>
    <view class="weekend-row">
      <view class="weekend-col"
           v-for="(item, index) in weekendList"
           :key="index">
        {{item}}
      </view>
    </view>

	<template v-if="!isExpand">
		<!--未展开 :current="currentWeekIndex"  v-if="!isExpand" -->
		<swiper class="my-swipe my-not-expand-swipe"
		       ref="notExpandRef"
			    v-if="isShowExpandCalendar"
			   :duration="100"
			   :current-item-id="currentWeekIndex.toString()"
		       :loop="false"
		       :show-indicators="false"
		       @change="changeWeek"
		>
		  <template v-for="(parent, index) in lineWeekDataListObj">
			<!-- #ifdef H5 || APP-PLUS -->
		    <swiper-item
				:item-id="index"
				:key="`not-expand-${index}`"
			>
		      <ExpandCalendar :dateData="parent"
		                      :click-day="activeDay"
		                      :activeMonth="calMonthColor+1"
		                      ref="notExpandCalendarRef"
		                      @changeDate="changeDateMethods"></ExpandCalendar>
		
		    </swiper-item>
			<!-- #endif -->
			
			<!-- #ifndef H5 || APP-PLUS -->
			<swiper-item
				:item-id="index"
				:key="[`not-expand-${index}`]"
			>
			  <ExpandCalendar :dateData="parent"
			                  :click-day="activeDay"
			                  :activeMonth="calMonthColor+1"
			                  ref="notExpandCalendarRef"
			                  @changeDate="changeDateMethods"></ExpandCalendar>
			
			</swiper-item>
			<!-- #endif -->
		  </template>
		</swiper>
	</template>

    <!--展开  :current="currentMonth"-->
    <swiper class="my-swipe my-expand-swipe"
           ref="expandRef"
           :loop="false"
		   :duration="30"
		   v-if="isShowExpandCalendar"
		   :current-item-id="currentMonth.toString()"
           :show-indicators="false"
           @change="changeMonth"
    >
	<template v-if="isExpand">
		<template v-for="(parent, index) in Object.keys(monthDataListObj)">
				<!-- #ifdef H5 || APP-PLUS -->
		  <swiper-item
					:item-id="parent"
					:key="`expand-${index}`"
				>
		    <ExpandCalendar :dateData="monthDataListObj[parent].data"
		                    :click-day="activeDay"
		                    :activeMonth="calMonthColor+1"
		                    ref="expandCalendarRef"
		                    @changeDate="changeDateMethods"></ExpandCalendar>
		
		  </swiper-item>
				<!-- #endif -->
				
				<!-- #ifndef H5 || APP-PLUS -->
				<swiper-item
					:item-id="parent"
					:key="[`expand-${index}`]"
				>
				  <ExpandCalendar :dateData="monthDataListObj[parent].data"
				                  :click-day="activeDay"
				                  :activeMonth="calMonthColor+1"
				                  ref="expandCalendarRef"
				                  @changeDate="changeDateMethods"></ExpandCalendar>
				
				</swiper-item>
				<!-- #endif -->
		</template>
	</template>

    </swiper>
	
	<template v-show="isExpand">
		<template v-if="!isShowExpandCalendar">
			<template v-for="(parent, index) in Object.keys(monthDataListObj)">
				<!-- <ExpandCalendar :dateData="monthDataListObj[parent].data"
				                :click-day="activeDay"
								:key="parent"
				                :activeMonth="calMonthColor+1"
				                ref="expandCalendarRef"
				                @changeDate="changeDateMethods"></ExpandCalendar> -->
			</template>
		</template>
	</template>
	</view>
</template>


<script>
	import CalendarObj from './date.js'
	import ExpandCalendar from './calendar.vue'
	export default {
		components:{
			ExpandCalendar
		},
		data() {
			return {
				isInit: false,
				isShowExpandCalendar: true,
				activeObj: {},
				calMonthColor: 0,  // 用于计算月份 显示颜色
				cacheWeekIndex: 0,
				cacheMonthIndex: 0,
				currentWeekIndex: 0,
				lineWeekDataList: [],
				currentMonth: 0,
				currentDate: "",
				activeDay: "",
				isFinish: false,
				currentDateList: [],
				allDateList: [],
				lineCurrentDateList: [],
				weekendList: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
				circlePai: 18,
				currentMonthIndex: 0
			}
		},
		props: {
			isExpand: {
				type: Boolean,
				default: false
			},
			format: {
				type: String,
				default: 'YYYY-MM-DD'
			},
			yearsList: {
				type: Array,
				default:() => [2021]
			}
		},
		computed: {
			lineWeekDataListObj() {
				let obj = {}
				obj[this.currentWeekIndex - 1] = this.lineWeekDataList[this.currentWeekIndex-1]
				obj[this.currentWeekIndex] = this.lineWeekDataList[this.currentWeekIndex]
				obj[this.currentWeekIndex + 1] = this.lineWeekDataList[this.currentWeekIndex+1]
				
				console.log('currentWeekIndex ---', this.currentWeekIndex)
				this.refreshCalendar()
				return obj
			},
			monthDataListObj() {
				let obj = {}
				obj[this.currentMonth - 1] = this.allDateList[this.currentMonth - 1]
				obj[this.currentMonth] = this.allDateList[this.currentMonth]
				obj[this.currentMonth + 1] = this.allDateList[this.currentMonth+1]
		
				this.refreshCalendar()
			
				return obj
			}
		},
		watch: {
			isExpand() {
				this.updateExpandStatus()
			}
		},
		created() {
			const opt = {
			prev: "上个月",
			  current: "当前",
			  next: "下个月"
			};
			const yearsList = this.$props.yearsList
			let count = 0;
			const cacheDateLen = 12; // 前后缓存十个
			let weekIndex = 0;
			let monthIndex = 0;
			const calendar = CalendarObj({
			  // 获取的每个日历数据的最小单元
			  // 这里可以自定义想要的数据

			  // callback 参数为最终的日历josn 数据
			  callback: calendarJson => {
				// console.log("json", calendarJson);
				this.currentDateList = calendarJson;
				const circleLength = Math.floor(2 * Math.PI * this.circlePai);
				this.currentDateList.forEach((item, key) => {
				  count++;
				  // 初始化percent
				  item.weekIndex = weekIndex;
				  if(this.currentDateList[key+1] && this.currentDateList[key].dateStr !== this.currentDateList[key+1].dateStr) {
				  	if(item.week === 6) {
						weekIndex++;
				  	}
				  }
				  item.percent = 0;

				  if (item.isToday) {
					const calYearIndex = item.year - yearsList[0]
					this.currentWeekIndex = parseInt(item.weekIndex, 10)
					this.cacheWeekIndex = item.weekIndex
					this.activeDay = item.dateStr
					console.log('初始化 ---', this.activeDay)
					
					this.currentMonth = (parseInt(item.month, 10) - 1) + 12 * calYearIndex;
					this.calMonthColor = parseInt(item.month, 10) - 1;
					this.cacheMonthIndex = parseInt(item.month, 10) - 1;
					this.currentDate = JSON.parse(JSON.stringify(item));
					this.activeObj = Object.assign({}, item)
					item.percent = (circleLength * 100) / 100;
					// this.calculateLineDate(calendarJson);
				  }
				});

				this.allDateList.push({
				  data: calendarJson
				});
			  }
			  // 设置 dateStr 输出格式
			}).format(this.format);
			
			for(let j = 0;j < yearsList.length;j++) {
				for (let i = 0; i < cacheDateLen; i++) {
				      let month = i;
				      let year = yearsList[j];
				      calendar.toDate({ year, month }).paint();
				}
			}
			
			
			// 计算周 先聚合，在计算
			const weekObj = {}
			const weekPlatList = []
			// console.log(this.allDateList)
			this.allDateList.forEach((parent, parentIndex) => {
			  parent.data.forEach((item, key) => {
				weekObj[`week-${item.weekIndex}`] = []
			  })
			  parent.data.forEach((item, key) => {
				weekObj[`week-${item.weekIndex}`].push(item)
			  })
			})
			
			Object.keys(weekObj).forEach((parent) => {
			  // 判断是否有第一个重复
			  weekPlatList.push(weekObj[parent])
			})
			this.lineWeekDataList = weekPlatList
			
		},
		methods: {
			refreshCalendar() {
				uni.showLoading({
					mask: true,
					title: '加载中'
				});
				this.isShowExpandCalendar = false
				setTimeout(() => {
					this.isShowExpandCalendar = true
					uni.hideLoading();
				}, 100)
			},
			changeWeek(ev) {
				let index = ev.detail.currentItemId
				// 找到当前选中的位置
				const selectedWeekIndex = this.activeObj.week
				
				if(this.isInit) {
					this.activeDay = this.lineWeekDataList[index][selectedWeekIndex].dateStr
					this.activeObj = this.lineWeekDataList[index][selectedWeekIndex]
					this.cacheWeekIndex = index
					this.currentWeekIndex = this.activeObj.weekIndex
					console.log('activeObj ---', this.activeObj)
					const {month} = this.activeObj
					
					this.calMonthColor = month - 1
					this.currentDate.month = month
					this.$emit("changeDate", this.activeObj)
				} else {
					this.$emit("changeDate", this.activeObj)
					this.isInit = true
				}
			},
			changeMonth(ev) {
				console.log('ev.detail ---', ev)
				// let index = ev.detail.current
			
				let index = +ev.detail.currentItemId
				// 切换 默认选中第一天
				this.cacheMonthIndex = index;
				this.currentMonth = index;
				
				// 默认选中一号
				const monthTmpList = this.allDateList[index].data
				
				for(let i = 0;i < monthTmpList.length;i++) {
				  if(monthTmpList[i].day === 1) {
					this.calMonthColor = monthTmpList[i].month - 1
					this.currentDate.month = monthTmpList[i].month
					this.currentDate.year = monthTmpList[i].year
				    // 选中的同一月 不默认选中
				    if(this.activeObj.month === monthTmpList[i].month) {
						break
				    } else {
						// 初始化加载当天
						if(this.isInit) {
							this.activeObj = monthTmpList[i]
							this.activeDay = monthTmpList[i].dateStr
							
							console.log('activeDay ---', this.activeDay, monthTmpList)
							this.$emit("changeDate", monthTmpList[i]);
							break
						}
				    }
				  }
				}
				if(!this.isInit) {
					console.log('this.activeDay ---', this.activeDay)
					this.$emit("changeDate", this.activeDay);
					this.isInit = true	
				}
				
			
			},
			updateExpandStatus() {
				setTimeout(() => {
					// tru 展开  false 收缩
					if(this.isExpand) {
						let yearsList = this.$props.yearsList
						const calYearIndex = this.activeObj.year - yearsList[0]
						const monthIndex = (parseInt(this.activeObj.month, 10) - 1) + 12 * calYearIndex
						// 展开月日历
						this.currentMonth = (parseInt(this.activeObj.month, 10) - 1) + 12 * calYearIndex
					} else {
						const weekIndex = this.activeObj.weekIndex
						this.currentWeekIndex = this.activeObj.weekIndex
					}
				})
			},
			
			changeDateMethods(row) {
				console.log('修改日期')
			    this.activeDay = row.data.dateStr;
			    this.activeObj = Object.assign({}, row.data)
			    this.$emit("changeDate", row);
			},
		}
	}
</script>

<style scoped lang="scss">
	@import './calendar.scss'
</style>
