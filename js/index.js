mui.init();


mui.plusReady(function () {
   const statusHeight = plus.navigator.getStatusbarHeight();
   mui(".myself-bar")[0].style.top=statusHeight+"px";
   plus.navigator.setStatusBarStyle("light");
   mui('#location')[0].style.marginTop = 44+statusHeight+'px';
   mui('#attention')[0].style.marginTop = 44+statusHeight+'px';
})

var outerSwiper = new Swiper ('#outer-swiper', {
	initialSlide:2,	// 设定初始化索引，即第三个slider
    direction: 'horizontal', // 垂直切换选项
    resistanceRatio:0, // 边缘抵抗力为0
  });
    
outerSwiper.on('slideChangeTransitionEnd',function(){
	const currentVideo = mui('video')[innerSwiper.activeIndex];
	const previousTab = mui('.myself-center-bar>span')[this.previousIndex];
	const currentTab = mui('.myself-center-bar>span')[this.activeIndex];
	
	if(this.activeIndex === 2){
		plus.navigator.setStatusBarStyle("light");
		mui('.myself-bar')[0].style.color = '#eaeae8';
		previousTab.setAttribute('class','myself-nagetive-nav-white');
		currentTab.setAttribute('class','myself-active-nav myself-active-nav-white');
		currentVideo.play();
	}else{
		plus.navigator.setStatusBarStyle("dark");
		mui('.myself-bar')[0].style.color = 'black';
		previousTab.setAttribute('class','myself-nagetive-nav-black');
		currentTab.setAttribute('class','myself-active-nav myself-active-nav-black');
		if(!currentVideo.paused){
			currentVideo.pause();
		}
	}
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
  