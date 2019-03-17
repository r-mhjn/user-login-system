function check(){
	var x=document.getElementById('usrname').value;
	var xhttp=new XMLHttpRequest();
	xhttp.open('POST','http://localhost:8080/ajaxcall',true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(`usrname=${x}`);
	xhttp.onreadystatechange=()=>{
		if(xhttp.status === 200){
			//console.log(xhttp.responseText);
			if(xhttp.responseText==='ok'){
				document.getElementById('usrname-tick').style.display="block";
			}
		}else{
			console.log('no');
		}
	}
	console.log('fetching');
}
