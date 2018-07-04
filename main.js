
document.getElementById("upload_widget_opener").addEventListener("click", function() {
  cloudinary.openUploadWidget({ cloud_name: 'imacoustic-live', upload_preset: 'vivbxf4w'},
    function(error, result) {
      const tags = result[0].tags;
      const public_id = result[0].public_id;
      const thumbnail = result[0].thumbnail_url;

      document.getElementById("thumbnail").src = thumbnail;
      document.getElementById("tag").innerHTML = tags[0];

      console.log(error, result);
    });
}, false);
