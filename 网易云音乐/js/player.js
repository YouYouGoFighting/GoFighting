var audio = $("audio");

var firstPlay = true; //首次播放
var tmpid = 0;   //首次播放id
var clickid = 0; //记录单击歌单列表的id

var musicList = [
	{
		musicName: "理想三旬",      // 音乐名字
        artistsName: "陈鸿宇",    // 歌手名字
        albumName: "浓烟下的诗歌电台",      // 歌曲专辑
        albumPic:"img/lixiang.png",       // 歌曲封面
        mp3Url:"music/理想三旬.mp3"		// 歌曲链接
    },
    {
		musicName: "晴天",      // 音乐名字
        artistsName: "周杰伦",    // 歌手名字
        albumName: "叶惠美",      // 歌曲专辑
        albumPic:"img/qingtian.png",       // 歌曲封面
        mp3Url:"music/晴天.mp3"		// 歌曲链接
    },
    {
		musicName: "追光者",      // 音乐名字
        artistsName: "岑宁儿",    // 歌手名字
        albumName: "夏至未至 影视原声带",     // 歌曲专辑
        albumPic:"img/zhuiguangzhe.png",     // 歌曲封面
        mp3Url:"music/追光者.mp3"			// 歌曲链接
    },
    {
		musicName: "一个人的时光",      	// 音乐名字
        artistsName: "石进",    			// 歌手名字
        albumName: "夜的钢琴曲-石进原创钢琴曲14首",      // 歌曲专辑
        albumPic:"img/oneperson.png",       // 歌曲封面
        mp3Url:"music/一个人的时光.mp3"		// 歌曲链接
    },
    {
		musicName: "再也没有",      		// 音乐名字
        artistsName: "Ryan.B / AY楊佬叁",    // 歌手名字
        albumName: "再也没有",      		// 歌曲专辑
        albumPic:"img/nothing.png",        // 歌曲封面
        mp3Url:"music/再也没有.mp3"			// 歌曲链接
    },
    {
		musicName: "告白气球",      		// 音乐名字
        artistsName: "周杰伦",    	 		// 歌手名字
        albumName: "周杰伦的床边故事",      // 歌曲专辑
        albumPic:"img/gaobai.png",       	// 歌曲封面
        mp3Url:"music/告白气球.mp3"			// 歌曲链接
    },
    {
		musicName: "平凡之路",      		// 音乐名字
        artistsName: "朴树",        		// 歌手名字
        albumName: "猎户星座",      		// 歌曲专辑
        albumPic: "img/pingfanzhilu.png",   // 歌曲封面
        mp3Url:"music/平凡之路.mp3"			// 歌曲链接
    }
];

// 播放、暂停按钮的处理
$(".btn-play").click(function(){
    if(audio.paused === false) {  // 之前是播放状态
        audio.pause();  // 暂停
    } 
    else {
    	if (firstPlay === true) {
    		listClick(1);
    	}
		audio.play();
    }
});

// 播放
function audioPlay() {
    audio.paused = false;     // 更新状态（未暂停）
    $(".btn-play").addClass("btn-state-paused");        // 恢复暂停

    $(".stop_vol").addClass("start_vol");               // 添加播放图标
    $(".list-id").removeClass("stop_vol");				// 移除暂停图标
    listVol();
    
}

// 暂停
function audioPause() {
    audio.paused = true;      // 更新状态（已暂停）
    
    $(".btn-play").removeClass("btn-state-paused");     // 取消暂停

    $(".start_vol").addClass("stop_vol");               //添加暂停图标
    $(".list-id").removeClass("start_vol");				//移除播放图标
    listVol();
}

// 播放上一首歌
function prevMusic() {
    listClick(tmpid - 1);
    listVol();

}

// 播放下一首歌
function nextMusic() {
    listClick(tmpid + 1);
    listVol();
    
}

