function esitoRegistrazione(){
    data = localStorage.getItem('esito');
    if (data == 1)
        document.getElementById('esito').innerHTML = 'Dati correttamente registrati';
    if (data == 0)
        document.getElementById('esito').innerHTML = 'Utente già registrato'
    localStorage.clear();
}

function redirectToLogin(){
    window.location.href = "../Login/login.html";
}