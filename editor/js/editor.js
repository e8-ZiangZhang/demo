$().ready(function(){
  $('.emojiBtn').bind('click',function(event) {
    var disN = $(this).next().css('display');
    if(disN == 'none'){
      $(this).next().show();
      $(this).next().find('img').each(function(index, el) {
        $(el).attr('src',$(el).attr('data-src'));
      });
    }else{
      $(this).next().hide()
    }
  });
  $('.emoji img').bind('click',function() {
    var ThisSrc = $(this).attr('src');
    var Img = '<img class="emoji_img" src="'+ThisSrc+'"/>';
    $('.emoji').hide();
    insertHTML(Img);
  });
  $("#edit-div")[0].addEventListener('blur', function (event)
  {
      var sel = window.getSelection();
      g_last_div_offset = sel.getRangeAt(0);
  });

  $("#edit-div")[0].addEventListener('focus', function (event)
  {
      var sel = window.getSelection();
      if(sel != null && g_last_div_offset != null &&
          (this == g_last_div_offset.startContainer
              || this== g_last_div_offset.startContainer.parentNode))
      {
              sel.removeAllRanges();
              sel.addRange(g_last_div_offset);
      }
  });
});
//获取光标位置插入html
function insertHTML(html) {
		var dthis = $(".editorbox")[0]
    $(dthis).focus();
    var sel, range ,nowId;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            var el = document.createElement('div');
            el.innerHTML = html;
            var frag = document.createDocumentFragment(),node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
						if(range.startContainer.nodeType==1){
							if(range.startContainer.getAttribute("id")=="edit-div"){
								range.insertNode(frag);
								if (lastNode) {
		                range = range.cloneRange();
		                range.setStartAfter(lastNode);
		                range.collapse(true);
		                sel.removeAllRanges();
		                sel.addRange(range);
		            }
							}else{
								var oHtml = $(dthis).html();
								$(dthis).html(oHtml+html);
							}
						}else {
							range.insertNode(frag);
							if (lastNode) {
									range = range.cloneRange();
									range.setStartAfter(lastNode);
									range.collapse(true);
									sel.removeAllRanges();
									sel.addRange(range);
							}
						}
        }
    } else if (document.selection && document.selection.type != 'Control') {
        $(dthis).focus(); //在非标准浏览器中 要先让你需要插入html的div 获得焦点
        ierange = document.selection.createRange(); //获取光标位置
        ierange.pasteHTML(html); //在光标位置插入html 如果只是插入text 则就是fus.text="..."
				$(dthis).focus();
    }
}
window.onload = function() {
	var EditDiv = {
		focus: false //確定當前焦點是否在編輯框內
	};
	document.getElementById('edit-div').onfocus = function(e) {
		EditDiv.focus = true;
	}
	document.getElementById('edit-div').onblur = function(e) {
		EditDiv.focus = false;
	}
	document.getElementById('edit-div').onkeydown = function(e) {
		var ev = e || window.event;
		var key = ev.keyCode || ev.charCode;
		var sel, rang, br, fixbr, node, inner, tempRange, offset;
		if(key == 13) {//回车事件
			if(ev.preventDefault) {
				ev.preventDefault();
			} else {
				ev.returnValue = false;
			}
			if(window.getSelection) {
				if(EditDiv.focus === false) {
					return false;
				}
				br = document.createElement('br');
				sel = window.getSelection();
				rang = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
				if (rang === null) {
					return false;
				}
				rang.deleteContents();
				node = sel.focusNode;
				inner = false;
				while(node.parentNode != document.documentElement) {//確定focusNode是否在編輯框內
					if(node === this) {
						inner = true;
						break;
					} else {
						node = node.parentNode;
					}
				}
				if (inner) {
					if(browser.chrome || browser.safari || browser.firefox) {//chrome、safari內，尾部換行時多添加一個<br type='_moz'>
						tempRange = rang.cloneRange();
						tempRange.selectNodeContents(this);
						tempRange.setEnd(rang.endContainer, rang.endOffset);
						offset = tempRange.toString().length;
						if(offset == this.textContent.length && this.querySelectorAll("#edit-div br[type='_moz']").length == 0) {//在行尾且不存在<br type='_moz'>時,多添加一个br，修改需回车了两次回行BUG
							fixbr = br.cloneNode();
							fixbr.setAttribute('type', '_moz');
							rang.insertNode(fixbr);
						}
					}
					rang.insertNode(br);
				}
				if (document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("Range", "2.0")) {
					tempRange = document.createRange();
					tempRange.selectNodeContents(this);
					tempRange.setStart(rang.endContainer, rang.endOffset);
					tempRange.setEnd(rang.endContainer, rang.endOffset);
					sel.removeAllRanges();
					sel.addRange(tempRange);
				}
			} else {
				rang = document.selection.createRange();
				if (rang === null) {
					return false;
				}
				rang.collapse(false)
				rang.pasteHTML('<br>');
				rang.select();
			}
		}
	}

}
//查看html片斷
function preview() {
	var htmls = document.getElementById('edit-div').innerHTML;
	if(htmls) {
		htmls = '<div style="margin:0;padding:0;background:#bbb;">'+ htmls +'<\/div>';
		var view = window.open('about:blank', 'view');
		view.document.open();
		view.document.write(htmls);
		view.document.close();
	}
}
//判斷流覽器
(function() {
	window.browser = {};
	if(navigator.userAgent.indexOf("MSIE") > 0) {
		browser.name = 'MSIE';
		browser.ie = true;
	} else if(navigator.userAgent.indexOf("Firefox") > 0){
		browser.name = 'Firefox';
		browser.firefox = true;
	} else if(navigator.userAgent.indexOf("Chrome") > 0) {
		browser.name = 'Chrome';
		browser.chrome = true;
	} else if(navigator.userAgent.indexOf("Safari") > 0) {
		browser.name = 'Safari';
		browser.safari = true;
	} else if(navigator.userAgent.indexOf("Opera") >= 0) {
		browser.name = 'Opera';
		browser.opera = true;
	} else {
		browser.name = 'unknow';
	}
} )();
