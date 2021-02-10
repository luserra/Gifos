function agrandar(gifmax, user, title, idmax) {
    
    document.getElementById("agrandar").innerHTML = "";
    document.getElementById("agrandar").style.display = "unset";
    var cont = document.getElementById("agrandar");
    var txt = `<div id="contieneBtnMax">
                <button id="cerrar" onclick=volver()></button>
                </div>
                <div class="contieneMax"> 
                    <img src="${gifmax}" alt="" class="imgMax">
                         <div id="infoMax">
                              <div id="textoMax">
                                    <div class="userMax"> ${user}</div>
                                    <div class="tituloMax">${title}</div> 
                                </div>
                                <div class="botonesMax">
                                <button class='favMax' id='heartfav777' onclick="favoritos(777,'${idmax}')">
                                <button class="download" id="download" onclick="downloadGif('${idmax}')">  </button>
                                </div> 
                         </div>    
                 </div>`;
    cont.insertAdjacentHTML("afterbegin", txt);
    document.getElementById("todo").style.display = "none";
    ids = localStorage.getItem('ids');
    ids = JSON.parse(ids);
    var search = ids.includes(idmax);
    if (search){
        document.getElementById("heartfav777").classList.add("activeFav");
    }

};

function volver() {
    document.getElementById("todo").style.display = "unset";
    document.getElementById("agrandar").style.display = "none";
}
