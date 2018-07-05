
const lastfm_api = '591eb9d40511433f1eaec7ec16fc690e';
const youtube_api = 'AIzaSyB-DHXUr356lo_RXTT1_GAdPgszhMNMP58';

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

function getArtistLFMName(str) {
  let name = str;
  return new Promise((resolve, reject) => {
    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + name + '&api_key='+ lastfm_api +'&format=json')
    .done(data => {
      if(data.results.artistmatches.artist[0]) resolve(data.results.artistmatches.artist[0].name);
      else reject("No artist with that name (failed step 1)");
    })
    .fail(() => reject("Failed to get artist name (step 1)"));
  });
}

function getArtistLFMTopTrack(str) {
  let artist = str;
  return new Promise((resolve, reject) => {
    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' + artist + '&api_key='+ lastfm_api +'&format=json')
    .done(data => {
      if(data.toptracks && data.toptracks.track[0]) resolve(data.toptracks.track[0].name);
      else reject("Couldn't find top track for this artist (step 2)");
    })
    .fail(() => reject("Failed to fetch top track (failed step 2)"));
  });
}

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

function getYoutubeVideoId(artist, song) {
  let searchString = artist + ' ' + song;
  return new Promise((resolve, reject) => {
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=id&q=' + searchString  +'&type=video&key=' + youtube_api)
    .done(data => {
      if(data.items && data.items[0]) resolve(data.items[0].id.videoId);
      else reject("No video found (step 3)");
    })
    .fail(() => reject("Failed to fetch videos (failed step 3)"));
  });
}


// TODO check
function getArtistLFMGetSimilar(str) {
  let artist = str;
  return new Promise((resolve, reject) => {
    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.getSimilar&artist=' + artist + '&api_key='+ lastfm_api +'&format=json')
    .done(data => resolve(data))
    // TODO check data
    .fail(() => reject("No top tracks for this artist (failed step 2)"));
  });
}





initiate = () => {

  cloudinary.openUploadWidget({ cloud_name: 'imacoustic-live', upload_preset: 'rsoc7avm'},
    function(error, result) {

      console.log(result);

        let image = result[0];
        let public_id = image.public_id;
        let topTag = image.tags[0];
        let thumbnail = image.thumbnail_url;
        let tags = image.tags;

        // Pour chaque image
        for(i in result) {
          let nbfaces = result[i].info.detection.aws_rek_face.data.celebrity_faces.length;

          console.log(nbfaces);

          if(nbfaces === 1) {
            console.log("Found one face");
            let name = result[i].info.detection.aws_rek_face.data.celebrity_faces[0].name;
            getArtistLFMName(name)
            .then(data => getArtistLFMTopTrack(data))
            .then(data => getYoutubeVideoId(data))
            .then(data => $("#youtubeplayer").attr("src", "https://www.youtube.com/embed/" + data))
            .catch(error => console.log(error));
          }
          else if(nbfaces > 1) {
            console.log("Found more than one face");
          }
          else {
            console.log("Found no faces");
          }
        }

      });

};
