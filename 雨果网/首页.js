var oul = $id("ul"),
	olist = $id("ul").children,
	prev = $id("prev"),
	next = $id("next");
var wid = $id("lunbo").offsetWidth;
var index = 1;	
var time = null;
var flag = true;
function show(){
//	oul.style.left = -wid*index+"px";
	startMove(oul,{left:-wid*index},function(){
		flag = true;
});
	
}
time = setInterval(function(){
	index++;
	if(index==olist.length-1){
		index = 0;
		oul.style.left = 0;
	}
	show();
},3000);
prev.onclick = function(){
	if(flag){
		clearInterval(time);
		index--;
		if(index==0){
			index = olist.length-1;
			oul.style.left = -wid*index+"px";
		}
		show();
		flag = false;
	}
	
}
next.onclick = function(){
	if(flag){
		clearInterval(time);
		index++;
		if(index==olist.length-1){
			index = 0;
			oul.style.left = 0;
		}
		show();
		flag = false;
		
	}
	
}

//小轮播图全球优品
var xiaolunbo = document.querySelectorAll(".xlb ul");
//console.log(xiaolunbo)
var xiaolunlist = document.querySelectorAll(".xlb #xiaolunbo li");
var xlb = document.querySelector(".xlb");
var xlbheight = xlb.offsetHeight;
//console.log(xlbheight)
var xiaoindex =[
				{"index":0},
				{"index":0},
				{"index":0}
]
for(let i=0 ; i<xiaolunbo.length ; i++){
	setInterval(function(){
//		console.log(xiaoindex[i].index)
		xiaoindex[i].index++;
		if(xiaoindex[i].index==xiaolunlist.length){
			xiaoindex[i].index = 0;
			xiaolunbo[i].style.top = 0;
		}
		//	xiaolunbo.style.top = -xlbheight*xiaoindex +"px";
		startMove(xiaolunbo[i],{top:-xlbheight*xiaoindex[i].index});
	},2000)

}

/*var xiaolunbo = document.querySelectorAll(".xlb ul");
for(var i = 0 ; i < xiaolunbo.length ; i ++){
	autoplay(xiaolunbo[i]);
	console.log(xiaolunbo[i]);
}
function autoplay(obj){
	var index = 0;
	var timer = setInterval(function(){
		index ++;
		console.log(obj.children.length);
		if(index == obj.children.length){
			index = 0;
			obj.style.top = 0;
		}
		startMove(obj,{top:-52*index});
	},2000)
}*/



function startMove( obj , json , callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;
		for(var attr in json){
			var current = 0;
			if( attr == "opacity"){
				current = getStyle( obj ,attr)*100;
			}else{
				current = parseInt(getStyle( obj , attr));
			}
			var speed = (json[attr] - current)/10;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			if(current != json[attr]){
				flag = false;
			}
			if( attr == "opacity"){
				obj.style[attr] = (current + speed)/100;
			}else{
				obj.style[attr] = current + speed +"px";
			}
		}	
		if(flag){
			clearInterval(obj.timer);
			if(callback){
				callback();
				}
		}
	},30)
}
//运动函数
function getStyle( obj , attr){
	return window.getComputedStyle ? window.getComputedStyle(obj)[attr] : obj.CurrentStyle[attr];
}
function $id(id){
	return document.getElementById(id);
}


//注册
//$id("register").onclick = function(){
//	location.href = "注册.html";
//}
//登录
//$id("login").onclick = function(){
//	location.href = "登录.html";
//}
