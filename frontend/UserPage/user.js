

function getData(){
    IdloggedUser = localStorage.getItem("user");
    console.log(IdloggedUser);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(this.responseText);
            console.log(data.id);
        }
    };
    xhttp.open("GET", "../../backend/data.php/user", true);
    xhttp.send();
}