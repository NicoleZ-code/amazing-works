var slider_item =[];
function init(i){
	slider_item[i] ={
		move : true, //control play 
		number : 3,  //default 3
		movenumber: 1,  
		moveXY : 300  
	};
}
	function showContent(sliderindex,contentindex,direction){
		if (direction=="top") {
			$(".slider-item").eq(sliderindex).find(".slider-content")
			.stop(true,false)
			.animate({"margin-top": -slider_item[sliderindex].moveXY*contentindex},2000);
		} else{
			$(".slider-item").eq(sliderindex).find(".slider-content")
			.stop(true,false)
			.animate({"margin-left": -slider_item[sliderindex].moveXY*contentindex},2000);
		};
		
		$(".slider-item").eq(sliderindex).find(".dots li").removeClass("active")
			.eq(contentindex).addClass("active");
	}
	function multiSilder(direction){
		$(".slider-item").each(function(i){
			var $content_items = $(this).find(".slider-content li"); 
			var $dots_item = $(this).find(".dots li"); 

			init(i);

			$content_items.width($(this).width());
			$content_items.height($(this).height());
				
			slider_item[i].number = $content_items.length;
			if (direction=="top") {
				slider_item[i].moveXY = $(this).height();
			} else{
				slider_item[i].moveXY = $(this).width();
				$content_items.addClass("left");
			};
			

			showContent(i,0,direction);

			//add background-color 
			// for (var j = 0; j < $content_items.length; j++) {
			// 	$content_items.eq(j).css('background-color',$content_items.eq(j).text());
			// 	$content_items.eq(j).text(j+1+"-"+$content_items.eq(j).text())
			// };

			$content_items.on("mouseenter",function(){
				slider_item[i].move = false;
				slider_item[i].movenumber =$(this).index();
				showContent(i,$(this).index(),direction);
			}).on("mouseleave",function(){
				slider_item[i].move = true;
			});
			$dots_item.on("mouseenter",function(){
				slider_item[i].move = false;
				slider_item[i].movenumber =$(this).index();
				showContent(i,$(this).index(),direction);
			}).on("mouseleave",function(){
				slider_item[i].move = true;
			});
		});
		// autoplay
		setInterval(function(){
			$(".slider-item").each(function(i){
				var $slider_content = $(".slider-item .slider-content");
				if(slider_item[i].move){
					showContent(i,slider_item[i].movenumber%slider_item[i].number,direction)
					slider_item[i].movenumber++;
					if(direction=="top"){
						if (parseInt($slider_content.eq(i).css("margin-top")) == -slider_item[i].moveXY*(slider_item[i].number-1)) {										
								showContent(i,0,direction);					
						};
					}else{
						if (parseInt($slider_content.eq(i).css("margin-left")) == -slider_item[i].moveXY*(slider_item[i].number-1)) {										
								showContent(i,0,direction);					
						};
					}

				}
				
			});
		},3000);
	}