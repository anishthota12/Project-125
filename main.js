leftWristX = 0;
rightWristX = 0;
difference = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);
    video.position(50, 240);

    canvas = createCanvas(550, 500);
    canvas.position(screen.width - 600, 240);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = Math.floor(leftWristX - rightWristX);
        console.log("Left Wrist X: " + Math.round(leftWristX) + ", Right Wrist X: " + Math.round(rightWristX));
        document.getElementById("fontSize").innerHTML = "Font Size: " + Math.round(difference / 1.5) + "px";
    }
}

function modelLoaded() {
    console.log("Posenet is Initialized");
}

function draw() {
    background("#FFF");
    textSize(difference / 1.5); // I divided by 1.5 to make the text fit inside the canvas
    textFont('fontItalic');
    text("Anish", 0, 325);
    fill("darkblue");
}