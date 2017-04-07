$().ready(function(){
  animate.star()
})

var animate = {
  star:function(){
    var me = this;
    $(window).scroll(function(event) {
      me.check()
    });
    me.check()
  },
  check:function(){
    var me = this
    $('.centerMTH').each(function(index, el) {
      var $this = $(this);
      if($this.data('isAnimate')){
        return
      }
      if(me.isHeight($this)){
        me.showAnimate($this.find('ul'));
      }
    });
  },
  isHeight:function($el){
    var winH = $(window).height();
    var scrollH = $(window).scrollTop();
    var ThisH = $el.offset().top;
    if(winH + scrollH > ThisH){
      return true
    }else {
      return false
    }
  },
  showAnimate:function($el){
    $el.addClass('animated');
    $el.data('isAnimate', 'true')
  }
}
