var users = null;
IdloggedUser = localStorage.getItem("user");
console.log(IdloggedUser);
localStorage.clear();
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
        "</td><td>" + data[i].patente + "</td><td>" + data[i].email + 
        "</td> <td><button class='btn btn-primary' id=" + i + " onclick='updateRow(this.id)'>Modifica</button> </td>" +
        "<td><button class='btn btn-primary' id=" + i + " onclick='updateRow(this.id)'>Elimina</button> </td></tr>";
    }
    tableBody.innerHTML = dataHTML;
}

function updateRow(idUser){
    user = users[idUser];
    localStorage.setItem('objectToPass', JSON.stringify(user));
    window.location.href="../Registrazione/registrazione.html";
}

function logout(){
    window.location.href = "../Login/login.html";
}


