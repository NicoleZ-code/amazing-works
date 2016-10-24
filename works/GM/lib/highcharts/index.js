

//获得柱形图

var columnCharts = null;
function getColumn(){
/*  if(columnCharts!=null) columnCharts.destory();*/
  
  columnCharts = $('#area-include').highcharts({
  	  //去掉打印
        exporting:{
           enabled:false
        },
  	chart: { 
  		type: 'bar' 
  	},
  	title: { 
  		text: '' 
  	},
  	subtitle: { 
  		text: '' 
  	},
  	xAxis: { 
  		categories: ['正常纳税人', '注销用户', '正常纳税人', '注销用户'],
  		title: { text: null }
  		},
  	yAxis: { 
  		min: 0, 
  		title: { text: ''}
  	},
  	/*tooltip: { 
  		valueSuffix: ' millions' 
  	},*/
  	plotOptions: { 
  		bar: { 
  			dataLabels: { enabled: true } 
  		} 
  	},
  	legend: { 
  		layout: 'vertical', 
  		align: 'right', 
  		verticalAlign: 'top', 
  		x: -40, 
  		y: 100, 
  		floating: true, 
  		borderWidth: 1, 
  		backgroundColor: '#FFFFFF', 
  		shadow: true 
  	}, 
  	credits: { enabled: false }, 
  	series: [
  	{name: '总数', data:datas }
  	
  	] 
  });
       
       
  
}
//获得饼图
var pieCharts = null ;

function getPieCharts(){

  if(pieCharts !=null ) pieCharts.destory();
  
  $('#main-line').highcharts({
  	//去掉打印
        exporting:{
           enabled:false
        },
         //去掉版本信息
        credits:{
           enabled:false
        },
  	chart: {
  		plotBackgroundColor: null,
  		plotBorderWidth: null, 
  		plotShadow: false 
  	}, 
  	title: { 
  		text: '' 
  	},
  	
  		plotOptions: { 
  			pie: { 
  				allowPointSelect: false, 
  				cursor: 'pointer', 
  				dataLabels: { 
  					enabled: true, 
  					color: '#000000', 
  					connectorColor: '#000000', 
  					format: '<b>{point.name}</b>: {point.percentage:.1f} %' 
  				} 
  			} 
  		}, 
  		series: [{ 
  			type: 'pie', 
  			name: '总数', 
  			data: [ 
  			['正常纳税人', dataq1], 
  			['报验，报验核销', dataq2], 
  			['非正常注销', dataq3], 
  			['临商户', dataq4] 
  			] 
  		}] 
  });

    
    
}








     $(function(){
      //table 奇偶行背景变色
       $(".login-table tbody tr:odd").css("background-color","#E8E9EA");
      //table选中样式
      $(".login-table tr").click(function(){
           $(".login-table tr").removeClass('tr_active');
           $(this).addClass("tr_active");
      });
      //tab页签
        $(".line-title ul li").click(function(){
           var _this = $(this);/*当前li对象*/
           var _ul = _this.parent();/*ul的对象*/
           var _next_div = _ul.parents(".line-title").next();/*下一个div属性*/
           var i = _ul.children().index(_this);
           _ul.children().removeClass("active");
           _this.addClass("active");
           _next_div.children().addClass("hide");
           _next_div.children().eq(i).removeClass("hide");
        }).eq(0).trigger("click");
    //数据切换
  
    $("#hy").change(function(){
			datas=[Math.ceil(Math.random()*1000),Math.ceil(Math.random()*100),Math.ceil(Math.random()*100),Math.ceil(Math.random()*100)]
			dataq1=Math.ceil(Math.random()*1000);
			dataq2=Math.ceil(Math.random()*100);
			dataq3=Math.ceil(Math.random()*100);
			dataq4=Math.ceil(Math.random()*100);
			getColumn();
    	getPieCharts()
    	}
    )
  });

   
    


