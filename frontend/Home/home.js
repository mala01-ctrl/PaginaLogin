function getData(){
    var xhttp = new XMLHttpRequest();
    var data = null;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          if (this.responseText === '0')
          {
              window.location.href = "../Login/login.html";
          }
          else
          {
            data = this.responseText;
            createTable(data);
          }
      }
    };
    xhttp.open("GET", "../../backend/data.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}

function createTable(dati){
    data = JSON.parse(dati);
    document.write("<table border='1' width='200'>")
    document.write("<tr><th>Nome</th><th>Cognome</th><th>Sesso</th>" +
    "<th>nazionalita'</th><th>patente</th><th>email</th></tr>");
    for (i = 0; i < data.length; i++)
    {
        document.write("<tr><td>" + data[i].nome + "</td><td>" + data[i].cognome + 
        "</td><td>" + data[i].sesso +"</td><td>" + data[i].nazionalita + 
        "</td><td>" + data[i].patente + "</td><td>" + data[i].email + "</td></tr>");
    }
}

//Sistemare la tabella dinamica e creare pulsante per il logout con cancellazione dei cookie

