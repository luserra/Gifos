async function downloadGif(gifoImg) {
  let blob = await fetch(
   "https://media.giphy.com/media/" + gifoImg + "/giphy.gif"
 ).then((img) => img.blob());
  invokeSaveAsDialog(blob, "gif.gif");
}
