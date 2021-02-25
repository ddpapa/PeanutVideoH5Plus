// 构件子页面
var subpages = ['friends.html', 'message.html', 'personal.html'];
var subpage_style = {
	top: '0px',
	bottom: '44px'
};
var aniShow = {};

mui.plusReady(function () {
	plus.navigator.setStatusBarStyle("light");
	plus.navigator.setStatusBarBackground('black');
	var self = plus.webview.currentWebview();
	for (var i = 0; i < 3; i++) {
		var temp = {};
		var sub = plus.webview.create("subpages/"+subpages[i], subpages[i], subpage_style);
		sub.hide();
		self.append(sub);
	}
})

// 当前激活选项卡
var activeTab;

// 绑定导航栏点击事件
mui('.myself-footer-bar').on('tap','span',function(){
	const targetTab = mui(this)[0].getAttribute('href');
	if(targetTab === 'index.html' || targetTab === 'camera.html'){
		if(activeTab){
			plus.webview.hide(activeTab);
		}
		alert("thank you");
	}else{
		//显示目标选项卡
		//若为iOS平台或非首次显示，则直接显示
		if(mui.os.ios||aniShow[targetTab]){
			plus.webview.show(targetTab);
		}else{
			//否则，使用fade-in动画，且保存变量
			var temp = {};
			temp[targetTab] = "true";
			mui.extend(aniShow,temp);
			plus.webview.show(targetTab,"fade-in",300);
		}
		//隐藏当前(如果activeTab有值的话);
		if(activeTab){
			plus.webview.hide(activeTab);
		}
		//更改当前活跃的选项卡
		activeTab = targetTab;
	}
})

var outerSwiper = new Swiper ('#outer-swiper', {
	initialSlide:0,	// 设定初始化索引，即第三个slider
    direction: 'horizontal', // 垂直切换选项
    resistanceRatio:0, // 边缘抵抗力为0
	on:{
	    touchMove: function(swiper,event){
	      //你的事件
		  if(swiper.activeIndex != 0){
			event.stopPropagation();
		  }
	    },
	  },
  });
    
outerSwiper.on('slideChangeTransitionEnd',function(){
	const interestVideo = mui('#interest-swiper video')[interestSwiper.activeIndex];
	const attentionVideo = mui('#attention-swiper video')[attentionSwiper.activeIndex];
	const previousTab = mui('.myself-center-bar>span')[this.previousIndex];
	const currentTab = mui('.myself-center-bar>span')[this.activeIndex];
	
	if(this.activeIndex === 2){
		if(!attentionVideo.paused){
			setTimeout(function(){
				attentionVideo.pause();
			},50);
		}
		setTimeout(function(){
			interestVideo.play();
		},50);
	}else if(this.activeIndex === 1){
		if(data_attention.videoList.length === 0){
			// 初始化videolist
			getAttentionVideoList();
		}else{
			// 直接播放 video，并暂停 interestVideo
			setTimeout(function(){
				attentionVideo.play();
				interestVideo.pause();
			},50);
		}
	}else{
		if(!interestVideo.paused){
			setTimeout(function(){
				interestVideo.pause();
			},50);
		}
		if(!attentionVideo.paused){
			setTimeout(function(){
				attentionVideo.pause();
			},50);
		}
	}
	previousTab.setAttribute('class','')
	currentTab.setAttribute('class','myself-active-nav')
});

// 导航栏点击事件
mui('.myself-center-bar').on('tap','span',function(){
	const targetSlider = mui(this)[0].getAttribute('href');
	const index = outerSwiper.activeIndex;
	switch(targetSlider){
		case 'slider1':{
			if(index === 2){
				outerSwiper.slideTo(0, 50, true);
			}else if(index === 1)(
				outerSwiper.slideTo(0, 130, true)
			)
		};break;
		case 'slider2':{
			if(index != 1){
				outerSwiper.slideTo(1, 130, true);
			}
		};break;
		case 'slider3':{
			if(index === 0){
				outerSwiper.slideTo(2, 50, true);
			}else if(index === 1)(
				outerSwiper.slideTo(2, 130, true)
			)
		};break;
	}
})

// 列表展开与收起
mui('.myself-bar').on('tap','.iconliebiao',function(){
	mui('.mui-off-canvas-wrap').offCanvas().show();
})

// 列表展开与收起
mui('.mui-inner-wrap').on('tap','.my-mask',function(){
	mui('.mui-off-canvas-wrap').offCanvas().close();
})
  