function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#961209");
    if (scoreleftwrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        y_coord = Number(leftWristY);
        remove_decimals = floor(y_coord);
        volume = remove_decimals / 500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML = "Volume= " + volume;
    }
}

song = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreleftwrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause() {
    song.pause();
}

function stop() {
    song.stop();
}

function modelLoaded() {
    console.log("Model is Loaded");
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X= " + leftWristX + " Left Wrist Y= " + leftWristY);
        console.log("Right Wrist X= " + rightWristX + " Right Wrist Y= " + rightWristY);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("Score of the left wrist= " + scoreleftwrist);
    }
}