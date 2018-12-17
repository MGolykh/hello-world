window.onload = function() {
  var isPlaying = false;
  var interval;
  var ambi = {
    'top': document.getElementById('ambitop').getContext('2d'),
    'bottom': document.getElementById('ambibottom').getContext('2d'),
    'left': document.getElementById('ambileft').getContext('2d'),
    'right': document.getElementById('ambiright').getContext('2d'),
  };
  
  var flux = document.getElementById('flux');
  var body = document.getElementById('body');
  var sizes = getSize(flux, body);
  
  flux.addEventListener('playing', function(){
    launch();
  });
  
  flux.addEventListener('pause', function(){
    clearInterval(interval);
    isPlaying = false;
  });
  
  function launch() {
    isPlaying = true;
    interval = setInterval(function(){
      draw(flux, ambi, sizes);
    }, 16);
  }
 
  function getSize() {
    return {
      'heightFrame': body.clientHeight,
      'heightFlux': flux.videoHeight,
      'widthFrame': body.clientWidth,
      'widthFlux': flux.videoWidth,
      'heightToCapture': flux.videoHeight*1/body.clientHeight,
      'widthToCapture': flux.videoWidth*1/body.clientWidth,
    }
  }
  
  function draw() {
    if (sizes.heightFlux === 0) {
      sizes = getSize();
    }
    
    ambi['top'].drawImage(flux, 0, 0, sizes.widthFlux, sizes.heightToCapture, 0, 0, sizes.widthFrame, 10);
    ambi['bottom'].drawImage(flux, 0, sizes.heightFlux-sizes.heightToCapture, sizes.widthFlux, sizes.heightToCapture, 0, 0, sizes.widthFrame, 10);
    
    ambi['left'].drawImage(flux, 0, 0, sizes.widthToCapture, sizes.heightFlux, 0, 0, 10, sizes.heightFrame);
    ambi['right'].drawImage(flux, sizes.widthFlux-sizes.widthToCapture, 0, sizes.widthToCapture, sizes.heightFlux, 0, 0, 10, sizes.heightFrame);
  }
}