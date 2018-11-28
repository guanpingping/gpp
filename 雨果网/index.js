var obox_nav = document.getElementsByClassName("obox_nav")[0];
var h = obox_nav.offsetTop;
var art_con = document.querySelector(".art_con");
var wHeight = window.innerHeight;
var pageindex = 1;//表示页码
//返回顶部
var retu = document.querySelector(".side .retu");
var loadflag = true;
var total = 0;
window.onscroll = function(){
	var stop = document.documentElement.scrollTop||document.body.scrollTop;
	var minHeight = 12*pageindex*art_con.offsetHeight;
	if( stop > h ){
		obox_nav.style.position = "fixed";
		obox_nav.style.boxShadow = "0 2px 5px #ebeced";
		obox_nav.style.top = 0;
		obox_nav.style.zIndex = 99;
		retu.style.display = "block";
	}else if( stop <= h ){
		obox_nav.style.position = "static";
		retu.style.display = "none";
	}
	if(loadflag){
		if( wHeight + stop > minHeight){
			pageindex++;
			if(pageindex >= 2){
				pageindex = 2;
				loadflag = false;
			}
		}
	}
}
//头部小火箭返回
retu.onclick = function(){
	var timer = null;
	timer = setInterval( function(){
		document.documentElement.scrollTop /=2;
		if(document.documentElement.scrollTop <= 0){
			document.documentElement.scrollTop=0;
			clearInterval(timer);
		}
	},30)
//	document.documentElement.scrollTop=0;
//	document.body.scrollTop = 0;
}
//头条类选项卡功能
var boxlist=$id("obox_s").children;
var onav = $id("onav");
var base = document.getElementsByClassName("base")[0];
var load_more = document.querySelector("section .obox .load_more");
var no_more = document.querySelector("section .obox .no_more");
for(let i=0 ; i<boxlist.length ; i++){
	boxlist[i].onmouseover = function(){
		/*if(this.getAttribute("data_key")){
			return;
		}else{
			
			var cloneart = article.cloneNode(true);
			console.log(cloneart)
			onav.appendChild(cloneart);
		}*/
		//返回到头类选项卡的位置
		document.documentElement.scrollTop = h;
		loadflag = true;
		pageindex = 1;
		no_more.style.display = "none";
		load_more.style.display = "block";
		boxlist[i].children[0].style.color = "#FE6D00";
		var data_key = boxlist[i].getAttribute("data_key");
		var article = document.getElementsByClassName("article");
		/*var flag = true;
		for(var j = 0; j <article.length; j++){
			var data_tag = article[j].getAttribute("data_tag");
			if(data_key == data_tag){
				article[j].style.display = "block";
				flag=false;
			}else{
				article[j].style.display = "none";
			}
		}*/
		/*if(flag){
				
	}*/
	
	setTimeout(function(){
		for(var j = 0 ; j < boxlist.length ; j++){
			boxlist[j].children[0].className = "";
			boxlist[j].children[1].className = "";
			boxlist[j].children[0].style.color = "#666";
		}
		boxlist[i].children[0].className = "fontbold";
		boxlist[i].children[1].className = "xiahua";
		var pageNum = 12;//每页显示的数据量
		showData(pageindex,pageNum,data_key);
	},300)
	load_more.onclick = function(){
		if(pageindex>=total){
			pageindex = total;
			no_more.style.display = "block";
			load_more.style.display = "none";
		}
		pageindex++;
		var pageNum = 12;//每页显示的数据量
		showData(pageindex,pageNum,data_key);
	}
	
}
//	console.log(pageindex);
function showData(index,pageNum,data_key){
	var url = "http://127.0.0.1/yuguowang/index.php";
				var data = `table=${data_key}`;
				ajaxGet(url,function(msg){
					/*for(var j = 0 ; j < boxlist.length ; j++){
						console.log(boxlist[j].data_key);
						if(boxlist[j].data_key == data_key){
							boxlist[j].move = "";
							boxlist[j].children[0].style.color = "#666";
						}
					}*/
//					console.log(JSON.parse(msg));
					var arr = JSON.parse(msg);//JSON.parse把字符串转成json对象
//					console.log(arr.length)	
					var str = "";
					total = arr.length/pageNum;
//					if(index>=total){
//						index = total;
//					}
					for(var i=0 ; i<index*pageNum ;i++){
						if( i < arr.length ){
								var item = arr[i];
		//						console.log(item.h6f);
								if(item.h6f){
									str +=`
									    <div class="art_con">
											<div class="img">
												<img src="image/${item.img}.jpg" />
											</div>
											<div class="info">
												<h3><a href="#">${item.h3}</a></h3>
												<p>${item.p}</p>
												<div class="info_b">
													<div class="info_user1">
														<span><img src="image/toutiaoicon1.png"/></span>
														<h6><a href="#">${item.h6f}</a></h6>
													</div>
													<div class="info_user2">
														<span><img src="image/toutiaoicon5.jpg"/></span>
														<h6><a href="#">${item.h6s}</a></h6>
													</div>
													<div class="info_user3">
														<span><img src="image/toutiaoicon4.jpg"/></span>
														<h6>${item.h6t}</h6>
													</div>
												</div>
											</div>
										</div>
									  `;
								}else{
									str +=`
									    <div class="art_con">
											<div class="img">
												<img src="image/${item.img}.jpg" />
											</div>
											<div class="info">
												<h3><a href="#">${item.h3}</a></h3>
												<p>${item.p}</p>
											</div>
										</div>
									  `;
								}
								
							}
							base.innerHTML = str;
							base.setAttribute("data_tag",data_key);
		//					console.log(base)
						}
						
				},data);
				/*var cloneart = article[0].cloneNode(true);
				cloneart.setAttribute("data_tag",data_key);
				cloneart.style.display = "block";
				onav.appendChild(cloneart);*/
		}
}
//线上课程选项卡显示隐藏
	var ulist = document.querySelectorAll(".right .kecheng ul");
	var title = document.querySelectorAll(".right .kecheng .title .title_con");
	var kc = document.querySelector(".right .kecheng .kc_con").children;
	var lilist = document.querySelectorAll("#xs li");
	xuanxiang(ulist[0].children);
	for(var z = 0 ; z<title.length ;z++){
		title[z].index = z;
		title[z].onclick = function(){
			for(var j = 0 ; j<title.length ;j++){
				title[j].className = "title_con";
				kc[j].style.display = "none";
			}
			this.className = "title_con xhua";
			kc[this.index].style.display = "block";
			xuanxiang(ulist[this.index].children);
			
		}
	}
	var xsmover = document.querySelectorAll(".right .kecheng .kc_con #xs li");
	console.log( xsmover);
	xuanxiang(xsmover);
	function xuanxiang(obj){
		for(let i=0 ; i<obj.length ;i++){
			obj[i].onmouseover = function(){
				for(var j=0 ; j<obj.length ;j++){
					obj[j].children[1].style.display = "none";
					obj[j].children[2].style.display = "none";
					obj[j].children[0].children[0].className = "tit";
				}
				obj[i].children[1].style.display = "block";
				obj[i].children[2].style.display = "block";
				obj[i].children[0].children[0].className = "tit tit_bold";
			}
		}
	}

