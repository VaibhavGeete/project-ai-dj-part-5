function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

rightwristx=0;
rightwristy=0;
leftwristx=0;
leftwristy=0;
song_1_status=0;
song_2_status=0;
score_leftwrist=0;
score_rightwrist=0;

function gotPoses(results)
{
if(results.length>0)
{
console.log(results);
score_rightwrist=results[0].pose.keypoints[10].score;
score_leftwrist=results[0].pose.keypoints[9].score;
console.log("score leftwrist = "+score_leftwrist+"score_rightwrist = "+score_rightwrist);

leftwristx=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y;
console.log("leftwristx="+leftwristx+"leftwristy="+leftwristy);

rightwristx=results[0].pose.rightWrist.x;
rightwristy=results[0].pose.rightWrist.y;
console.log("rightwristx="+rightwristx+"rightwristy="+rightwristy);
}
}

function modelLoaded()
{
    console.log("modelLoaded");
}


function draw()
{
    image(video,0,0,600,500);
song_1_status=song1.isPlaying();
song_2_status=song2.isPlaying();

    fill("red");
    stroke("red");
    if(score_rightwrist>0.2)
    {
        circle(rightwristx,rightwristy,20);
       song2.stop();

       if(song_1_status==false)
       {
           song1.play();
           document.getElementById("song").innerHTML="song playing now = spotlight ";
       }

    }

    if(score_leftwrist>0.2)
    {
        circle(leftwristx,leftwristy,20);
        song1.stop();

        if(song_2_status==false)
        {
            song2.play();
            document.getElementById("song").innerHTML="song playing now = BarrenGates";
        }
}

}

song1="";
song2="";


function preload()
{
    song1=loadSound("spotlight.mp3");  
    song2=loadSound("BarrenGates.mp3");
}

function play()
{

}