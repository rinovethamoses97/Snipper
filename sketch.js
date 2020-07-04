let screenshot=null;
let saveButton;
let cropButton;
let resetButton
let x1=null;
let y1=null;
let x2=null;
let y2=null;
let cropStart="default";
let cropImg=null;
let border=30;
let drawButton;
let img;
let drawStart=false;
let graphics;
function preload(){
    img=loadImage(localStorage.getItem("url"));
}
function setup(){
    createCanvas(window.innerWidth-50,window.innerHeight);
    graphics=createGraphics(window.innerWidth-50,window.innerHeight);
    saveButton=createButton("Save");
    saveButton.position(width/2,10);
    saveButton.mouseClicked(downloadImage);
    
    cropButton=createButton("Crop");
    cropButton.position(width/2+60,10);
    cropButton.mouseClicked(cropImage);
    
    resetButton=createButton("Reset");
    resetButton.position(width/2+120,10);
    resetButton.mouseClicked(reset);
    
    drawButton=createButton("Draw");
    drawButton.position(width/2+180,10);
    drawButton.mouseClicked(startDraw);
    
    img.resize(width-(2*border),height-(2*border));
    screenshot=img;
}
function startDraw(){
    drawStart=true;
}
function reset(){
    cropStart="default";
    cropImg=null;
    graphics.clear();
    drawStart=false;
}
function cropImage(){
    if(cropStart=="done"){
        cropStart="cropped";
        graphics.clear();
        x1=x1-border;
        y1=y1-border;
        x2=x2-border;
        y2=y2-border;   
        let tempX,tempY;
        tempX=abs(x2-x1);
        tempY=abs(y2-y1);
        cropImg=createImage(tempX,tempY);
        let currentFrame=get();
        let currentFrameWb=createImage(screenshot.width,screenshot.height);
        currentFrameWb.copy(currentFrame,border,border,screenshot.width,screenshot.height,0,0,currentFrameWb.width,currentFrameWb.height);
        if(x1>x2 && y1<y2){
            cropImg.copy(currentFrameWb,x2,y1,tempX,tempY,0,0,tempX,tempY);   
        }
        else if(x1<x2 && y1>y2){
            cropImg.copy(currentFrameWb,x1,y2,tempX,tempY,0,0,tempX,tempY);      
        }
        else if(x1 > x2 && y1>y2){
            cropImg.copy(currentFrameWb,x2,y2,tempX,tempY,0,0,tempX,tempY);   
        }
        else{
            cropImg.copy(currentFrameWb,x1,y1,tempX,tempY,0,0,tempX,tempY);   
        }
        
    }
    else if(cropStart=="default"){
        cropStart="stop";
        drawStart=false;
    }
}
function draw(){
    background(0);
    if(screenshot){
        if(cropImg){
            image(cropImg,30,30,cropImg.width,cropImg.height);
        }
        else{
            image(screenshot,0+border,0+border,screenshot.width,screenshot.height);
        }
        image(graphics,0,0);
    }
    if(cropStart=="start"){    
        stroke(0);
        strokeWeight(3);
        noFill();
        rect(x1,y1,mouseX-x1,mouseY-y1);
    }
    else if(cropStart=="done"){
        stroke(0);
        strokeWeight(3);
        noFill();
        rect(x1,y1,x2-x1,y2-y1);
    }
    if(drawStart && mouseIsPressed){
        graphics.stroke(color(191, 255, 0,20));
        graphics.strokeWeight(20);
        graphics.line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function mousePressed(){
    if(mouseX>=border && mouseX<=width-border && mouseY>=border && mouseY<=height-border){
        if(cropStart=="stop"){
            cropStart="start";
            x1=mouseX;
            y1=mouseY;
        }
        else if(cropStart=="start"){
            cropStart="done";
            x2=mouseX;
            y2=mouseY;
        }
    }
}
function downloadImage(){
    if(cropImg){
        let currentFrame=get();
        let currentFrameWb=createImage(cropImg.width,cropImg.height);
        currentFrameWb.copy(currentFrame,border+3,border+3,cropImg.width-6,cropImg.height-6,0,0,currentFrameWb.width,currentFrameWb.height);
        currentFrameWb.save("Screenshot","png");
    }
    else{
        let currentFrame=get();
        let currentFrameWb=createImage(screenshot.width,screenshot.height);
        currentFrameWb.copy(currentFrame,border,border,screenshot.width,screenshot.height,0,0,currentFrameWb.width,currentFrameWb.height);
        currentFrameWb.save("Screenshot","png");
    }
}