//ajax返回函数
function ajaxGet(url,callback,data){
	//第一步创建ajax对象
	var ajax = null;
	var result = 0;
	if( window.XMLHttpRequest ){
		ajax = new XMLHttpRequest();
	}else{
		ajax = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if( data ){
		url = url + "?" + data;
	}
	//建立和服务的连接
	ajax.open("get",url);
	//向服务器发送数据
	ajax.send();
	//获取服务器返回的结果   onreadystatechange状态改变事件
	ajax.onreadystatechange = function(){
		if( ajax.readyState == 4 && ajax.status == 200 ){
			// ajax.responseText;//服务器返回的结果到客户端     客户端对于 ajax.responseText处理是可变的 
			//通过回调函数的调用  将服务器处理的结果返回到客户端上
			callback( ajax.responseText );
		}
	}
}


function $id(id){
	return document.getElementById(id);
}
function create(sss){
	return document.createElement(sss);
}



//侧边栏
var sidelist = document.querySelectorAll(".side .item");
function cblclear(){
	for(var j = 0; j<sidelist.length ; j++){
			sidelist[j].style.background =" #fff";
			sidelist[j].children[0].style.display = "block";
			sidelist[j].children[1].style.display = "none";
		}
}
for(let i = 0; i<sidelist.length ;i++){
	sidelist[i].onmouseover = function(){
		 cblclear();
		sidelist[i].style.background =" #FE6D00";
		sidelist[i].children[0].style.display = "none";
		sidelist[i].children[1].style.display = "block";
	}
	sidelist[i].onmouseout = function(){
		 cblclear();
	}
}
var baoliao = document.querySelector(".side .baoliao");
var mask = document.querySelector(".mask");
 baoliao.onclick = function(){	
 	$id("wybl").style.display = "block";
 	mask.style.display = "block";
 }
 $id("close").onclick = function(){	
 	$id("wybl").style.display = "none";
 	mask.style.display = "none";
 }
 
$id("btn").onclick = function(){
	if(emailflag&&baoflag){
		$id("close").onclick();
		alert("提交成功");
	}else{
		alert("提交不成功");
	}
}
//使用失去焦点事件完成表单验证  每一项验证失去焦点时都可以即时验证
//验证邮箱
var emailflag = null;
$id("username").onblur = function(){
	var str = $id("username").value;
	var reg1 = /^1[3578]\d{9}$/;
//	var reg2 = /^.+@.+$/;
	//验证邮箱的正则
	var reg2 = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
	if(reg1.test(str)||reg2.test(str)){
		emailflag = true;
	}else{
		emailflag = false;
		alert("请输入正确的邮箱或手机号");
	}
}
//验证爆料内容
var baoflag = null;
$id("usercon").onblur = function(){
	var str = $id("usercon").value;
	if(str){
		baoflag = true;
	}else{
		baoflag = false;
		alert("请输入爆料内容");
	}
}
