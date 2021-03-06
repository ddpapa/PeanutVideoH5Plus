mui.init();

var data_interest = {
	videoList:[],		// 视频列表
	newVideoList:[],	// 新查询到的视频列表
	author:'',	//作者
	music:'',	//背景音乐
	praisednum:'',	//获赞数目
	commentnum:'',	//评论数目
	totalPage:1,	// 一共有几个页面
	page:1,		// 当前获取了第几页
}

var interestSwiper = new Swiper ('#interest-swiper', {
    direction: 'vertical', // 垂直切换选项
    resistanceRatio:0, // 边缘抵抗力为0
  });


interestSwiper.on('slideChangeTransitionEnd',function(){
	const currentVideo = mui('#interest-swiper video')[this.activeIndex];
	const prevVideo = mui('#interest-swiper video')[this.previousIndex];
	setTimeout(function(){
		prevVideo.pause();
		currentVideo.play();
	},50);
	if(this.activeIndex === this.slides.length-1 && data_interest.page++ < data_interest.totalPage){
		getInterestVideoList();
	}
});

interestSwiper.on('tap',function(){
	var currentVideo = mui('#interest-swiper video')[this.activeIndex];
	if(currentVideo.paused){
		// 如果视频处于暂停状态
		setTimeout(function(){
			currentVideo.play();
		},50);
	}else{
		setTimeout(function(){
			currentVideo.pause();
		},50);
	}
});


// 页面数据初始化
window.onload=(function(){
	getInterestVideoList();
})

function getInterestVideoList(){
	// 将异步代码同步执行：获去视频列表完成 => 自动播放第一个
	var getVideoListPromise = new Promise(function(resolve, reject){
		mui.ajax(baseURL+"video/showAll",{
			data:{
				page:data_interest.page,
			},
			dataType:'json',//服务器返回json格式数据
			type:'GET',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			xhrFields:{
			        withCredentials:true
			    },
			headers:{'Content-Type':'application/x-www-form-urlencoded'},	 
			success:function(result){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				if(result.code === 200){
					data_interest.newVideoList = result.rows;
					data_interest.totalPage = result.total;
					data_interest.videoList = data_interest.videoList.concat(result.rows);
					console.log(data_interest);
					resolve("success");
				}else{
					mui.toast('error！请联系ddpapa',{ duration:'long', type:'div' });
					reject("fail");
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				mui.toast(type+'！请联系ddpapa',{ duration:'long', type:'div' })
				reject("fail");
			}
		});
	})
	getVideoListPromise.then(function(){
		for(var i = 0; i < data_interest.newVideoList.length; i++){
			interestSwiper.appendSlide(
						'<div class="swiper-slide" style="height:100%">'+
							'<video class="swiper-video" loop="loop">'+
								'<source src="http://192.168.1.6/'+data_interest.newVideoList[i].videoUrl+'" type="video/mp4"></source>'+
								'Your browser does not support the video tag.'+
							'</video>'+
							'<div>'+
								'<div class="myself-left-info">'+
									'<div class="author-name">'+
										'<b>@<span>'+data_interest.newVideoList[i].nickname+'</span></b>'+
									'</div>'+
									'<div class="video-desc">'+data_interest.newVideoList[i].description+'</div>'+
									'<div class="video-bgm">'+
										'<span class="iconfont iconyinle"></span>&nbsp;'+'呆呆papa的原声作品'+
									'</div>'+
								'</div>'+
								'<div class="myself-right-btn">'+
									'<div class="author-avatar">'+
										'<img src="http://192.168.1.6/'+data_interest.newVideoList[i].uprofile+'" />'+
										'<div></div>'+
									'</div>'+
									'<div class="user-action">'+
										'<span class="iconfont iconshoucang"></span>'+
										'<span>点赞</span>'+
									'</div>'+
									'<div class="user-action">'+
										'<span class="iconfont iconpinglun"></span>'+
										'<span>评论</span>'+
									'</div>'+
									'<div class="user-action">'+
										'<span class="iconfont iconfenxiang"></span>'+
										'<span>分享</span>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>'
							);
		};
		data_interest.newVideoList = [];
		console.log(data_interest.videoList)
		if(data_interest.page === 1 && data_interest.videoList.length != 0){
			// mui('video')[0].play();
		}
	});
}