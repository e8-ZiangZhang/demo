$().ready(function(){
  loadImg._star();
})
var loadImg={
  _star:function(){
    var me = this;
    $(window).on('scroll', function(event) {
      me.checkShow();
    });
    me.checkShow();
  },
  checkShow:function(){
    var me = this;
    $('.wrap img').each(function(index, el) {
      var $this = $(this);
      if($this.data('isloadImg')){
        return;
      };
      if(me.isHeight($this)){
        setTimeout(function(){
          me.showImg($this)
        },300)
      }
    });
  },
  isHeight:function($el){
    var winH = $(window).height(),//获取窗口高度
        scrollH = $(window).scrollTop(),//获取滚动条滚动距离
        ThisTop = $el.offset().top;//获取当前对象居顶部高度
    if(winH + scrollH > ThisTop){
      return true;//显示图片
    }else{
      return false;//不显示图片
    };
  },
  showImg:function($el){
    $el.attr('src', $el.attr('data-src'));
    $el.data('isloadImg', 'true');
  }
}
