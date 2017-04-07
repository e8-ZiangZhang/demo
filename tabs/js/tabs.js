$().ready(function(){
  oTabe($('.btn_box li'),$('.content_box li'))
})
//选项卡公共函数
function oTabe(obj_btn,obj_box){
	var oBtn=$(obj_btn);
	var oDiv=$(obj_box);
	$(oBtn).click(function(){
		$(oBtn).eq($(this).index()).addClass("active").siblings().removeClass('active');
		$(oDiv).removeClass('active').eq($(this).index()).addClass('active');
	});
};
