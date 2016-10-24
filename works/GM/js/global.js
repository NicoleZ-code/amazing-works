$(function(){
	left_menu_Event();//三级页面左侧数 导航 点击事件 
	search_event();//三级页面左侧数  搜索事件
});
$(window).resize(function(){

});

//一级二级菜单事件
$(".menu_container .menuitem").click(function(){
	var data_src=$(this).attr("data-src");
	if(data_src==1){
		// window.top.location.href="head.html";
		//mainMenuInit(data_src);
		 window.top.location.href="index_menu2.html#"+data_src;

	}
});
$(".menu_container .menu_level2 dl.list dd").click(function(){
	// var data_src=$(this).attr("data-src");
	// if(data_src==1){
		// window.top.location.href="head.html";
		//mainMenuInit(data_src);
		 window.top.location.href="head.html#"+$(this).index();

	// }
});

//三级页面左侧数  搜索事件
function search_event(){
	$("#jk_main_container").on("click","input#btnsearch",function(){
		alert("输入不能为空！");
	});
}

//三级页面左侧数 
function left_menu_Init(lefttreejosn){
  var menus = lefttreejosn.menus;
    var _menus_str = "";
  	  _menus_str +="<li>";		
	  _menus_str +="<div class=\"sidebar-toggler hidden-phone\" title=\"点击展开收缩导航\"></div>";
	  _menus_str += "<li></li>";
	  _menus_str +="<form class=\"sidebar-search\">"	 
	  _menus_str +="<div class=\"input-box\">"			
	  _menus_str +="<a href=\"javascript:;\" class=\"remove\"></a>"				
	  _menus_str +="<input type=\"text\" placeholder=\"请输入关键字......\" />"					
	  _menus_str +="<input type=\"button\" id=\"btnsearch\" class=\"submit\" value=\" \" />"					
	  _menus_str +="</div>"					
	  _menus_str +="</form>"				
	  _menus_str +="</li>";	
  for ( var i = 0; i < menus.length; i++) {
    _menus_str += _sub_menu_add(menus[i]);
  }
  $(".page-sidebar-menu").empty().append($(_menus_str));
}
//三级页面左侧数 导航
function _sub_menu_add(menu) {
    var _title = menu["title"];
    var icon = menu["icon"];
    var url = menu["url"];

    var child_menus = null;
    if (menu["menus"]) {
      child_menus = menu["menus"];

      var _li = "";
      for ( var i = 0; i < child_menus.length; i++) {
        _li += "<li><a href='javascript:void(0);' data-src='"
            + child_menus[i]["url"] + "'>" + child_menus[i]["title"]
            + "</a></li>";
      }

      var _str = "<li> <a href='javascript:void(0);'>";
	      _str+="<i class='"+icon+"'></i>";
	      _str+="<span class='title' style='background:none'>"+_title+"</span>";
	      _str+="<span class='selected'></span>";
	      _str+="<span class='arrow'></span></a>";
	      _str += "<ul class='sub-menu'>";
	      _str += _li;
	      _str += "</ul>";
	      _str += "</li>";
	  return _str;
    } else {
	      _str = "<li> <a href='javascript:void(0);'>";
	      _str+="<i class='icon-cogs'></i>";
	      _str+="<span class='title'>"+_title+"</span>";
	      _str+="<span class='arrow'></span></a>";
	      _str += "</li>";
      return _str;
    }

}
//三级页面左侧数 导航 点击事件 
function left_menu_Event(){
	$("#jk_main_container").on("click",".page-sidebar-menu .sub-menu li a",function(){
		$("#maincontent").load($(this).attr("data-src"));
		$(this).parent().addClass("active").siblings().removeClass("active");
	});
	$("#jk_main_container").on("click",".page-sidebar-menu li",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
}

     
    
  

