let modo = document.getElementById("modo");
let body = document.getElementsByTagName('body')[0];
let imgLogo = document.getElementById("logo");
let logoD = document.getElementById("logoD");
let camaraCrea = document.getElementById("camara");

let tema = localStorage.getItem('modo');
    if (tema == "nocturno") {
        cambiarModo();
    }

modo.addEventListener("click", cambiarModo);

function cambiarModo() {
    if (body.className != 'modoNocturno') {
        body.classList.toggle('modoNocturno');
        modo.innerHTML = 'Modo diurno';
        localStorage.setItem('modo', 'nocturno');
        imgLogo.src = "assets/logo-mobile-modo-noct.svg";
        logoD.src = "assets/Logo-modo-noc.svg";
    } else {
        body.classList.toggle('modoNocturno');
        modo.innerHTML = "Modo nocturno";
        localStorage.setItem('modo', 'diurno');
        imgLogo.src = "assets/logo-mobile.svg";
        logoD.src ="assets/logo-edit.svg";
    }
}