// 歌曲时间变动回调函数
function updateProgress(){
    // 暂停状态不管
    if(audio.paused !== false) return true;
    // 同步进度条
	music_bar.goto(audio.currentTime / audio.duration);
	//同步时间
	var currentTime = audio.currentTime;
	setTimeShow(currentTime);
}

//设置播放时间
function setTimeShow(t) {
	t = Math.floor(t);
	var playTime = secondToMin(audio.currentTime);
	$(".audio-this-time").html(playTime);
	$(".audio-count-time").text(secondToMin(audio.duration));
}

//计算播放时间
function secondToMin(s) {
	var MM = Math.floor(s / 60);
	var SS = s % 60;
	if (MM < 10)
	MM = "0" + MM;
	if (SS < 10)
	SS = "0" + SS;
	var min = MM + ":" + SS;
	return min.split('.')[0];
}

//事件绑定函数，兼容浏览器差异
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } 
    else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } 
    else {
        ele["on" + event] = hanlder;
    }
}

//播放图标跟随歌曲id的变动而变动
function listVol() {
    var tr_index = $(".music-list").length;
    for (var i = 0;i <= tr_index; i++) {
    	if (i == tmpid) {
    		$(".music-list").eq(tmpid-1).children("td").eq(0).html("");
    		$(".music-list").eq(tmpid-1).children("td").eq(0).addClass("start_vol");
    	}
	}
}

// 显示的列表中的某一项点击后的处理函数
// 参数：歌曲在列表中的编号
function listClick(no) {
	//恢复原歌曲id并移除播放与暂停图标
	if (firstPlay == false){
		$(".start_vol").html("0" + tmpid);
		$(".list-id").removeClass("start_vol");
		$(".list-id").removeClass("stop_vol");
	}
	
    // 歌曲 ID 范围限定
    if(no <= 0) no = 7;
    if(no > 7) no = 1;
    //调试信息
    console.log(no);
    // 记录要播放的歌曲的id
    window.tmpid = no;
    //调试信息
    console.log(tmpid);
    firstPlay = false;  //改变首次播放的状态   

    music_bar.goto(0);  // 进度条强制归零

    $('audio').remove();
    var newaudio = $('<audio><source src="'+ musicList[no-1].mp3Url +'"></audio>').appendTo('body');
    audio = newaudio[0];
    audio.volume = volume_bar.percent;

    addEventHandler(audio, 'timeupdate', updateProgress);
	addEventHandler(audio, 'play', audioPlay);     // 开始播放了
	addEventHandler(audio, 'pause', audioPause);   // 暂停
	addEventHandler(audio, 'ended', nextMusic);    //播放结束后自动播放下一首

	audio.play();

	updateCover(no);
}

// 音乐进度条拖动回调函数
function mBcallback(newVal) {
    var newTime = audio.duration * newVal;
    // 应用新的进度
    audio.currentTime = newTime;
}

// 音量条变动回调函数
// 参数：新的值
function vBcallback(newVal) {
    if(audio !== undefined) {   // 音频对象已加载则立即改变音量
        audio.volume = newVal;
    }
    
    if($(".btn-quiet").is('.btn-state-quiet')) {
        $(".btn-quiet").removeClass("btn-state-quiet");     // 取消静音
    }
    
    if(newVal === 0) $(".btn-quiet").addClass("btn-state-quiet");
    
    playerSavedata('volume', newVal); // 存储音量信息
}

// 静音按钮点击事件
$(".btn-quiet").click(function(){
    var oldVol;     // 之前的音量值
    if($(this).is('.btn-state-quiet')) {
        oldVol = $(this).data("volume");
        oldVol = oldVol? oldVol: 0.7;  // 没找到记录的音量，则重置为默认音量
        $(this).removeClass("btn-state-quiet");     // 取消静音
    } else {
        oldVol = volume_bar.percent;
        $(this).addClass("btn-state-quiet");        // 开启静音
        $(this).data("volume", oldVol); // 记录当前音量值
        oldVol = 0;
    }
    playerSavedata('volume', oldVol); // 存储音量信息
    volume_bar.goto(oldVol);    // 刷新音量显示
    if(audio !== undefined) audio.volume = oldVol;  // 应用音量
});

