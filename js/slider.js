
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");

var guardarFav = JSON.parse(localStorage.getItem("ids"));
var index = 0;
var x = document.getElementById("heartfav2");

function pasarSlider(n) {
    var cant = index += n;
    var contieneSlider = document.getElementById("sliderGifos");
    if (cant >= 0) {

        contieneSlider.innerHTML = "";
        mostrarTrending(3, cant)
    }
}

var apiKey= '5jhwgKDtDjl9Rwqz78koF0s3IaDXQ1X0';
function mostrarTrending(limit, offset) {
    var url_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${offset}`;
    fetch(url_trending)
        .then(r => r.json())
        .then((rsp) => {
            var contieneSlider = document.getElementById("sliderGifos");
            for (i = 0; i < rsp.data.length; i++) {
                var txt =
                    `<div class="tarjetaGifo">
                    <div class="contieneSlider">
                        <img src="${rsp.data[i].images.original.url}"  class="gifoImg"  alt="Gif"
                        onclick="agrandar('${rsp.data[i].images.original.url}','${rsp.data[i].username}','${rsp.data[i].title}','${rsp.data[i].id}')">
                        </div>
                    <div class="hover">
                        <div class="botones">
                            <button class='heart' id='heartfav${i}' onclick="favoritos(${i},'${rsp.data[i].id}')">
                            </button>
                            <button class="download" onclick="downloadGif('${rsp.data[i].id}')">  </button>
                            <button class='max' 
                            onclick="agrandar('${rsp.data[i].images.original.url}','${rsp.data[i].username}','${rsp.data[i].title}','${rsp.data[i].id}')">
                            </button>
                        </div>
                        <div class="textTrending">${rsp.data[i].username}<br> ${rsp.data[i].title}
                        </div>
                    </div>
                </div>`;
                contieneSlider.insertAdjacentHTML('afterbegin', txt);
                if (guardarFav != null) {
                    var searchid = guardarFav.includes(rsp.data[i].id);
                    if (searchid) {
                        var x = document.getElementById("heartfav"+i);
                        x.classList.add("activeFav");
                    }
                    else {
                        
                    }

                }
            }

            if (offset<=0){
                prevBtn.style.visibility="hidden";
            }
            else{
                prevBtn.style.visibility="visible";
            }
        })
};


var window = window.innerWidth;

if (window.innerWidth > 768) {
    var limit = 3;
    var offset = 0;
    mostrarTrending(limit, offset);
}
else {
    var offset = 0;
    var limit = 10;
    mostrarTrending(limit, offset);

}




