//数据获取
(function(){
	var _datepicker={};
	
	_datepicker.getMonthData=function(year,month){
		
		var ret=[];
		
		if(!year||!month){
			//当前的日期
			var today=new Date();
			//获得当前年份
			year=today.getFullYear();
			//获得当前月份	getMonth返回当前月的前一个月份
			month=today.getMonth()+1;
		}
		
		//获取第一天
		var firstDay=new Date(year,month-1,1);
		//获取第一天在周几
		var firstDayWeekDay=firstDay.getDay();
		//判断周日
		if(firstDayWeekDay==0){
			firstDayWeekDay=7;
		}
		//获取上月的最后一天
		var lastDayofLastMonth=new Date(year,month-1,0);
		//获取上月的最后一天的日期
		var lastDateofLastMonth=lastDayofLastMonth.getDate();
		//获取第一行需要显示多少个上个月的日期
		var perMonthDayCount=firstDayWeekDay-1;
		//获取当月的最后一天
		var lastDay=new Date(year,month,0);
		//获取当月最后一天的日期
		var lastDate=lastDay.getDate();
		
		
		//获取一个月的日期
		for(var i=0;i<7*6;i++){
			var date=i+1-perMonthDayCount;
			var showDate=date;
			var thisMonth=month;
			
			//上一个月
			if(date<=0){
				thisMonth=month-1;
				showDate=lastDateofLastMonth+date;
			}else if(date>lastDate){
				thisMonth=month+1;
				showDate=showDate-lastDate;
			}
			if(thisMonth===0)
			thisMonth=12;
			if(thisMonth===13)
			thisMonth=1;
			
			ret.push({
				month:thisMonth,
				date:date,
				showDate:showDate
			});
			
		}
		
		return{
            year:year,
            month:month,
            days:ret
        }
		
	}
	
	
	window.datepicker=_datepicker;
})();
