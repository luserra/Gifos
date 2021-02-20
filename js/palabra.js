function palabrasTrending() {
    var apiKey = '5jhwgKDtDjl9Rwqz78koF0s3IaDXQ1X0';
    let url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    fetch(url)
        .then(r => r.json())
        .then((resp) => {
            var palabras = document.getElementById("palabraTrending");
            for (i = 0; i < 5; i++) {
                let palabra = document.createElement('button');
                var trending = `<div class="palabraTrend" onclick="buscarPalabra('${resp.data[i]}')">
                ${resp.data[i]},
                </div>`;
                palabra.innerHTML = trending;
                palabras.appendChild(palabra);
            }

        })
};
palabrasTrending();

function buscarPalabra(y) {
    buscar(y);
}