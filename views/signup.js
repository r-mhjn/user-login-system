function check(){
	var x=document.getElementById('usrname').value;
	var xhttp=new XMLHttpRequest();
	xhttp.open('POST','http://localhost:8080/ajaxcall',true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(`usrname=${x}`);
	xhttp.onreadystatechange=()=>{
		document.getElementById('load').style.display="none";
		if(xhttp.status === 200){
			document.getElementById('usrname-tick').style.display="inline-block";
			if(xhttp.responseText==='ok'){
				document.getElementById('usrname-tick').src="tick.png";
			} else{
				document.getElementById('usrname-tick').src="cross.png";
			}
		}
	}
	document.getElementById('load').style.display="inline-block";
}
