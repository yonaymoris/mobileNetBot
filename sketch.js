let myMobileNet;
let myVideo;
let myDiv;

function preload() {
	myMobileNet = ml5.imageClassifier('MobileNet');
	myVideo = createCapture(VIDEO);
	myVideo.parent('#wrapper')
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
		myDiv.html(`Label: ${results[0].label}, Confidence: ${results[0].confidence}`);
		console.log(results)
		setTimeout(() => myMobileNet.classify(myVideo, gotResults), 500);
	}
}