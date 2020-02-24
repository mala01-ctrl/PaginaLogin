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
            loadTableData(JSON.parse(data));
          }
      }
    };
    xhttp.open("GET", "../../backend/data.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
}

function loadTableData(data){
    const tableBody = document.getElementById("tableData");
    dataHTML = "";
    for (i = 0; i < data.length; i++)
    {
        dataHTML += "<tr><td>" + data[i].nome + "</td><td>" + data[i].cognome + 
        "</td><td>" + data[i].sesso +"</td><td>" + data[i].nazionalita + 
        "</td><td>" + data[i].patente + "</td><td>" + data[i].email + "</td></tr>";
    }
    tableBody.innerHTML = dataHTML;
}

function logout(){
    window.location.href = "../Login/login.html";
}

//Creare pulsante per il logout con cancellazione dei cookie

