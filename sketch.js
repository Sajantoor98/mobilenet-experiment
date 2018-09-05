let mobilenet;
let video;
var prob = document.getElementById('prob');
var label = document.getElementById('label');

function modelReady() {
  console.log('Model is ready!');
  mobilenet.predict(video, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    label.innerHTML = results[0].className;
    prob.innerHTML = "probability: " + Math.round(results[0].probability * 100) + "%";
    setTimeout(function() {
      mobilenet.predict(gotResults);
    }, 1000)

  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  var paras = {
     audio: false,
     video: {
       facingMode: "environment"
     }
   };

  video = createCapture(paras);
  video.hide();
  video.hide();
  mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}


function draw() {
  background(0);
  image(video, 0, 0, windowWidth, windowHeight);
}
