/**
 * Funzione che fornisce i dati alla select. Questa in futuro potà essere
 * popolata da dati presenti sul database. Oltre a inserire i dati nella select 
 * questa funzione si occupa anche di controllare se nel localstorage del browser 
 * sono presenti dei dati. Questo perchè magari l'utente dopo essere stato nella 
 * pagina di conferma vuole cambiare un dato e in questo modo non deve inserire i dati 
 * di nuovo.
 */
function populateSelect() {
    //Opzioni per la select 
    var options = ["Italiano", "Francese", "Tedesco", "Inglese", "Spagnolo"];

    //Oggetto della select 
    var select = document.getElementById("nazionalita");

    for (i = 0; i < options.length; i++) {
        option = document.createElement("option");
        option.text = options[i];
        select.add(option);
    }

    //Dati prelevati dal localStorage convertiti dal formato JSON ad array di oggetti
    data = JSON.parse(localStorage.getItem('objectToPass'));
    if (data != null)
    {
        document.getElementById("nome").value = data.nome;
        document.getElementById("cognome").value = data.cognome;
        if (data.sesso === 'M')
            document.getElementById("Maschile").checked = true;
        else
            document.getElementById("Femminile").checked = true;
        if (data.patente === 'A')
            document.getElementById("A").checked = true;
        else
            document.getElementById("B").checked = true;
        document.getElementById("email").value = data.email;
        for (i = 0; i < options.length; i++)
        {
            if (data.nazionalita === options[i])
            {
                document.getElementById("nazionalita").selectedIndex = i;
                break;
            }
        }
        select = document.getElementById("ruolo");
        for (i = 0; i < select.length; i++)
        {
            if (data.ruolo === select.options[i].text)
            {
                document.getElementById("ruolo").selectedIndex = i;
                break;
            }
        }
    }
}

/**
 * Funzione che restituisce il genere inserito
 * dall'utente.
 */
function controllaSesso() {
    if (document.getElementById('Maschile').checked) {
        return "M";
    }
    if (document.getElementById('Femminile').checked) {
        return "F";
    }
}

/**
 * Funzione che restituisce la patente inserita
 * dall'utente.
 */
function controllaPatente() {
    if (document.getElementById("A").checked) {
        return "A";
    }
    if (document.getElementById("B").checked) {
        return "B";
    }
}

/**
 * Funzione che restituisce l'indice della nazionalità
 * inserita dall'utente.
 */
function getSelectedIndexNazionalita() {
    nazionalita = document.getElementById("nazionalita");
    return nazionalita.options[nazionalita.selectedIndex].text;
}

/**
 * Funzione che controlla che tutti i campi del form 
 * siano riempiti. In caso positivo restituisce true. Altrimenti
 * anche se solo un campo non è compilato restituisce false.
 * @param {*} nome nome inserito dall'utente 
 * @param {*} cognome cognome inserito dall'utente 
 * @param {*} sesso genere inserito dall'utente 
 * @param {*} patente patenete inserita dall'utente 
 * @param {*} nazionalita nazionalità inserita dall'utente
 * @param {*} email email inserita dall'utente
 * @param {*} password password inserita dall'utente 
 */
function ControlloCampiForm(nome, cognome, sesso, patente, nazionalita, email, password) {
    if (nome  === '')
        return false;
    if (cognome === '')
        return false;
    if (sesso === '')
        return false;
    if (patente === '')
        return false;
    if (nazionalita === '')
        return false;
    if (email === '')
        return false;
    if (password === '')
        return false;
    return true;
}

/**
 * Funzione che porta i dati inseriti dall'utente alla pagina di conferma.
 * Questa in caso di conferma salva i dati inseriti nel localStorage del browser
 * e li passa alla pagina di conferma, in modo tale da poterli modificare.
 */
function conferma(){
    //cognome inserito dall'utente
    cognome = document.getElementById("cognome").value;

    //nome inserito dall'utente
    nome = document.getElementById("nome").value;

    //sesso inserito dall'utente
    sesso = controllaSesso();

    //patente inserita dall'utente
    patente = controllaPatente();

    //nazionalita inserita dall'utente
    nazionalita = getSelectedIndexNazionalita();

    //email inserita dall'utente
    email = document.getElementById("email").value;

    //password inserita dall'utente
    password = document.getElementById("password").value;

    ruolo = getSelectedIndexRuolo();

    if (!ControlloCampiForm(nome, cognome, sesso, patente, nazionalita, email, password)){
        document.getElementById("errore").innerHTML = "Inserire credenziali";
        return;
    }
    //Dati convertiti in oggetto JSON 
    var data = {
        'nome' : nome,
        'cognome' : cognome,
        'sesso' : sesso,
        'patente' : patente,
        'nazionalita' : nazionalita,
        'email' : email,
        'password' : password,
        'ruolo' : ruolo
    };
    //Salvataggio dei dati nel localStorage del browser convertiti in una stringa JSON
    localStorage.setItem('objectToPass', JSON.stringify(data));

    //reindirizzamento alla pagina di conferma
    window.location.href="../Conferma/conferma.html";
}

/**
 * Funzione utilizzata per annullare la 
 * registrazione. Questa semplicemente reindirizza l'utente 
 * alla pagina di login.
 */
function annulla(){
    window.location.href = "../Login/login.html";
}

function getSelectedIndexRuolo(){
    ruolo = document.getElementById("ruolo");
    return ruolo.options[ruolo.selectedIndex].text;
}