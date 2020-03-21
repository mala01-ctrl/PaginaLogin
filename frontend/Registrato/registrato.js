/**
 * Funzione che visualizza l'esito della registrazione 
 * tramite i dati del localStorage.
 */
function esitoRegistrazione(){
    //Esito della registrazione
    data = localStorage.getItem('esito');

    if (data == 1)
        document.getElementById('esito').innerHTML = 'Dati correttamente registrati';
    if (data == 0)
        document.getElementById('esito').innerHTML = 'Utente già registrato'
    localStorage.clear();
}

/**
 * Redirect alla pagina di login
 */
function redirectToLogin(){
    window.location.href = "../Login/login.html";
}