// 下面是进度条处理
var initProgress = function(){  
    // 初始化播放进度条
    music_bar = new mkpgb("#music-progress", 0, mBcallback);
    // 初始化音量设定
    var tmp_vol = playerReaddata('volume');
    tmp_vol = (tmp_vol !== null)? tmp_vol: 0.6;
    if(tmp_vol < 0) tmp_vol = 0;    // 范围限定
    if(tmp_vol > 1) tmp_vol = 1;
    if(tmp_vol == 0) $(".btn-quiet").addClass("btn-state-quiet"); // 添加静音样式
    volume_bar = new mkpgb("#volume-progress", tmp_vol, vBcallback);
};  

// 进度条框 id，初始量，回调函数
mkpgb = function(bar, percent, callback){  
    this.bar = bar;
    this.percent = percent;
    this.callback = callback;
    this.locked = false;
    this.init();  
};

mkpgb.prototype = {
    // 进度条初始化
    init : function(){  
        var mk = this,mdown = false;
        // 加载进度条html元素
        $(mk.bar).html('<div class="mkpgb-bar"></div><div class="mkpgb-cur"></div><div class="mkpgb-dot"><div class="dot-in"></div></div>');
        // 获取偏移量
        mk.minLength = $(mk.bar).offset().left; 
        mk.maxLength = $(mk.bar).width() + mk.minLength;
        // 窗口大小改变偏移量重置
        $(window).resize(function(){
            mk.minLength = $(mk.bar).offset().left; 
            mk.maxLength = $(mk.bar).width() + mk.minLength;
        });
        // 监听小点的鼠标按下事件
        $(mk.bar + " .mkpgb-dot").mousedown(function(e){
            e.preventDefault();    // 取消原有事件的默认动作
        });
        // 监听进度条整体的鼠标按下事件
        $(mk.bar).mousedown(function(e){
            if(!mk.locked) mdown = true;
            barMove(e);
        });
        // 监听鼠标移动事件，用于拖动
        $("html").mousemove(function(e){
            barMove(e);
        });
        // 监听鼠标弹起事件，用于释放拖动
        $("html").mouseup(function(e){
            mdown = false;
        });
        
        function barMove(e) {
            if(!mdown) return;
            var percent = 0;
            if(e.clientX < mk.minLength){ 
                percent = 0; 
            }else if(e.clientX > mk.maxLength){ 
                percent = 1;
            }else{  
                percent = (e.clientX - mk.minLength) / (mk.maxLength - mk.minLength);
            }
            mk.callback(percent);
            mk.goto(percent);
            return true;
        }
        
        mk.goto(mk.percent);
        
        return true;
    },
    // 跳转至某处
    goto : function(percent) {
        if(percent > 1) percent = 1;
        if(percent < 0) percent = 0;
        this.percent = percent;
        $(this.bar + " .mkpgb-dot").css("left", (percent*100) +"%"); 
        $(this.bar + " .mkpgb-cur").css("width", (percent*100)+"%");
        return true;
    }
};
// 初始化滚动条
initProgress();

// 播放器本地存储信息
// 参数：键值、数据
function playerSavedata(key, data) {
    key = 'mkPlayer_' + key;    // 添加前缀，防止串用
    data = JSON.stringify(data);
    // 存储，IE6~7 不支持HTML5本地存储
    if (window.localStorage) {
        localStorage.setItem(key, data);	
    }
}

// 播放器读取本地存储信息
// 参数：键值
// 返回：数据
function playerReaddata(key) {
    if(!window.localStorage) return '';
    key = 'mkPlayer_' + key;
    return JSON.parse(localStorage.getItem(key));
}