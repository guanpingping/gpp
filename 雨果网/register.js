var form = document.getElementsByTagName("form");
form[0].onsubmit = function(){
	if(flagName && flagtel && flagpwd &&yzmflag ){
		return true;
	}
	return false;
}
//验证用户名
var flagName = null;
$id("username").onblur = function(){
	var str = this.value;
	var reg = /^[\u4e00-\u9f5a_0-9a-z]+$/i;
	if(reg.test(str)){
		$id("errorname").style.display = "none";
		flagName = true;
	}else{
		$id("errorname").style.display = "block";
		$id("errorname").innerHTML="用户名格式不正确";
		flagName = false;
	}
}
//验证手机号
var flagtel = null;
$id("tel").onblur = function(){
	var str = this.value;
	var reg = /^1[3456789]\d{9}$/;
	if(reg.test(str)){
		$id("errortel").style.display = "none";
		flagtel = true;
	}else{
		$id("errortel").style.display = "block";
		$id("errortel").innerHTML="手机号格式不正确";
		flagtel = false;
	}
}
//验证密码
var flagpwd = null;
$id("pwd").onblur = function(){
	var str = this.value;
	var reg = /^.{6,20}$/;
	if(reg.test(str)){
		$id("errorpwd").style.display = "none";
		flagpwd = true;
	}else{
		$id("errorpwd").style.display = "block";
		$id("errorpwd").innerHTML="密码格式不正确";
		flagpwd = false;
	}
}
//图片验证码
/*功能：输入的验证码必须和右边的相同，  点击验证码可以实现验证码的切换
	 		验证码由字母  数字组成*/
/*
	 思路 ： 
	 在48--122之间 随机获取一个验证码   如果满足字母 或 数字  就将这个验证码转成对应的字符  拼接起来
 */
var yzmimg = document.querySelector(".group .yzm");
function yzm(){
	var str = "";//用来拼接验证码
	for(var i=1 ;i<=4 ;i++){
		var code = rand(48,122);
		if((code>=58&&code<=80) || (code>=91&&code<=96)){
			i--;
		}else{
			str += `<span>
						${String.fromCharCode( code )}
					</span>`;
		}
	}
	return str;
}
function showyzm(){
	yzmimg.innerHTML = yzm();
	var yzmspan = document.querySelector(".group .yzm").children;
	for(var j = 0 ; j < yzmspan.length ; j++){
		yzmspan[j].style.color = getColor();
	}
}
window.onload = function(){
	showyzm();
}
yzmimg.onclick = function(){
	showyzm();
}
//验证验证码
var yzmtext = document.querySelector(".group .img");
var yzmerror = document.querySelector(".group .yzmerror")
var yzmflag = null;
yzmtext.onblur = function(){
	var str = yzmtext.value;
	var str1 = "";
	for(var i=0 ; i < yzmimg.children.length ; i++){
		str1 += yzmimg.children[i].innerHTML;
	}
	str1 = str1.replace(/\s+/g,"");
//	console.log(str1)
//	console.log(str)
	//toLowerCase 方法返回一个字符串，该字符串中的字母被转换为小写字母
	if(str.toLowerCase()==str1.toLowerCase()){
		yzmflag = true;
		yzmerror.style.display = "none";
	}else{
		yzmflag = false;
		yzmerror.style.display = "block";
		yzmerror.innerHTML = "验证码不正确";
	}
}

//取消页面可以选中文字的功能
document.onselectstart = function(){
	return false;
}
function rand(min,max){
	return Math.round(Math.random()*(max-min)+min);
}
function getColor(){
	return `rgb( ${rand(0,255)},${rand(0,255)},${rand(0,255)})`;
}
function $id(id){
	return document.getElementById(id);
}

//用js控制伪类before

/*var css = function(t,s){
	s = document.createElement('style');
	s.innerText = t;
	document.body.appendChild(s);
}
var proflag = true;
$id("protocol").onclick = function(){
	if(proflag){
		css('label::before{background: url(image/checkbox-checked.png) no-repeat center center;background-color: #FE6D00;}');
	}else{
		css('label::before{background:0;}');
	}
	proflag = !proflag;
}*/
var proflag = true;
$id("protocol").onclick = function(){
	if(proflag){
		$id("protocol").className="clickback";
	}else{
		$id("protocol").className="";
	}
    proflag = !proflag;
}
