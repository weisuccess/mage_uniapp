##下载解压导入Hbuilderx##

##平台兼容性##
|Android APP|IOS APP|H5|小程序|
|:-|:-:|-:|-:|
|√|√|√|√|

其他没测试过，理论上应该是一样的

##Props##
|isExpand|format|yearsList|
|:-|:-:|-:|
|展开/收缩状态 默认: false|返回的时间字符串格式 默认: YYYY-MM-DD|['2020', '2021']设置年份数组 默认当前年份 2021|

##event##
|changeDate|
|:-|
|切换日期的回调，返回当前时间对象|

##代码示例##
  ```html
        <Calendar
        	@changeDate="changeDateMethods"
        	:isExpand="isExpand"
        >
        
        </Calendar>
		
    ```
