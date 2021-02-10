var contieneMG = document.getElementById("misGifos");
var misgifos = JSON.parse(localStorage.getItem("misgifos"));
var iconVacioG = document.getElementById('iconVacioG');
var tituloVacio = document.getElementById('tituloVacio');

    async function drawmisgifos(array, valorpasado) {

        if (array == null || array=="") {
            contieneMG.innerHTML="";
            iconVacioG.style.display = "unset";
            tituloVacio.style.display = "block";
        }
else {
        iconVacioG.style.display = "none";
        tituloVacio.style.display = "none";
        var urlBusqueda = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${array}`;
        resp = await fetch(urlBusqueda);
        info = await resp.json();
        
        contieneMG.innerHTML = `<div class="favsImg" id="imagesmisgifs"></div>
                                 <div class="paginado" id="paginado"></div>`;
        info.pagination.offset=valorpasado;
        containermisgifs = document.getElementById("imagesmisgifs");
        var paginado = document.getElementById("paginado");
        if (info.pagination.count - info.pagination.offset > 12) {

            for (i = 0; i < 12; i++) {

                var txt = `<div class="tarjetaBusqueda">
                <div class="gifoBus">
                    <img src="${info.data[i].images.original.url}" alt="Gif" class="busquedaImg" 
                    onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}')">
                    </div>
                <div class="busquedaHover">
                    <div class="botones">
                    <button class='erase' id='erasemygif' onclick="erase('${info.data[i].id}')">
                    </button>
                    <button class="download" onclick="downloadGif('${info.data[i].id}')">  </button>
                    <button class='agrandar' 
                        onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}','${info.data[i].id}')">
                        </button>
                    </div>
                    <div class="textBuscar">${info.data[i].username}<br> ${info.data[i].title}
                    </div>
                </div>
            </div>`;
            containermisgifs.insertAdjacentHTML("beforeend", txt);
             
            }


    
            var total = info.pagination.count;
            var paginas = Math.ceil(total / 12);
            
            for (j = 1; j <= paginas; j++) {
                var txt = `<button class="pag" id="page${j}" onclick="pagefav(${j - 1}*12)">${j}</button>`;
                paginado.insertAdjacentHTML('beforeend', txt);
                if ((j-1)*12 == valorpasado){
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
                    <button class='erase' id='erasemygif' onclick="erase('${info.data[i].id}')">
                    </button>
                    <button class="download" onclick="downloadGif('${info.data[i].id}')">  </button>
                    <button class='max' 
                        onclick="agrandar('${info.data[i].images.original.url}','${info.data[i].username}','${info.data[i].title}','${info.data[i].id}')">
                        </button>
                    </div>
                    <div class="textBuscar">${info.data[i].user.username}<br> ${info.data[i].title}
                    </div>
                </div>
            </div>`;
            containermisgifs.insertAdjacentHTML("beforeend", txt);
                
            }
            var total = misgifos.length;
            var paginas = Math.ceil(total / 12);
            
            if (total > 12) {
                for (j = 1; j <= paginas; j++) {
                    var txt = `<button class="pag" id="page${j}" onclick="pagefav(${j - 1}*12)">${j}</button>`;
                    paginado.insertAdjacentHTML("beforeend", txt);
                    if ((j-1)*12 == valorpasado){
                        document.getElementById(`page${j}`).classList.add("activePag");
                    }
        
                }
            }

        }
    }
}
    drawmisgifos(misgifos, 0);

    function pagefav(off) {
      
        contieneMG.innerHTML = "";
        drawmisgifos(misgifos, off);

    }




 function erase(idmygif){
    var searchid = misgifos.includes(idmygif);
    if (searchid) {
        const index = misgifos.indexOf(idmygif);
        if (index > -1) {
            misgifos.splice(index, 1);
        }
    }
    localStorage.setItem('misgifos', JSON.stringify(misgifos));
    drawmisgifos(misgifos,0);
 }