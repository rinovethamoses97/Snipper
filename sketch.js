let screenshot=null;
function setup(){
    createCanvas(1500,700);
}
function draw(){
    background(0);
    if(screenshot){
        image(screenshot,0,30,1500,700);
    }
}
$(document).ready(function(){
    console.log(localStorage.getItem("url"));
    loadImage(localStorage.getItem("url"),img=>{
        screenshot=img;
    })
})