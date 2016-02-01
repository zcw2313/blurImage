/**
 * Created by zhongzhuo on 2016/2/1.
 */
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;

var canvas = document.getElementById("canvas");
var cxt = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var image = new Image();
var radius = 50;
var clip = {x:-1,y:-1,r:radius};
var leftMargin = 0, topMargin = 0;
image.src = "1.jpg";
image.onload = function(e){
    $("#blur-div").css("width",canvasWidth+"px");
    $("#blur-div").css("height",canvasHeight+"px");

    $("#blur-image").css("width",image.width+"px");
    $("#blur-image").css("height",image.height+"px");

    leftMargin = (image.width - canvasWidth)/2;
    topMargin = (image.height - canvasHeight)/2;

    $("#blur-image").css("left",String(-leftMargin)+"px");
    $("#blur-image").css("top",String(-topMargin)+"px");

    initCanvas();
};

function initCanvas(){
    var theLeft = leftMargin < 0 ? -leftMargin : 0;
    var theTop = topMargin < 0 ? -topMargin : 0;
    clip = {x:Math.random()*(canvasWidth-2*radius-2*theLeft)+radius+theLeft,
            y:Math.random()*(canvasHeight-2*radius-2*theTop)+radius+theTop,r:radius};

    draw(image,clip);
}

function draw(image,clip){
    cxt.clearRect(0,0,canvasWidth,canvasHeight);

    cxt.save();
    setClip(clip);
    cxt.drawImage(image,
        Math.max(leftMargin,0),Math.max(topMargin,0),
        Math.min(canvasWidth,image.width),Math.min(canvasHeight,image.height),
        leftMargin < 0 ? -leftMargin : 0,topMargin < 0 ? -topMargin : 0,
        Math.min(canvasWidth,image.width),Math.min(canvasHeight,image.height));
    cxt.restore();
}

function setClip(clip){
    cxt.beginPath();
    cxt.arc(clip.x,clip.y,clip.r,0,Math.PI*2,false);
    cxt.clip();
}

function show(){
    var time = setInterval(function(){
        clip.r += 20;
        if(clip.r > Math.sqrt(canvasWidth*canvasWidth+canvasHeight*canvasHeight)){
            clearInterval(time);
        }
        draw(image,clip);
    },30);
}

function reset(){
    initCanvas();
}

canvas.addEventListener("touchstart",function(e){
    e.preventDefault();
});