$(document).ready(function(){
    $("#btn1").click(function(){
        chrome.tabs.captureVisibleTab(null,{},function(url){
            localStorage.setItem("url",url);
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.create({url: chrome.extension.getURL('home.html')});
            });
        })
    })  
})
