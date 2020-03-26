/**
 * Funzione login() che viene utilizzata quando l'utente inserisce 
 * le proprie credenziali nel form. Questa funzione esegue una richiesta 
 * POST al server nei quali sono presenti i file php per il login. Il
 * server risponderà con il numero 1 se l'autenticazione è andata a buon 
 * fine e si verrà indirizzati alla pagina dei dati. Altrimenti verrà visualizzato
 * un messaggio di errore
 */
function login() {
    //email inserita dall'utente
    var email = document.getElementById("email").value;

    //password inserita dall'utente
    var password = document.getElementById("password").value;

    //Oggetto della classe XMLHttpRequest per la richiesta al server
    var xhttp = new XMLHttpRequest();

    //Risposta da parte del server
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            data = this.responseText;
            if (data === "Admin"){
                window.location.href="../Home/home.html";
            }
            if (data === "User"){
                window.location.href="../UserPage/user.html";
            }
            if (this.responseText == 0)
            {
                //Visualizzazione messaggio di errore
                document.getElementById("messageBoxId").innerHTML="Invalid Credentials";
				        document.getElementById("messageBoxId").className="error-message";
            }
      }
    };

    //Invio della richiesta al server 
    xhttp.open("POST", "../../RestService/login.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("email=" + email + "&password=" + password);
  }