mui.init();
//定义subpages数组，添加子页面
var subpages = [{
			      url:'./subpages/attention.html',
			      id:'attention.html',
			      styles:{
			        bottom:'0px'//默认为0px，可不定义；
			      }
			    },{
			      url:'./subpages/location.html',
			      id:'location.html',
			      styles:{
			        bottom:'0px'//默认为0px，可不定义；
			      }
			    }];
var aniShow={}	//记录显示过的页面
var statusHeight=0;	//状态栏高度

mui.plusReady(function () {
	var self = plus.webview.currentWebview();
	statusHeight = plus.navigator.getStatusbarHeight();
	mui(".myself-bar")[0].style.top=statusHeight+"px";
    for(var i = 0; i < subpages.length; i++){
		var temp = {};
		var sub = plus.webview.create(subpages[i].url,subpages[i].id,{top:statusHeight+45+'px', bottom:'0px'});
		sub.hide();
		self.append(sub);
	}
})

activeTab = "interest.html";

// 切换导航栏操作
mui(".myself-center-bar").on("tap","span",function(e){
	// 判断是否是当前页面
	var targetTab = this.getAttribute('href');
	
	if(targetTab === activeTab){
		return;
	}
	
	var activeNav = mui("span.myself-active-nav")[0];
	activeNav.setAttribute("class","");
	var targetNav = mui(this)[0];
	targetNav.setAttribute("class","myself-active-nav");
	const activeVideo = mui('video')[mySwiper.activeIndex];
	
	if(targetTab !== "interest.html"){
		// 如果推荐页的视频仍在播放，则暂停
		if(!activeVideo.paused){
			activeVideo.pause();
		}
		mui(".mui-content")[0].style.visibility="hidden";
		mui(".myself-bar")[0].style.backgroundColor="white";
		mui(".myself-bar")[0].style.color="black"; 
		plus.navigator.setStatusBarStyle("dark");
		// 判断页面是不是首次显示
		if(mui.os.ios || aniShow[targetTab]){
			plus.webview.show(targetTab);
		}else{
			// 否则来个动画缓冲
			var temp = {};
			temp[targetTab] = "true";
			mui.extend(aniShow,temp);
			plus.webview.show(targetTab,"fade-in",300);
		}
	}else{
		if(activeVideo.paused){
			activeVideo.play();
		}
		mui(".mui-content")[0].style.visibility="visible";
		mui(".myself-bar")[0].style.background="transparent";
		mui(".myself-bar")[0].style.color="white";
		plus.navigator.setStatusBarStyle("light");
	}
		
	plus.webview.hide(activeTab);
	activeTab = targetTab;
});