var apiKey= '5jhwgKDtDjl9Rwqz78koF0s3IaDXQ1X0';

var input = document.getElementById('buscar');
let btnBuscar = document.getElementById('btnBuscar');
let btnCerrar = document.getElementById('btnCerrar');
let contieneSug = document.getElementById('contieneSug');

btnCerrar.addEventListener('click', () => {
    input.value = "";
    contieneSug.innerHTML = "";
    btnCerrar.style.display = "none";
    btnBuscar.style.display = "inline-block";
});

btnBuscar.addEventListener('click', () => {
    buscar(input.value, 0);
    input.value = "";
});

input.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        contieneSug.innerHTML = "";
        buscar(input.value, 0);
        input.value = "";
    }
});

input.addEventListener('keydown', () => {
    btnBuscar.style.display = "none";
    btnCerrar.style.display = "inline-block";
});

window.addEventListener('click', (e) => {
    if (e.target != contieneSug || e.target != input || e.target != logo || e.target != logoD) {
        contieneSug.innerHTML = "";
        btnBuscar.style.display = "inline-block";
        btnCerrar.style.display = "none";
    }
})

input.addEventListener('keyup', sugerir);

function sugerir() {
    let inputValue = input.value.toLowerCase();
    if (inputValue != '' || inputValue > 1) {
        let url_sugerencias = `https://api.giphy.com/v1/tags/related/${inputValue}?api_key=${apiKey}`;
        fetch(url_sugerencias)
            .then(resp => {
                return resp.json()
            })
            .then(j => {
                let data = j.data;
                let ul = document.createElement('ul');
                let item = [];
                for (let x = 0; x < 5; x++) {
                    let names = data[x].name;
                    item.push(names);
                };
                for (let i = 0; i < item.length; i++) {
                    contieneSug.innerHTML = "";
                    var li = document.createElement('li');
                    var icono = document.createElement('div');
                    icono.classList.add('iconoSug');
                    icono.innerHTML = '<i class="fas fa-search"></i>';
                    li.classList.add('sugerencia');
                    li.setAttribute('onclick','buscar("'+item[i]+'",0)');
                    li.innerHTML = item[i];

                    icono.appendChild(li);
                    ul.appendChild(icono);

                }
                contieneSug.appendChild(ul);
                let lista = document.getElementsByClassName('sugerencia');
                for (let x = 0; x < lista.length; x++) {
                    lista[x].addEventListener('click', () => {
                        input.value = lista[x].innerHTML;
                        contieneSug.innerHTML = "";
                        btnCerrar.style.display = "none";
                        btnBuscar.style.display = "inline-block";
                    });
                }
            })
            .catch(err => console.log(err));
    } else {
        contieneSug.innerHTML = "";
    }
};

