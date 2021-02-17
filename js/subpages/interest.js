mui.init();

var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical', // 垂直切换选项
    resistanceRatio:0, // 边缘抵抗力为0
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    }
  });


mySwiper.on('slideChangeTransitionEnd',function(){
	const currentVideo = mui('video')[this.activeIndex];
	const prevVideo = mui('video')[this.previousIndex];
	currentVideo.play();
	prevVideo.pause();
});

mySwiper.on('tap',function(){
	var currentVideo = mui('video')[this.activeIndex];
	if(currentVideo.paused){
		// 如果视频处于暂停状态
		currentVideo.play();
	}else{
		currentVideo.pause();
	}
});