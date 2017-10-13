var btnA=$(".buttons a");
var btnSpan=$(".buttons span");
var arrClass=["p6","p5","p4","p3","p2","p1"];
var index=0;
var time = null;
$(".next").click(
	function(){
	nextimg();
	}
);
$(".prev").click(
	function(){
	previmg();
	}
);
//上一张
function previmg(){
	arrClass.unshift(arrClass[5]);
	arrClass.pop();
	//i是元素的索引，从0开始
	//e为当前处理的元素
	//each循环，当前处理的元素移除所有的class，然后添加数组索引i的class
	$(".list li").each(function(i,e){
		$(e).removeClass().addClass(arrClass[i]);
	});
	index--;
	if (index<0) {
		index=5;
	}
	show();
}

//下一张
function nextimg(){
	arrClass.push(arrClass[0]);
	arrClass.shift();
	$(".list li").each(function(i,e){
		$(e).removeClass().addClass(arrClass[i]);
	});
	index++;
	if (index>5) {
		index=0;
	}
	show();
}
//改变底下按钮的背景色
function show(){
	$(btnA).siblings().children().removeClass("spanMoveColor");
	$(btnSpan).eq(index).addClass("spanMoveColor");
}
//通过底下按钮点击切换
btnA.each(function(){
	$(this).mouseover(function(){
		var myindex=$(this).index();
		// alert(myindex);
		// alert(index);
		var b=myindex-index;
		if(b==0){
			return;
		}
		else if(b>0) {
			/*
			 * splice(0,b)的意思是从索引0开始,取出数量为b的数组
			 * 因为每次点击之后数组都被改变了,所以当前显示的这个照片的索引才是0
			 * 所以取出从索引0到b的数组,就是从原本的这个照片到需要点击的照片的数组
			 * 这时候原本的数组也将这部分数组进行移除了
			 * 再把移除的数组添加的原本的数组的后面
			 */
			var newarr=arrClass.splice(0,b);
			arrClass=$.merge(arrClass,newarr);
			$(".list li").each(function(i,e){
			$(e).removeClass().addClass(arrClass[i]);
			});
			index=myindex;
			show();
		}
		else if(b<0){
			/*
			 * 因为b<0,所以取数组的时候是倒序来取的,也就是说我们可以先把数组的顺序颠倒一下
			 * 而b现在是负值,所以取出索引0到-b即为需要取出的数组
			 * 也就是从原本的照片到需要点击的照片的数组
			 * 然后将原本的数组跟取出的数组进行拼接
			 * 再次倒序,使原本的倒序变为正序
			 */
			arrClass.reverse();
			var oldArr=arrClass.splice(0,-b);
			arrClass=$.merge(arrClass,oldArr);
			arrClass.reverse();
			$(".list li").each(function(i,e){
			$(e).removeClass().addClass(arrClass[i]);
			});
			index=myindex;
			show();
		}
	});
});
//点击class为p2的元素触发上一张照片的函数
$(document).on("click",".p2",function(){
	previmg();
	return false;//返回一个false值，让a标签不跳转
});

//点击class为p4的元素触发下一张照片的函数
$(document).on("click",".p4",function(){
	nextimg();
	return false;
});
//鼠标移入article_img时清除定时器
$(".article_img").mouseover(function(){
	clearInterval(timer);
});

//鼠标移出article_img时开始定时器
$(".article_img").mouseleave(function(){
	timer=setInterval(nextimg,5000);
});

//进入页面自动开始定时器
timer=setInterval(nextimg,5000);

