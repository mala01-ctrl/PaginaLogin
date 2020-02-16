function getData(){
    data = JSON.parse(localStorage.getItem('objectToPass'));
    document.getElementById('nome').innerHTML = data.nome;
    document.getElementById('cognome').innerHTML = data.cognome;
    if (data.sesso === 'M')
        document.getElementById('sesso').innerHTML = "Maschile";
    else
    document.getElementById('sesso').innerHTML = "Femminile";
    document.getElementById('nazionalita').innerHTML = data.nazionalita;
    if (data.patente === 'A')
        document.getElementById('patente').innerHTML = "Categ.A";
    else
        document.getElementById('patente').innerHTML = "Categ.B";
    document.getElementById('email').innerHTML = data.email;
}

function getBack(){
    window.location.href = "../Registrazione/registrazione.html";
}

function registra(){
    data = localStorage.getItem('objectToPass');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == 0)
                localStorage.setItem('esito', 0);
            else
                localStorage.setItem('esito', 1);
            window.location.href = "../Registrato/registrato.html";
        }
    };
    xhttp.open("POST", "../../backend/registrazione.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
    localStorage.clear();
}