document.querySelector('.mui-off-canvas-wrap').addEventListener('shown',function (event) {
	mui('.my-mask')[0].style.display="block";
})
document.querySelector('.mui-off-canvas-wrap').addEventListener('hidden',function (event) {
	mui('.my-mask')[0].style.display="none";
})