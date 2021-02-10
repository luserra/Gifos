async function buscar(busqueda, offset) {
    var ids = JSON.parse(localStorage.getItem("ids"));

    encode = encodeURIComponent(busqueda);
    var contieneTodo = document.getElementById("contieneGifos");
    
    var url_busqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${busqueda}&offset=${offset}`;
    resp = await fetch(url_busqueda);
    info = await resp.json();
    if (info.data.length == 0){
        contieneTodo.innerHTML = `<div class="lineaBusqueda" id="lineaBusqueda"></div> 
                                <h1 class="tituloBusqueda" id="tituloBusqueda">${busqueda}</h1>  
                                <div class="imgVacia"><img src="assets/icon-busqueda-sin-resultado.svg" alt="No hay resultados para su busqueda"></div>
                                <div class="intenta">Intenta con otra busqueda.</div>`;
    }
    else {
        contieneTodo.innerHTML = '<div id="resultado">' +
        '<div id="imgsBusqueda">' +                    
        '</div>' +
        '<div class="paginado" id="paginado"></div>' +
        '</div>';
    var paginado = document.getElementById("paginado");
    var contieneImgs = document.getElementById("imgsBusqueda");

    if (info.pagination.count - info.pagination.offset > 12) {
        for (i = 0; i < 12; i++) {

            var tarjeta = `<div class="tarjetaBusqueda">
            <div class="gifoBus">
                <img src="${info.data[i].images.original.url}" alt="gif" class="busquedaImg" 
                onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}','${info.data[i].id}')">
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
            contieneImgs.insertAdjacentHTML("afterbegin", tarjeta);
            if (ids != null) {
                var searchid = ids.includes(info.data[i].id);
                if (searchid) {
                    var x = document.getElementById("heartfav"+i);
                    x.classList.add("activeFav")
                }
                else {
                    console.log("carga 12 gifos");
                }

            }
        }
        var tarjeta = '<div class="lineaBusqueda" id="lineaBusqueda"></div>' +
            '<h1 class="tituloBusqueda" id="tituloBusqueda">' + busqueda + '</h1>'
        contieneTodo.insertAdjacentHTML('afterbegin', tarjeta);

        var total = info.pagination.count;
        var paginas = Math.ceil(total / 12);
        for (j = 1; j <= paginas; j++) {
           
            var tarjeta = `<button class="pag" id="page${j}" onclick="paginas('${busqueda}',${j - 1}*12)">${j}</button>`;
            paginado.insertAdjacentHTML('beforeend', tarjeta);
            if ((j-1)*12 == offset){
                document.getElementById(`page${j}`).classList.add("activePag");
            }
        }

    } else {
        for (i = 0; i < info.pagination.count - info.pagination.offset; i++) {
            
            var tarjeta = `<div class="tarjetaBusqueda">
            <div class="gifoBus">
                <img src="${info.data[i].images.original.url}" alt="gif" class="busquedaImg" 
                onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}','${info.data[i].id}')">
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
            contieneImgs.insertAdjacentHTML("afterbegin", tarjeta);
            if (ids != null) {
                var searchid = ids.includes(info.data[i].id);
                if (searchid) {
                    var x = document.getElementById("heartfav"+i);
                    x.classList.add("activeFav")
                }
                else {
                    console.log("no hay resultado");
                }

            }
        }
        var tarjeta = '<div class="lineaBusqueda" id="lineaBusqueda"></div>' +
            '<h1 class="tituloBusqueda" id="tituloBusqueda">' + busqueda + '</h1>'
        contieneTodo.insertAdjacentHTML('afterbegin', tarjeta);
        var total = info.pagination.count;
        var paginas = Math.ceil(total / 12);
        if (total > 12) {
            for (j = 1; j <= paginas; j++) {
                

             var tarjeta = `<button class="pag" id="pag${j}" onclick="paginas('${busqueda}',${j - 1}*12)">${j}</button>`;
             paginado.insertAdjacentHTML("beforeend", tarjeta);
              if ((j-1)*12 == offset){
                document.getElementById(`pag${j}`).classList.add("activePag");
            }
              
            }
        }

    }
}
}

function paginas(busqueda, off) {
    buscar(busqueda, off);

}