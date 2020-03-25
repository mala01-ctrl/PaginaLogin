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
    xhttp.open("GET", "../../backend/data.php/users", true);
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
        "<td><button class='btn btn-primary' id=" + i + " onclick='updateRow(this.id)'>Elimina</button> </td></tr>";
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

function updateRow(idUser){
    user = users[idUser];
    localStorage.setItem('objectToPass', JSON.stringify(user));
    window.location.href="../Registrazione/registrazione.html";
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
    xhttp.open("GET", "../../backend/logout.php", true);
    xhttp.send();
}


