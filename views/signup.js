function check(){
	var x=document.getElementById('usrname').value;
	var xhttp=new XMLHttpRequest();
	xhttp.open('POST','http://localhost:8080/ajaxcall',true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(`username=${x}`);
	xhttp.onreadystatechange=()=>{
		document.getElementById('load').style.display="none";
		if(xhttp.status === 200){
			console.log(xhttp.responseText);
			document.getElementById('usrname-tick').style.display="inline-block";
			if(xhttp.responseText==='ok'){
				document.getElementById('usrname-tick').src="tick.png";
				document.getElementById('usrname-tick').title="username available";
			} else{
				document.getElementById('usrname-tick').src="cross.png";
				document.getElementById('usrname-tick').title="username taken";
			}
		}
	}
	document.getElementById('load').style.display="inline-block";
}

//TODO: validate form then submit;