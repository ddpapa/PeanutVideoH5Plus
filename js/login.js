mui.init();
// 发送验证码事件
var locks = true;
mui(document.body).on('tap','.code-btn',function(e) {
	if(locks){
		// 获取input中的手机号
		const telephone = document.getElementsByClassName("custom-input")[0];
		if(telephone.value === undefined || telephone.value === "" || telephone.value === null){
			mui.toast('请输入手机号！',{ duration:'short', type:'div' });
			return;
		}
		// 设置对话框失去焦点
		telephone.blur();
		// 持有锁
		locks = false;
		mui(this)[0].style.boxShadow = "0px 4px 15px rgba(0, 0, 0, .5)";
		let number = 59;
		let timer = setInterval(function(){
			mui(this)[0].innerHTML = number-- + " s";
		}.bind(this),1000);
		// 倒计时开始之后发送Ajax请求
		mui.ajax(baseURL+"coding/send",{
			data:{
				user:telephone.value,
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			xhrFields:{
			        withCredentials:true
			    },
			headers:{'Content-Type':'application/x-www-form-urlencoded'},	 
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				console.log(data)
				if(data.code === 200){
					mui.alert(data.msg,"您的验证码","确认",function(){
						mui.toast('60秒内有效',{ duration:'short', type:'div' });
					});
				}else{
					mui.toast('error！请联系ddpapa',{ duration:'long', type:'div' });
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				mui.toast(type+'！请联系ddpapa',{ duration:'long', type:'div' })
			}
		});
		// 60秒后重置状态
		setTimeout(function() {
			mui(this)[0].style.boxShadow = "0px 2px 0px rgba(66, 124, 65, 1), 0px 4px 15px rgba(0, 0, 0, .5)";
			clearInterval(timer);
			mui(this)[0].innerHTML = "获取";
			// 释放锁
			locks = true;
		}.bind(this), 60000);
	}
});

// 切换登录方式
mui(document.body).on('tap','.ways-text',function(e) {
	const code = document.getElementById("code");
	const pwd = document.getElementById("pwd");
	const text = mui(this)[0];
	const status = pwd.style.display;
	if(status == "none"){
		// 切换为密码登录，文字=>验证码登录
		// 清空输入框
		let val = pwd.getElementsByTagName("input")[0];
		console.log(val)
		if(val.value){
			val.value = "";
		}
		pwd.style.display = "block";
		code.style.display = "none";
		text.innerHTML = "验证码登录";
	}else{
		// 切换为验证码登录，文字=>密码登录
		// 清空输入框
		let val = code.getElementsByTagName("input")[0];
		if(val.value){
			val.value = "";
		}
		pwd.style.display = "none";
		code.style.display = "block";
		text.innerHTML = "密码登录";
	}
});


// 登录按钮触发事件
mui(document.body).on('tap', '.mui-btn', function(e) {
	const telephone = document.getElementsByClassName("custom-input")[0];
	if(telephone.value === undefined || telephone.value === "" || telephone.value === null){
		mui.toast('请输入手机号！',{ duration:'short', type:'div' });
		return;
	}
	const code = document.getElementById("code").getElementsByTagName("input")[0];
	const pwd = document.getElementById("pwd").getElementsByTagName("input")[0];
	// 判断登录方式
	const ways = document.getElementsByClassName("ways-text")[0].innerHTML === "密码登录" ? 0 : 1;
	if(ways === 0 && (code.value === undefined || code.value === null || code.value === "")){
		console.log(code)
		mui.toast('请输入验证码！',{ duration:'short', type:'div' });
		return;
	}
	if(ways === 1 && (pwd.value === undefined || pwd.value === null || pwd.value === "")){
		mui.toast('请输入密码！',{ duration:'short', type:'div' });
		return;
	}
	mui(this).button('loading');
	// 发送Ajax请求
	if(ways === 0){
		// 验证码登录
		mui.ajax(baseURL+"user/login/code",{
			data:{
				user:telephone.value,
				code:code.value,
			},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			xhrFields:{
					withCredentials:true
				},
			headers:{'Content-Type':'application/x-www-form-urlencoded'},	 
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				console.log(data)
				if(data.code === 200){
					mui.toast('登录成功'+data.data,{ duration:'5000', type:'div' })
					//跳转页面到首页
				}else if(data.code === 401){
					mui.toast(data.msg,{ duration:'long', type:'div' })
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				mui.toast(type+'！请联系ddpapa',{ duration:'long', type:'div' })
			}
		});
	}else{
		// 密码登录
		mui.ajax(baseURL+"user/login/password",{
			data:{
				user:telephone.value,
				pwd:pwd.value},
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			xhrFields:{
					withCredentials:true
				},
			headers:{'Content-Type':'application/x-www-form-urlencoded'},	 
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				console.log(data)
				if(data.code === 200){
					mui.toast('登录成功',{ duration:'5000', type:'div' })
					//跳转页面到首页
				}else{
					mui.toast(data.msg,{ duration:'long', type:'div' })
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				mui.toast(type+'！请联系ddpapa',{ duration:'long', type:'div' })
			}
		});
	}
	setTimeout(function() {
		mui(this).button('reset');
	}.bind(this), 1000);
});
