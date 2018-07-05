// BUTTON LOAD //
$(function(){

    var buttonLoad = document.querySelector('.buttonLoad');

    buttonLoad.addEventListener("click", function() {
        buttonLoad.innerHTML = "Click me ! FUCK !";
        buttonLoad.classList.add('spinning');

      setTimeout(
            function  (){
                buttonLoad.classList.remove('spinning');
                buttonLoad.innerHTML = "Click me !";
            }, 6000);
    }, false);

});
// BUTTON LOAD //
// SIMILAR ARTIST //

const lastfm_api = "591eb9d40511433f1eaec7ec16fc690e";

function getArtistLFMGetSimilar(str) {
  let artist = str;
  return new Promise((resolve, reject) => {
    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.getSimilar&artist=' + artist + '&api_key='+ lastfm_api +'&format=json')
    .done(data => resolve(data))
    .fail(() => reject("No top tracks for this artist (failed step 2)"));
  });
}
getArtistLFMGetSimilar()
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log(error);
  });
// SIMILAR ARTIST //
