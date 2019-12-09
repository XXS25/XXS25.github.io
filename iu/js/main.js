//数据渲染
(function(){
	
	var datepicker=window.datepicker;
	var monthData;
	var $wrapper;
	
	datepicker.bindUi=function(year,month){
		//获取这个月的数据
		monthData=datepicker.getMonthData(year,month);
		
		var html='<div class="ui-datepicker-hread">'+
				'<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>'+
				'<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>'+
				'<span class="ui-datepicker-curr-month">'+monthData.year+'-'+monthData.month+'</span>'+
			'</div>'+
			'<div class="ui-datepicker-body">'+
				'<table>'+
					'<thead>'+
						'<tr>'+
							'<th>一</th>'+
							'<th>二</th>'+
							'<th>三</th>'+
							'<th>四</th>'+
							'<th>五</th>'+
							'<th>六</th>'+
							'<th>日</th>'+
						'</tr>'+
					'</thead>'+
					'<tbody>';
					
					for(var i=0;i<monthData.days.length;i++){
						var date=monthData.days[i];
						if(i%7===0){
							html+='<tr>'
						}
						html+='<td data-date="' + date.date + '">'+date.showDate+'</td>';
						if(i%7===6){
							html+='</tr>'
						}
					}
				html+='</tbody>'+
				'</table>'+
			'</div>';
			
			return html;
	}
	
	datepicker.render=function(direction){
		var year,month;
		if(monthData){
			year=monthData.year;
			month=monthData.month;
		}
		//判断按钮的方向
		if(direction==='prev')month--;
		if(direction==='next')month++;
		//调用渲染函数，获取返回值
		var html=datepicker.bindUi(year,month);
		
		//判断容器，创建过就更新容器
		if(!$wrapper){
		//创建容器节点
		$wrapper=document.createElement('div');
		//为容器节点添加样式
		$wrapper.className='ui-datepicker-wrapper';
		//将容器放入html中
		$wrapper.innerHTML=html;
		//将容器添加至body中，以免其他的元素被覆盖
		document.body.appendChild($wrapper);
		}
		//更新容器中的内容
		$wrapper.innerHTML=html;
	}

	
	//页面初始化
	datepicker.init=function(input){
		//调用创建包裹元素函数
		datepicker.render();
		//获取传递类的元素
		var $input=document.querySelector(input);
		
		//定义变量表示开启的状态
		var isopen=false;
		
		//为输入框添加事件监听器
		$input.addEventListener('click',function(){
			//判断是否开启
			if(isopen){
				//开启
				
				//为容器移除样式
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				//关闭状态
				isopen=false;
			}else{
				//关闭
				
				//为容器添加样式
				$wrapper.classList.add('ui-datepicker-wrapper-show');
				
				//获取输入框的位置
				var left=$input.offsetLeft;
				var top=$input.offsetTop;
				var height=$input.offsetHeight;
				
				//为容器添加位置
				$wrapper.style.top=top+height+2+'px';
				$wrapper.style.left=left+'px';
				
				//开启状态
				isopen=true;
			}
		},false);
		
		//为容器元素添加事件
		$wrapper.addEventListener('click',function(e){
			//获取点击的元素
			var $target=e.target;
			//判断是否为按钮类
			if(!$target.classList.contains('ui-datepicker-btn'))return;
		
			//判断是否为左右按钮类
			if($target.classList.contains('ui-datepicker-prev-btn')){
				datepicker.render('prev');
			}else if($target.classList.contains('ui-datepicker-next-btn')){
				datepicker.render('next');
			}
		},false)
		
		//为容器元素添加事件
		$wrapper.addEventListener('click',function(e){
			//获取点击的元素
			var $target=e.target;
			//判断点击是否为单元格
			if($target.tagName.toLocaleLowerCase()!=='td')return;
			//获取日期
			var date=new Date(monthData.year,monthData.month-1,$target.dataset.date);
			//格式化输入框中的值
			$input.value=format(date);
			//为容器移除样式
			$wrapper.classList.remove('ui-datepicker-wrapper-show');
			//关闭状态
			isopen=false;
		},false)
	};
	
	function format(date){
		var ret='';
		
		var padding=function(num){
			if(num<=9){
				return '0'+num;
			}
			return num;
		}

		//获取年月日
		ret+=date.getFullYear()+'-';
		ret+=padding(date.getMonth()+1)+'-';
		ret+=padding(date.getDate());

		return ret;
	}
})();
