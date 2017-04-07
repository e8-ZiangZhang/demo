$().ready(function(){
  getRomNum(10);//随机数字去重并排序
})

/*
  getRomNum 随机数字去重并排序方法
 */
var getRomNum = function(n){
  var hash = {},
      arr = [],
      star = 0;
  while (star < n) {
    var num = Math.round(Math.random()*100);
    if(hash[num]) continue;
    arr.push(num);
    hash[num] = true;
    star++;
    arr.sort()//对数组内随机数进行排序
  }
  var html='';
  html+="<li><h2>1.随机数字去重并排序</h2><p>";
  for(var i=0;i<arr.length;i++){
      html+=' '+arr[i];
    }
  html+='</p></li>';
  $('ul').append(html);
};
