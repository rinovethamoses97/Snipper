let screenshot=null;
let saveButton;
let cropButton;
let resetButton
let x1=null;
let y1=null;
let x2=null;
let y2=null;
let cropStart="stop";
let cropImg=null;
let border=30;
function setup(){
    createCanvas(window.innerWidth-50,window.innerHeight-50);
    saveButton=createButton("Save");
    saveButton.position(width/2,10);
    saveButton.mouseClicked(downloadImage);
    
    cropButton=createButton("Crop");
    cropButton.position(width/2+60,10);
    cropButton.mouseClicked(cropImage);
    
    resetButton=createButton("Reset");
    resetButton.position(width/2+120,10);
    resetButton.mouseClicked(reset);   
}
function reset(){
    cropStart="stop";
    cropImg=null;
}
function cropImage(){
    if(cropStart=="done"){
        cropStart="cropped";
        x1=x1-30;
        y1=y1-30;
        x2=x2-30;
        y2=y2-30;   
        let tempX,tempY;
        tempX=abs(x2-x1);
        tempY=abs(y2-y1);
        cropImg=createImage(tempX,tempY)
        if(x1>x2 && y1<y2){
            cropImg.copy(screenshot,x2,y1,tempX,tempY,0,0,tempX,tempY);   
        }
        else if(x1<x2 && y1>y2){
            cropImg.copy(screenshot,x1,y2,tempX,tempY,0,0,tempX,tempY);      
        }
        else if(x1 > x2 && y1>y1){
            cropImg.copy(screenshot,x2,y2,tempX,tempY,0,0,tempX,tempY);   
        }
        else{
            cropImg.copy(screenshot,x1,y1,tempX,tempY,0,0,tempX,tempY);   
        }
        
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
        cropImg.save("Screenshot","png");
    }
    else
        screenshot.save("Screenshot","png");
}
$(document).ready(function(){
    loadImage(localStorage.getItem("url"),img=>{
        screenshot=createImage(width-(2*border),height-(2*border));
        screenshot.copy(img,0,0,img.width,img.height,0,0,screenshot.width,screenshot.height);
    })
})