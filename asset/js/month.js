/**
 *
 * hs_2016.06.22
 * by qin
 * 使用:
 * 后台提供签到数据:
 * {
 *	"name":"days",
 *	"total":"30",
 *	"day":{
 *		"lastMonth":[1,5,10,16,17,18,21,22,26,30,31],
 *		"theMonth":[1,5,6,7,9,15,16,20,21]
 *	}
 * }
 * 可自动处理
 * 
 */

var countDays;
window.onload = function month(){
	var count = 0;
	var today = new Date();
	var linum = 0 ;
	today.setDate(1);
	var week = today.getDay();
	var lastMonthDay = new Date(today.getFullYear(), today.getMonth(),0);
	var lastMonthDate = lastMonthDay.getDate();
	// console.log("lastMonthDdate="+lastMonthDate);
	var last = new Date(today.getFullYear(), today.getMonth()+1,0);
	var lastDate = last.getDate(); 
	var theDay = new Date();
	// console.log("theDay="+theDay);
	theYear = theDay.getFullYear();
	theMonth = theDay.getMonth()+1;
	theDay = theDay.getDate();
	// console.log("theDay="+theDay+"; themMonth="+theMonth);
	$(".day").text(theYear+"年  "+theMonth+"月"+theDay+"日");
	// console.log("today="+today+";week="+week+";last="+last+";lastDate="+lastDate);
	if (week+lastDate>35) {
		linum = 7*6
	}else{
		linum = 7*5
	}
	$(function(){
		$.post("postdata.txt",{},function(data){
				// console.log(data);
				var data = $.parseJSON(data);
				// console.log(data);
				
				$(".text-box .text .total").html(data.total);
				var data = data.day;
				// data.lastMonth
				for (var i = 0; i < linum; i++) {
					var t = $(".check-day");
					var licl = "";
					var day;
					if (i<week) {
						day = lastMonthDate+(i-week)+1;
						licl = "class='last-month'";
						for(j=0; j<= data.lastMonth.length;j++){
							if(data.lastMonth[j] == day){
								licl = "class='check-days'";
							}
						}
					}else if(i>=week&&i<(lastDate+week)){
						day = i-week+1;
						if(day == theDay){
							licl = "class='check-theday'";
							for(j=0; j<= data.theMonth.length;j++){
							if(data.theMonth[j] == day){
								licl = "class='check-days'";
								$(".check-btn span").addClass("checked").text("已签到");
								var cday = theDay;
								var numDays = 1;
								for (var d = j-1; d >= 0; d--) {
									cday --;
									if(data.theMonth[d] == cday) numDays++;
								}
							}else{
								var cday = theDay;
								var numDays = 0;
								for (var d = j-1; d >= 0; d--) {
									cday --;
									if(data.theMonth[d] == cday) numDays++;
								}
							}
						}
							countDays = day;
						}else{
						for(j=0; j<= data.theMonth.length;j++){
							if(data.theMonth[j] == day){
								licl = "class='check-days'";
							}
						}
					}
					}else if (i>=lastDate) {
						day = i-week-lastDate+1;
						licl = "class='next-month'";
					}
					// console.log(count+"; licl="+licl+"; day="+day);
					t.append("<li   "+licl+"><a href='javascript:void(0)'>"+day+"</a></li>");
					// 清除浮动
					if(i == linum-1) t.append("<div class='cl-b'></div>")
					//连续签到天数
					$(".text-box .text .days").html(numDays);
					count ++;
				}
		})

	})
}
$(function(){
	$("body").on("click",".check-btn",function(){
		// $.post("",{},function(){
			var day = $(".check-day .check-theday");
			if (day.length == 0) {
				return false;
			}
			day.removeClass("check-theday").addClass("check-days");
			$(this).find("span").addClass("checked").text("已签到");
			var s = $(".text-box .text .days").text();
			$(".text-box .text .days").text(parseInt(s+1));
		// })
	});
	$("body").on("click",".check-day li a",function(){
		var t = $(this).parent();
		if(t.hasClass("check-theday")){
			t.removeClass("check-theday").addClass("check-days");
			$(".check-btn").find("span").addClass("checked").text("已签到");
			var s = $(".text-box .text .days").text();
			$(".text-box .text .days").text(parseInt(s+1));
		}else if (t.text() == countDays) {
			alert("尊敬的会员,您今天已经签过到了");
		}else{
			alert("签到只能在当天进行,先去逛逛吧");
		}
	})
})
