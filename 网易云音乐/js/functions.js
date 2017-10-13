$(function () {
	var aWeek = new Array("日", "一", "二", "三", "四", "五", "六");
	var week = new Date().getDay();
	$(".week").html("星期" + aWeek[week]);

	//歌曲列表隔行变色
	$(".music-list:odd").addClass("tr_odd"); 
    $(".music-list:even").addClass("tr_even");
});

//收起、展开
$(".upDownBuild").click(upDown);

//收起、展开
$(".upDownCollect").click(upDown);

function upDown() {
	var arrow = $(this).find("span.arrow");
	if (arrow.hasClass("down")) {
		arrow.removeClass("down");
		arrow.addClass("up");
		$(this).attr("title","展开");
	}
	else if (arrow.hasClass("up")){
		arrow.removeClass("up");
		arrow.addClass("down");
		$(this).attr("title","收起");
	}
	$(this).parent().find("nav.nav_li").slideToggle();
}

// 主页与歌曲列表切换处理
$(".btn").click(function(){
    switch($(this).data("action")) {
        case "homePage":    // 播放器
            dataBox("homePage");
        break;

        case "sheet":   // 音乐列表
            dataBox("sheet");    // 在主界面显示出音乐列表
        break;
    }
});

//选择显示主页或者歌曲列表信息
function dataBox(choose) {
    switch(choose) {
        case "homePage":    // 显示播放列表
           	$(".songSheet").css("display","none");
           	$(".wyRight").css("display","block");
        break;
        
        case "sheet":  // 显示播放器
           $(".wyRight").css("display","none");
           $(".songSheet").css("display","block");
        break;
    }
}

// 列表项双击播放
$(".music-list").on("dblclick", function() {
	var num = parseInt($(this).children("td").eq(0).text());        //获取当前双击列表项的id
	if(isNaN(num)) return false;
    listClick(num);
    $(this).children("td").eq(0).html("");							//清空当前第一个td的值
    $(this).children("td").eq(0).addClass("start_vol");				//在当前第一个td添加播放图标
});

// 上一首歌
$(".btn-prev").click(function(){
    prevMusic();
});
    
// 下一首歌
$(".btn-next").click(function(){
    nextMusic();
});

//阻止双击歌单列表变蓝
$(".music-list").bind("selectstart", function () { return false; });

//单击歌单列表背景变色
$(".music-list").click(function() {
	clickid = parseInt($(this).children("td").eq(0).text());
	$(".music-list").removeClass("tr_bgcolor");
	$(this).addClass("tr_bgcolor");
});

//滑动歌单列表背景变色
 $(".music-list").mouseover(function () {
 	var num =parseInt($(this).children("td").eq(0).text());
 	console.log(num + ":" + clickid);
 	if(num === clickid) return true;
 	$(this).addClass("move_bgcolor");
 }).mouseout(function () {
 	$(this).removeClass("move_bgcolor");
 });

// 更新左下角歌曲封面、音乐名字、歌手名字
// 参数：歌曲列表id
function updateCover (no) {
	$(".music-cover").attr("src",musicList[no-1].albumPic);
	$(".music-name").html(musicList[no-1].musicName);
	$(".artists-name").html(musicList[no-1].artistsName);
}

//鼠标移入移出歌曲封面
 $(".cover").mouseover(function () {
 	$(".music-fugai").css("display","block");
 }).mouseout(function () {
 	$(".music-fugai").css("display","none");
 });

 $(".wyLeft li").click(function () {
 	 $(".wyLeft li").removeClass("selectBg");
 	 $(this).addClass("selectBg");
 });
