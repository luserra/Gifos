async function palabrasTrending() {
    var apiKey = '5jhwgKDtDjl9Rwqz78koF0s3IaDXQ1X0';
    var palabras = document.getElementById("palabraTrending");
    let url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}&limit=5`;
    let trend = [];

    let respuesta= await fetch (url)
    let m = await respuesta.json();
    for (let i = 0; i < m.data.length; i++){
        trend.push(m.data[i].title);
    }
    for (let x = 0; x < 5; x++) {
        let palabra = document.createElement('button');
        trending = "<p class='palabraTrend'>"  + m.data[x] + ", " + "</p>" ; 
        palabra.innerHTML = trending;
        palabras.appendChild(palabra);
    }
}

palabrasTrending();
