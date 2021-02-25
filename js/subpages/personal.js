var mySwiper = new Swiper('.swiper-container', {
	initialSlide:0,
})

mySwiper.on('slideChangeTransitionEnd',function(){
	const previousTab = mui('.me-nav>div')[this.previousIndex];
	const currentTab = mui('.me-nav>div')[this.activeIndex];
	previousTab.setAttribute('class','');
	currentTab.setAttribute('class','active-nav');
});

mui('.me-nav').on('tap','div',function(){
	const targetSlider = mui(this)[0].innerHTML;
	switch(targetSlider){
		case '作品':{
			mySwiper.slideTo(0, 50, true);
		};break;
		case '私密':{
			mySwiper.slideTo(1, 50, true);
		};break;
		case '喜欢':{
			mySwiper.slideTo(2, 50, true);
		};break;
		case '动态':{
			mySwiper.slideTo(3, 50, true);
		};break;
	}
})