var Particles = Particles || {};
Particles.init = function() {
  var particlesWrapper = document.querySelector('.particles');
  var avatar = document.querySelector('.avatar');

  function readImage() {
    var myImg = new Image();
    myImg.src = avatar.src;
    console.log(myImg);
    var context = document.getElementById('canvas').getContext('2d');
    context.drawImage(myImg, 0, 0, 100, 100);
    processPixels(context, avatar.width, avatar.height);
  }

  function processPixels(context, width, height) {
    for (var c = 0; c<= height - 1; c++) {
      for (let i = 0; i<= width - 1; i++) {
        var data = context.getImageData(i, c, 1, 1).data;
        generateParticle(data);
      }
    }
  }
  
  function generateParticle(color) {
    let particle = document.createElement('div');
    let red = color[0];
    let green = color[1];
    let blue = color[2];
    let alpha = color[3];
    particle.className = 'particle';
    particle.style.backgroundColor = 'rgba('+ red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
    particlesWrapper.appendChild(particle);
  }

  readImage();
}