let image;
let canvas;
let cropStart;
let rect=null;
let x1,y1,x2,y2;
$(document).ready(function(){
    $("#canvas").attr("width",window.innerWidth-50);
    $("#canvas").attr("height",window.innerHeight);   
    cropStart="default";
    canvas=new fabric.Canvas("canvas");
    canvas.observe('mouse:down', function(e) { mousedown(e); });
    canvas.observe('mouse:move', function(e) { mousemove(e); });    
    fabric.Image.fromURL(localStorage.getItem('url'), function(img) {        
    image=img;
    image.set("selectable",false);
    image.set("evented",false);
    image.set({
        scaleX: (window.innerWidth-40) / image.width,
        scaleY: (window.innerWidth-40) / image.width
    });
    canvas.add(image);
    canvas.renderAll();
    });
    function mousedown(e){
        if(cropStart=="stop"){
            cropStart="start";
            var mouse = canvas.getPointer(e.e);
            x1=mouse.x;
            y1=mouse.y;
            rect=new fabric.Rect({ 
                width: 0, 
                height: 0, 
                left: mouse.x, 
                top: mouse.y, 
                stroke: 'red',
                strokeWidth: 2,
                fill: 'rgba(255,0,0,255)',
                opacity:0.5
            });
            canvas.add(rect); 
            canvas.renderAll();
        }
        else if(cropStart=="start"){
            canvas.remove(rect);
            canvas.add(rect);
            canvas.setActiveObject(rect);
            cropStart="done";
        }
    };
    function mousemove(e){
        if(cropStart=="start"){
            var mouse = canvas.getPointer(e.e);
            if(mouse.y<y1){
                rect.set("top",mouse.y)
            }
            if(mouse.x<x1){
                rect.set("left",mouse.x)
            }
            rect.set("width",Math.abs(mouse.x-x1))
            rect.set("height",Math.abs(mouse.y-y1));
            canvas.renderAll();
        }
    };
    $("#crop").click(function(){
        if(cropStart=="default"){
            cropStart="stop"
            image.set("selectable",false);
            image.set("evented",false);
        }
        else if(rect){
            cropStart="default";    
            image.cropX=image.cropX+(rect.left-image.left)/image.scaleX;
            image.cropY=image.cropY+(rect.top-image.top)/image.scaleY;
            image.width=(rect.width*rect.scaleX)/image.scaleX;
            image.height=(rect.height*rect.scaleY)/image.scaleY;
            image.left=0;
            image.top=0;
            canvas.remove(image);
            // image.clipTo=function(ctx){
            //     ctx.rect(rect.left/image.scaleX-(image.width/2),rect.top/image.scaleY-(image.height/2),rect.width/image.scaleX,rect.height/image.scaleY);
            // }
            canvas.remove(rect);
            rect=null;
            canvas.add(image);
            canvas.renderAll();
        }
    });
    $("#resize").click(function(){
        image.set("selectable",true);
        image.set("evented",true);
        canvas.remove(rect);
        canvas.setActiveObject(image);
        canvas.renderAll();
        cropStart="default";
    });
    $("#reset").click(function(){
        canvas.remove(image);
        cropStart="default";
        fabric.Image.fromURL(localStorage.getItem('url'), function(img) {        
            image=img;
            image.set("selectable",false);
            image.set("evented",false);
            image.set({
                scaleX: (window.innerWidth-40) / image.width,
                scaleY: (window.innerWidth-40) / image.width
            });
            canvas.add(image);
            canvas.renderAll();
        });
    });
    $("#download").click(function(){
        let dimage = image.toDataURL("image/jpg");
        $("#download").attr("href",dimage);
    })
});
