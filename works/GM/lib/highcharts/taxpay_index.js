 //三级页面图像混搭
var mix_charts = null;
var options =null;
 if(mix_charts !=null ) pieCharts.destory();
    options = {
     chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          renderTo:'tax_pie'
      },
     //去掉版本信息
      credits:{
         enabled:false
      },
      //去掉打印
      exporting:{
         enabled:false
      },
      title: {
          text: ''
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
    labels:{
      items:[{
      html:'<a href="http://www.52wulian.org" target="_blank">HighCharts</a>',
      style: {
        left:'520px',
        top:'160px',        
      }
     
    }],
    style:{
      color:'red',
      fontSize:45,
      fontWeight:'bold',
      zIndex:1000
    }
  },
  series: [{
      name: '税收情况',
      data: [
          { y:653.15,color:'#FFAB23',name:'总收入'},
          { y:353.51,color:'#4AB2E6',name:'增值税'},
          { y:93,color:'#50B95F',name:'调库'},
          { y:172,color:'#735CE6',name:'企业所得税'},
          { y:16.6,color:'#5C566B',name:'营改增收入'},
          { y:189.4,color:'#4A7CE6',name:'一般预算收入'}
      ]
  }]
};

$(function(){
   $(".detail_condition li:not(:first-child)").toggle(
        function(){
          if(!$(this).hasClass("li_on"))
                  $(this).addClass("li_on");
                else 
                  $(this).removeClass("li_on");
         },function(){
                $(this).removeClass("li_on");
         });
      //全选事件
    $("#select_pay").toggle(function(){
      $(this).siblings().addClass("li_on");
        $(this).parent().find("li:first-child").removeClass("li_on");
       },function(){
      $(this).siblings().removeClass("li_on");
    });

    $(".chart_type").mouseover(function(){
        $(".type_list").css("display","block");
    });
    $(".chart_type").mouseout(function(){
        $(".type_list").css("display","none");
    });
  

     //税务情况分析
     $("#slide").click(function(){
         $("#slide").toggleClass("active");
         $(".hide_charts").toggle();
     });

    //三级页面图表切换
     mix_charts = new Highcharts.Chart(options);  
    $(".type_list li").click(function(){
      var class_name = $(this).context.className;
      var type = null;
      if(class_name=="type1"){
          type="column";
      }else if(class_name=="type2"){
          type="pie";
      }else if(class_name=="type3"){
           type="line";
      }    
    
       options.chart.type = type;
       mix_charts=new Highcharts.Chart(options);
     });



});