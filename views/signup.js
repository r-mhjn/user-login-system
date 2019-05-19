function check() {
	var x = document.getElementById('usrname').value;
	var xhttp = new XMLHttpRequest();
	xhttp.open('POST', 'http://localhost:8080/ajaxcall', true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(`username=${x}`);
	xhttp.onreadystatechange = () => {
		document.getElementById('load').style.display = "none";
		if (xhttp.status === 200) {
			console.log(xhttp.responseText);
			document.getElementById('usrname-tick').style.display = "inline-block";
			if (xhttp.responseText === 'ok') {
				document.getElementById('usrname-tick').src = "tick.png";
				document.getElementById('usrname-tick').title = "username available";
			} else {
				document.getElementById('usrname-tick').src = "cross.png";
				document.getElementById('usrname-tick').title = "username taken";
			}
		}
	}
	document.getElementById('load').style.display = "inline-block";
}

function validate() {
	const form = document.forms['signup'];

	const name = form['name'].value;
	const username = form['username'].value;
	const pass = form['password'].value;
	const reppass = form['reppasswd'].value;

	console.log(name, username, pass, reppass);
	if (name.length < 5) {
		alert('Name should not be less than 5 characters!');
		return false;
	}
	if (username.length < 3) {
		alert('Username should not be less than 3 characters!');
		return false;
	}
	if (pass.length < 5) {
		alert('Password should not be less than 5 characters!');
		return false;
	}
	if (pass != reppass) {
		alert('passwords do not match!');
		return false;
	}

	return true;
}