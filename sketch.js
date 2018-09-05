let mobilenet;
let video;
let prob = "";
let label = "";

function modelReady() {
  console.log('Model is ready!');
  mobilenet.predict(video, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    label = results[0].className;
    prob = results[0].probability;

    textSize(34);
    fill(255);
    text(label, 10, height - 10)
    text(Math.round(prob * 100), width - 60, height - 10);
    mobilenet.predict(gotResults);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  video = createCapture(VIDEO, 0, 0, windowWidth, windowHeight - 20);
  video.hide();
  mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}


function draw() {
  background(0);
  image(video, 0, 0);
}
