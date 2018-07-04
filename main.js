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
