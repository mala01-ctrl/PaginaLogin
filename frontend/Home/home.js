var users = null;
function getData(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          if (this.responseText === '0')
          {
              window.location.href = "../Login/login.html";
          }
          else
          {
            data = this.responseText;
            loadTableData(JSON.parse(data));
          }
      }
    };
    xhttp.open("GET", "../../RestService/Utente-Anagrafica/read.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}

function loadTableData(data){
    const tableBody = document.getElementById("tableData");
    dataHTML = "";
    users = data;
    for (i = 0; i < data.length; i++)
    {
        dataHTML += "<tr><td>" + data[i].nome + "</td><td>" + data[i].cognome + 
        "</td><td>" + data[i].sesso +"</td><td>" + data[i].nazionalita + 
        "</td><td>" + patenti(data[i]) + "</td><td>" + data[i].email + 
        "</td> <td><button class='btn btn-primary' id=" + i + " onclick='updateRow(this.id)'>Modifica</button> </td>" +
        "<td><button class='btn btn-primary' id=" + data[i].id + " onclick='deleteRow(this.id)'>Elimina</button> </td></tr>";
    }
    tableBody.innerHTML = dataHTML;
}

function patenti(data){
    patente = "";
    if (data.patente_A == true)
        patente += "A ";
    if (data.patente_B == true)
        patente += "B";
    return patente;
}

function deleteRow(id){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          data = JSON.parse(this.responseText);
          if (data.message === "Utente cancellato correttamente.")
            getData();
      }
    };
    xhttp.open("DELETE", "../../RestService/Utente-Anagrafica/delete.php", true);
    prova = JSON.stringify({"id" : id});
    xhttp.send(prova);
}

function logout(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          if (this.responseText === '1')
          {
              window.location.href = "../Login/login.html";
          }
      }
    };
    xhttp.open("GET", "../../RestService/logout.php", true);
    xhttp.send();
}


