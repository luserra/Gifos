var guardarFav = JSON.parse(localStorage.getItem("ids"));
var contieneFavs = document.getElementById("contieneFavs");
var x = document.getElementById("heartfav2");
var mainFG = document.getElementById("mainFG");
var tituloFav = document.getElementById("tituloFG"); 
var like = document.getElementById("like");
var iconVacio = document.getElementById("iconVacio");
var tituloVacio = document.getElementById("tituloVacio");


if (guardarFav != null && guardarFav != "") {
    if (tituloVacio != null) {
        tituloVacio.style.display = "none";
        iconVacio.style.display = "none"
        tituloFav.style.display = "block";
        like.style.display = "unset";
        mostrarFavs(guardarFav, 0)
    }
}

function favoritos(valor, id) {
    cambiarLike(valor, id);
    agregarId(id);
}

function agregarId(numero) {
    let ids = localStorage.getItem('ids');
    if (ids == null) {
        ids = [];
    } else {
        ids = JSON.parse(ids);
    }
    var searchid = ids.includes(numero);
    if (searchid) {
        const index = ids.indexOf(numero);
        if (index > -1) {
            ids.splice(index, 1);
        }
    } else {
         ids.push(numero);
    }
    localStorage.setItem('ids', JSON.stringify(ids));
    
    if (ids != null && ids != "") {
        if (tituloVacio != null) {
            tituloVacio.style.display = "none";
            iconVacio.style.display = "none"
            tituloFav.style.display = "block";
            like.style.display = "unset";
            mostrarFavs(ids, 0);
            
        }
    }
    else {
        if (tituloVacio != null) {
            tituloVacio.style.display = "block";
            iconVacio.style.display = "unset"
            tituloFav.style.display = "block";
            like.style.display = "unset";
            contieneFavs.innerHTML = "";
        }
    }
}

function cambiarLike(contador, id) {
    var x = document.getElementById("heartfav" + contador);
    var y = document.getElementById("heartfavcarrusel" + contador);
    let ids = localStorage.getItem('ids');
    ids = JSON.parse(ids);


    if (ids != null) {
        var searchid = ids.includes(id);
        if (searchid) {
            if (x != null) {
                x.classList.remove("activeFav");
                if (y != null) {
                    y.classList.remove("activeFav");
                }
            }
            else {
                y.classList.remove("activeFav");
            }
        }
        else {
            if (x != null) {
                x.classList.add("activeFav");
                if (y != null) {
                    y.classList.add("activeFav");
                }
            }
            else {
                y.classList.add("activeFav");
            }
        }
    }
    else {
        if (x != null) {

            x.classList.add("activeFav");
            if (y != null) {
                y.classList.add("activeFav");
            }
        }
        else {
            y.classList.add("activeFav");
        }
    }
}


var apiKey= '5jhwgKDtDjl9Rwqz78koF0s3IaDXQ1X0';

async function mostrarFavs(array, valorpasado) {

    var guardarFav = JSON.parse(localStorage.getItem("ids"));
    var urlBusqueda = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${array}`;
    resp = await fetch(urlBusqueda);
    info = await resp.json();

    contieneFavs.innerHTML = `<div class="favsImg" id="favsImg"></div>
                             <div class="paginado" id="paginado"></div>`;
    info.pagination.offset = valorpasado;
    contenedorFavs = document.getElementById("favsImg");
    var paginado = document.getElementById("paginado");
   

    if (info.pagination.count - info.pagination.offset > 12) {

        for (i = 0; i < 12; i++) {

            var txt = `<div class="tarjetaBusqueda">
            <div class="gifoBus">
                <img src="${info.data[i].images.original.url}" alt="Gif" class="busquedaImg" 
                onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}','${info.data[i].id}')">
                </div>
            <div class="busquedaHover">
                <div class="botones">
                <button class='heart' id='heartfav${i}' onclick="favoritos(${i},'${info.data[i].id}')">
                </button>
                <button class="download" onclick="downloadGif('${info.data[i].id}')">  </button>

                    <button class='max' 
                    onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}')">
                    </button>
                </div>
                <div class="textBuscar">${info.data[i].username}<br> ${info.data[i].title}
                </div>
            </div>
        </div>`;
            contenedorFavs.insertAdjacentHTML("beforeend", txt);
            if (guardarFav != null) {
                var searchid = guardarFav.includes(info.data[i].id);
                if (searchid) {
                    var x = document.getElementById("heartfav" + i);
                    x.classList.add("activeFav")
                }
                else {
                    //console.log("no");
                }

            }
        }


        var total = info.pagination.count;
        var paginas = Math.ceil(total / 12);
        for (j = 1; j <= paginas; j++) {
            var txt = `<button class="pag" id="page${j}" onclick="paginasFav(${j - 1}*12)">${j}</button>`;
            paginado.insertAdjacentHTML('beforeend', txt);
            if ((j - 1) * 12 == valorpasado) {
                document.getElementById(`page${j}`).classList.add("activePag");
            }

        }

    } else {
        for (i = valorpasado; i < info.pagination.count; i++) {
            var txt = `<div class="tarjetaBusqueda">
            <div class="gifoBus">
                <img src="${info.data[i].images.original.url}" alt="Gif" class="busquedaImg" 
                onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}')">
                </div>
            <div class="busquedaHover">
                <div class="botones">
                <button class='heart' id='heartfav${i}' onclick="favoritos(${i},'${info.data[i].id}')">
                    </button>
                    <button class="download" onclick="downloadGif('${info.data[i].id}')">  </button>
                    <button class='max' 
                    onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}','${info.data[i].id}')">
                    </button>
                </div>
                <div class="textBuscar">${info.data[i].username}<br> ${info.data[i].title}
                </div>
            </div>
        </div>`;
            contenedorFavs.insertAdjacentHTML("beforeend", txt);
            if (guardarFav != null) {
                var searchid = guardarFav.includes(info.data[i].id);
                if (searchid) {
                    var x = document.getElementById("heartfav" + i);
                    x.classList.add("activeFav")
                }
                else {
                    //console.log("no");
                }

            }
        }
        var total = guardarFav.length;
        var paginas = Math.ceil(total / 12);

        if (total > 12) {
            for (j = 1; j <= paginas; j++) {
                var txt = `<button class="pag" id="page${j}" onclick="paginasFav(${j - 1}*12)">${j}</button>`;
                paginado.insertAdjacentHTML("beforeend", txt);
                if ((j - 1) * 12 == valorpasado) {
                    document.getElementById(`page${j}`).classList.add("activePag");
                }

            }
        }

    }
}


function paginasFav(off) {
    contenedorFavs = document.getElementById("favsImg");
    contenedorFavs.innerHTML = "";
    mostrarFavs(guardarFav, off);

}