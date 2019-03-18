function check(){
	var x=document.getElementById('usrname').value;
	var xhttp=new XMLHttpRequest();
	xhttp.open('POST','http://localhost:8080/ajaxcall',true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(`usrname=${x}`);
	xhttp.onreadystatechange=()=>{
		if(xhttp.status === 200){
			if(xhttp.responseText==='ok'){
				document.getElementById('usrname-tick').style.display="inline-block";
				document.getElementById('usrname-cross').style.display="none";
			}
			else{
				document.getElementById('usrname-tick').style.display="none";
				document.getElementById('usrname-cross').style.display="inline-block";
		}
	}
	}
	console.log('fetching');
}
