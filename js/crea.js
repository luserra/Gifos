var apiKey= '5jhwgKDtDjl9Rwqz78koF0s3IaDXQ1X0';

var video = document.getElementById("video")
var tituloCrea = document.getElementById("tituloCrea");
var pasos = document.getElementById("pasos");

var uno = document.getElementById("1");
var dos = document.getElementById("2");
var tres = document.getElementById("3");

var btnPlay = document.getElementById("play");
var grabar = document.getElementById("grabar");
var fin = document.getElementById("fin");
var subir = document.getElementById("subir");

var gifListo = document.getElementById("gifListo");
var repeatcapture = document.getElementById("rep");
var containercamara = document.getElementById("cam");
var hoverCrear = document.getElementById("hoverCrear");
var iconoSubir = document.getElementById("iconoSubir");
var iconoExito = document.getElementById("iconoExito");
var tituloSubir = document.getElementById("tituloSubir");
var tituloExito = document.getElementById("tituloExito");
var cuentaReg = document.getElementById("cuentaReg");
var descargarMig = document.getElementById("descargarMig");
var linkMig = document.getElementById("linkMig");
var btnSubir = document.getElementById("btnSubir");

let form = new FormData();

function getStreamAndRecord() {
  uno.classList.add("activeNum");
  tituloCrea.innerHTML = '¿Nos das acceso a tu cámara?';
  pasos.innerHTML = 'El acceso a tu cámara será válido sólo por el tiempo en el que estés creando el GIFO.'
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      height: { max: 480 },
      width: { max: 480 }
    }

  })

    .then(function (stream) {
      document.getElementById("contieneTitCrea").style.display = "none";
      containercamara.style.display = "flex";
      btnPlay.style.display = "none";
      grabar.style.display = "unset";
      video.srcObject = stream;
      video.play();

      recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
          console.log('started')
        },
      });

    });
}

grabar.addEventListener("click", grabarGif);

function grabarGif() {
  cuentaReg.style.display="unset";
  recorder.startRecording();
  grabar.style.display = "none";
  fin.style.display = "unset";
  uno.classList.remove("activeNum");
  dos.classList.add("activeNum");

  dateStarted = new Date().getTime();

  (function looper() {
    if (!recorder) {
      /*OK*/
      return;
    }
    /*Cuenta*/
    cuentaReg.innerHTML = calculateTimeDuration(
      (new Date().getTime() - dateStarted) / 1000
    );
    setTimeout(looper, 1000);
  })();
}




fin.addEventListener("click", stopgifrecording);

function stopgifrecording() {
  cuentaReg.style.display="none"
  repeatcapture.style.display = "unset";
  fin.style.display = "none";
  subir.style.display = "unset";
  recorder.stopRecording(function () {
    video.style.display = "none";


    blob = recorder.getBlob();
    gifListo.src = URL.createObjectURL(recorder.getBlob());
    gifListo.style.display = "unset";

    form.append("file", recorder.getBlob(), "myGifo.gif");
    form.append("api_key", apiKey);

  })

}

function calculateTimeDuration(secs) {
  var hr = Math.floor(secs / 3600);
  var min = Math.floor((secs - hr * 3600) / 60);
  var sec = Math.floor(secs - hr * 3600 - min * 60);
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  return hr + ":" + min + ":" + sec;
}

subir.addEventListener("click", upload);

function upload() {
  subir.style.display="none";
  dos.classList.remove("activeNum");
  tres.classList.add("activeNum");
  hoverCrear.style.display="unset";
  repeatcapture.style.display="none";
  fetch(`https://upload.giphy.com/v1/gifs`, {
    method: "POST",
    body: form,
  })
    .then((response) => {
      return response.json();
    })
    .then((gifo) => {
      iconoSubir.style.display="none";
      tituloSubir.style.display="none";
      iconoExito.style.display="unset";
      tituloExito.style.display="unset";
      btnSubir.style.display="unset";
      var myGifoId = gifo.data.id;
      linkMig.addEventListener("click",()=>{
        window.open("https://media.giphy.com/media/"+ myGifoId+ "/giphy.gif", "_blank");
      })
      descargarMig.addEventListener("click",()=>{
        downloadGif(myGifoId);
      });
      misgifos = localStorage.getItem('misgifos');
      if (misgifos == null) {
        misgifos = [];
      } else {
        misgifos = JSON.parse(misgifos);
      }
      misgifos.push(myGifoId);
      
      localStorage.setItem('misgifos', JSON.stringify(misgifos));

    })
   
};


descargarMig.addEventListener("click",()=>{
  downloadGif(gifagregado);
});


repeatcapture.addEventListener("click", repeat);

function repeat() {

  recorder.clearRecordedData();
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      height: { max: 480 }
    }

  })
    .then(function (stream) {
      repeatcapture.style.display="none"
      document.getElementById("contieneTitCrea").style.display = "none";
      gifListo.style.display = "none";
      video.style.display = "unset";
      containercamara.style.display = "flex";
      grabar.style.display = "unset";
      subir.style.display = "none";
      video.srcObject = stream;
      video.play();

      recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
          console.log('started')
        },
      });
    });
}


