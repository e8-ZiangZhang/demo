(function(doc, win) {
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if(clientWidth > 768){
        clientWidth=768;
        $('body').css({width:'768px',margin:'0 auto'});
      }else{
        clientWidth = docEl.clientWidth;
        $('body').css({width:'auto'});
      }
      docEl.style.fontSize =clientWidth / 7.5 + 'px';
  };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt,recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window );
