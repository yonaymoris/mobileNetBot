let myMobileNet;
let myVideo;
let myDiv;
let osc;
var index;

let notes = [60, 62, 64, 65, 67, 69, 71];
let colors = ['#ff9494', '#ffbd94', '#ffdf94', '#faff94', '#daff94', '#94ff94', '#94ffc2', '#94ffed', '#94e6ff', '#94bfff', '#a894ff', '#d894ff', '#ff94fa', '#ff94cd']

function preload() {
	myMobileNet = ml5.imageClassifier('MobileNet');
	myVideo = createCapture(VIDEO);
	myVideo.parent('#wrapper');
	// A triangle oscillator
	osc = new p5.TriOsc();
	// Start silent
	osc.start();
	osc.amp(0);
}

function setup() {
	myMobileNet.classify(myVideo, gotResults);
	myDiv = createDiv('...');
	myDiv.parent('#wrapper');
	myDiv.addClass('label');
	// console.log('my mobileNet', myMobileNet);
}

function gotResults(err, results) {
	if (err) console.log(err);
	if(results) {
		if (Math.floor(results[0].confidence*1000) > 60 && Math.floor(results[0].confidence*1000) < 71) {
			console.log("true");
			select('body').style('background', colors[Math.floor(results[0].confidence*1000) - 60]);
			playNote(Math.floor(results[0].confidence*1000), 500);
		} else {
			index = Math.floor(Math.random()*5)
			playNote(notes[index], 500);

			index = Math.floor(Math.random()*13)
			select('body').style('background', colors[index]);
		}
		myDiv.html(`Label: ${results[0].label}, Confidence: ${results[0].confidence}`);
		console.log(results)
		setTimeout(() => myMobileNet.classify(myVideo, gotResults), 500);
	}
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}