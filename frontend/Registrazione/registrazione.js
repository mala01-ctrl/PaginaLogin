function populateSelect() {
    var options = ["Italiano", "Francese", "Tedesco", "Inglese", "Spagnolo"];
    var select = document.getElementById("nazionalita");
    for (i = 0; i < options.length; i++) {
        option = document.createElement("option");
        option.text = options[i];
        select.add(option);
    }
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
    }
}

function controllaSesso() {
    if (document.getElementById('Maschile').checked) {
        return "M";
    }
    if (document.getElementById('Femminile').checked) {
        return "F";
    }
}

function controllaPatente() {
    if (document.getElementById("A").checked) {
        return "A";
    }
    if (document.getElementById("B").checked) {
        return "B";
    }
}

function getSelectedIndex() {
    nazionalita = document.getElementById("nazionalita");
    return nazionalita.options[nazionalita.selectedIndex].text;
}

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

function conferma(){
    cognome = document.getElementById("cognome").value;
    nome = document.getElementById("nome").value;
    sesso = controllaSesso();
    patente = controllaPatente();
    nazionalita = getSelectedIndex();
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    if (!ControlloCampiForm(nome, cognome, sesso, patente, nazionalita, email, password)){
        document.getElementById("errore").innerHTML = "Inserire credenziali";
        return;
    }
    var data = {
        'nome' : nome,
        'cognome' : cognome,
        'sesso' : sesso,
        'patente' : patente,
        'nazionalita' : nazionalita,
        'email' : email,
        'password' : password
    };
    localStorage.setItem('objectToPass', JSON.stringify(data));
    window.location.href="../Conferma/conferma.html";
}

function annulla(){
    window.location.href = "../Login/login.html";
}