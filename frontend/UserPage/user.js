//Opzioni per la select 
var options = ["Italiano", "Francese", "Tedesco", "Inglese", "Spagnolo"];

function getData(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText === '0')
                window.location.href = "../Login/login.html";
            else
            {
                data = JSON.parse(this.responseText);
                benvenuto(data.nome);
                populateSelect();
                getValueInTemplate(data);
            }
        }
    };
    xhttp.open("GET", "../../backend/data.php/user", true);
    xhttp.send();
}

function populateSelect(){
    //Oggetto della select 
    var select = document.getElementById("nazionalita");
        
    for (i = 0; i < options.length; i++) {
        option = document.createElement("option");
        option.text = options[i];
        select.add(option);
    }
}

function getValueInTemplate(data){
    document.getElementById("cognome").value = data.cognome;
    document.getElementById("nome").value = data.nome;
    if (data.sesso === 'M')
        document.getElementById("Maschile").checked = true;
    else
        document.getElementById("Femminile").checked = true;
    for (i = 0; i < options.length; i++)
    {
        if (data.nazionalita === options[i])
        {
            document.getElementById("nazionalita").selectedIndex = i;
            break;
        }
    }
    if (data.patente_A == true)
        document.getElementById("A").checked = true;
    if (data.patente_B == true)
        document.getElementById("B").checked = true;
}

function benvenuto(nome){
    document.getElementById("benvenuto").innerHTML = "Benvenuto " + nome;
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