// Feature Extractor Classification
// A Beginner's Guide to Machine Learning with ml5.js
// The Coding Train / Daniel Shiffman
// https://youtu.be/eeO-rWYFuG0
// https://thecodingtrain.com/learning/ml5/3.1-feature-extractor-classification.html
// https://editor.p5js.org/codingtrain/sketches/5A_TJHA1

let mobilenet;
let classifier;
let video;
let label = 'test';
let ukeButton;
let whistleButton;
let trainButton;
let w  = window.innerWidth;
let h  = window.innerWidth * 0.75;

navigator.mediaDevices.enumerateDevices().then(function(e) {
  debugger;
  // gotSources(e);
});
function modelReady() {
  console.log('Model is ready!!!');
    // classifier.load('model.json', customModelReady);
}

function customModelReady() {
  console.log('Custom Model is ready!!!');
  label = 'model ready';
  classifier.classify(gotResults);
}

function videoReady() {
  console.log('Video is ready!!!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    // updated to work with newer version of ml5
    // label = result;
    label = result[0].label;
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(w,h);
  video = createCapture({
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  });
  video.hide();
  debugger;
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  ukeButton = createButton('happy');
  ukeButton.mousePressed(function() {
    classifier.addImage('happy');
  });

  whistleButton = createButton('sad');
  whistleButton.mousePressed(function() {
    classifier.addImage('sad');
  });

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });

  saveButton = createButton('save');
  saveButton.mousePressed(function() {
    classifier.save();
  });
}

function draw() {
  background(0);
  image(video, 0, 0, w, h);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}