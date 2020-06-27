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
function setup(){
    createCanvas(1500,735);
    saveButton=createButton("Save");
    saveButton.position(width/2,30);
    saveButton.mouseClicked(downloadImage);
    
    cropButton=createButton("Crop");
    cropButton.position(width/2+60,30);
    cropButton.mouseClicked(cropImage);
    
    resetButton=createButton("Reset");
    resetButton.position(width/2+120,30);
    resetButton.mouseClicked(reset);   
}
function reset(){
    cropStart="stop";
    cropImg=null;
}
function cropImage(){
    if(cropStart=="done"){
        cropStart="stop";
        x1=x1-30;
        y1=y1-30;
        x2=x2-30;
        y2=y2-30;   
        cropImg=createImage(x2-x1,y2-y1)
        cropImg.copy(screenshot,x1,y1,x2-x1,y2-y1,0,0,x2-x1,y2-y1);   
    }
}
function draw(){
    background(0);
    if(screenshot){
        if(cropImg){
            image(cropImg,30,30,cropImg.width,cropImg.height);
        }
        else
            image(screenshot,30,30,1440,675);
    }
    if(cropStart=="start"){    
        stroke(0);
        noFill();
        rect(x1,y1,mouseX-x1,mouseY-y1);
    }
    else if(cropStart=="done"){
        stroke(0);
        noFill();
        rect(x1,y1,x2-x1,y2-y1);
    }
}
function mousePressed(){

    if(mouseX>=30 && mouseX<=1440 && mouseY>=30 && mouseY<=675){
        console.log("Yes");
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
    console.log(localStorage.getItem("url"));
    loadImage(localStorage.getItem("url"),img=>{
        screenshot=createImage(1440,675);
        screenshot.copy(img,0,0,img.width,img.height,0,0,1440,675);
    })
})