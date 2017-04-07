var myScroll,
    pullDownEl,
    pullDownOffset,
    pullUpEl,
    pullUpOffset,
    num = 0;
/**
 * 下拉刷新
 */
 var pullDownAjax = function(){
   setTimeout(function(){
     var html = '',
         listBox = $('#list');
     for (var i = 0; i < 3; i++) {
         html+='<li>zza测试信息'+ num++ +'</li>';
     }
     listBox.prepend(html)
     myScroll.refresh()// 数据加载完成后，调用界面更新方法
   },1000)
 };
/**
 * 上拉加载
 */
 var pullUpAjax = function(){
   setTimeout(function(){
     var html = '',
     listBox = $('#list');
   for (var i = 0; i < 3; i++) {
     html+='<li>zza测试信息'+ num++ +'</li>'
   };
   listBox.append(html)
   myScroll.refresh()
   },1000)
 };

/**
 * 初始化iScroll控件
 */
function loaded() {
 pullDownEl = document.getElementById('pullDown');
 pullDownOffset = pullDownEl.offsetHeight;
 pullUpEl = document.getElementById('pullUp');
 pullUpOffset = pullUpEl.offsetHeight;

 myScroll = new iScroll('wrapper', {
  scrollbarClass: 'myScrollbar', /* 重要样式 */
  useTransition: false,
  topOffset: pullDownOffset,
  onRefresh: function () {
   if (pullDownEl.className.match('loading')) {
    pullDownEl.className = '';
    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
   } else if (pullUpEl.className.match('loading')) {
    pullUpEl.className = '';
    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
   }
  },
  onScrollMove: function () {
   if (this.y > 5 && !pullDownEl.className.match('rote')) {
    pullDownEl.className = 'rote';
    pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放更新...';
    this.minScrollY = 0;
   } else if (this.y < 5 && pullDownEl.className.match('rote')) {
    pullDownEl.className = '';
    pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
    this.minScrollY = -pullDownOffset;
   } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('rote')) {
    pullUpEl.className = 'rote';
    pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放更新...';
    this.maxScrollY = this.maxScrollY;
   } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('rote')) {
    pullUpEl.className = '';
    pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
    this.maxScrollY = pullUpOffset;
   }
  },
  onScrollEnd: function () {
   if (pullDownEl.className.match('rote')) {
    pullDownEl.className = 'loading';
    pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
    pullDownAjax(); 
   } else if (pullUpEl.className.match('rote')) {
    pullUpEl.className = 'loading';
    pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
    pullUpAjax();
   }
  }
 });

 setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);
