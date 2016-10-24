$(function(){

  mainMenu_Init(headmenujosn);//top menu
	mainMenuEvent();
	mainMenuSelect(0);   

	App.init(); // initlayout and core plugins
	Index.init();
});
$(window).resize(function(){
    
});

//首页 头部导航选择
function  mainMenuSelect(index){	
	$("#mainMenu ul li").eq(index).trigger("click");
}
//首页 头部导航 点击事件
function  mainMenuEvent(){
	$("#mainMenu").on("click","ul li",function(){
		var option = $(this).attr("data-select");//根据不同的值查询不同的leftmenu
		var defaultjsp =$(this).attr("src");
		$(this).addClass("tabselected").siblings().removeClass("tabselected");	
		 
		 left_menu_Init(testjosn[$(this).index()]);	
		$("#maincontent").load(defaultjsp);//默认页

	});
	
}
//首页 头部导航 动态 创建
function mainMenu_Init(headmenujosn){
  var str="<ul>";
  var linumber=0;
  for (var i = 0; i < headmenujosn.length; i++) {
    linumber= i+1;
    str+="<li id='tab"+linumber+"' class='mainMenu_item' src='"+headmenujosn[i]["src"]+"'>"; 
    str+=headmenujosn[i]["name"];
    str+="</li>";
  };
    str+="</ul>";
  $("#mainMenu").html(str);
}
var headmenujosn =[
    {id:"", name:"纳税服务", src:"part1/overallSituationAnalysis.html"}
];

	var testjosn =[];
   testjosn[0] = {
      menus : [ {
        title : "可视化分析",
        icon : "icon-part1-1",
        menus : [ 

	       {title: "整体情况分析", icon:"icon-item", url:"part1/overallSituationAnalysis.html"},
	       {title: "企业指数下钻分析", icon:"icon-item", url:"part1/companyDataAnalysis.html"},
	       {title: "信用识别分析", icon:"icon-item", url:"part1/credit_report.html"},
	       {title: "企业关联分析", icon:"icon-item", url:"part1/demo.html"},
	       {title: "朋友圈分析", icon:"icon-item", url:"part1/tax_pay.html"},
         {title: "风险预警监控", icon:"icon-item", url:"part1/riskWarning.html"}

     ]},{
        title : "分析报告",
        icon:"icon-part1-2",
        menus : [
          {title: "市政府分析报告", icon:"icon-item",url: "part2/analysisReport.html"},
          {title: "市局领导报告", icon:"icon-item",url: "part2/analysisReport.html"},
          {title: "税收管理员报告", icon:"icon-item",url: "part2/analysisReport.html"},
          {title: "风险分析报告", icon:"icon-item",url: "part2/analysisReport.html"}
      ]},{
        title : "银税互动",
        icon : "icon-part1-3",
        menus : [ 
	       {title: "银税互动明细", icon:"icon-item", url:"part3/taxBankDetail.html"},
         {title: "税信贷贷前信息表", icon:"icon-item", url:"part3/taxBankDetail.html"},
         {title: "税信贷贷后信息表", icon:"icon-item", url:"part3/taxBankDetail.html"}
     ]}
     ]
  };
