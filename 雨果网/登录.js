var email = document.getElementById("email"),
	paw = document.getElementById("password");
 email.onfocus = function(){
 	email.style.background = "white";
 }
 paw.onfocus = function(){
 	paw.style.background = "white";
 }
  email.onblur = function(){
 	email.style.background = "#f3f4f4";
 }
 paw.onblur = function(){
 	paw.style.background = "#f3f4f4";
 }