/**
 * Funzione che preleva i dati dal localStorage del browser 
 * e li inserisce in un array di oggetti. Dopodichè li inserisce 
 * nella pagina HTML di conferma.
 */
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

/**
 * Funzione che permette di tornare alla 
 * pagina di registrazione per modificare i dati.
 */
function getBack(){
    window.location.href = "../Registrazione/registrazione.html";
}

/**
 * Funzione utilizzata per registrare i dati nel database. Questa 
 * invia una richiesta POST al server con i dati inseriti dall'utente 
 * nel formato JSON. Il server risponderà positivamente se avrà inserito 
 * i dati nel db correttamente, o negativamente in caso di errore. L'esito
 * della registrazione verrà salvato nel localStorage del browser e si verrà 
 * reindirizzati nella pagina registrato, dove l'utente visualizzerà l'esito 
 * della registrazione.
 */
function registra(){
    //Dati da inviare al server
    data = localStorage.getItem('objectToPass');

    //Oggetto utilizzato per la richiesta al server 
    var xhttp = new XMLHttpRequest();

    //Risposta del server 
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == 0)
                localStorage.setItem('esito', 0);
            else
                localStorage.setItem('esito', 1);
            window.location.href = "../Registrato/registrato.html";
        }
    };

    //Richiesta al server
    xhttp.open("POST", "../../backend/registrazione.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
    localStorage.clear();
}