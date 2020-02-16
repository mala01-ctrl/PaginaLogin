function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == 1){
                window.location.href="../Home/home.html";
            }
            if (this.responseText == 0)
            {
                document.getElementById("messageBoxId").innerHTML="Invalid Credentials";
				document.getElementById("messageBoxId").className="error-message";
            }
      }
    };
    xhttp.open("POST", "../../backend/login.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("email=" + email + "&password=" + password);
  }