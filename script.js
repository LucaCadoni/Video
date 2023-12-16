var scroll = false;
var y;
var yStart;
var pSec;
var video;
var load = 0;


window.addEventListener("load", ready);
window.addEventListener("load", ()=>{
    video = document.querySelector("video");
    video.addEventListener("canplay", ready);
});

function init(){
    let sec = document.querySelectorAll("section");
    for(var element of sec){
        element.addEventListener("touchstart", start.bind(element));
        element.addEventListener("mousedown", start.bind(element));
        element.ontouchend = leave.bind(element);
        element.onmouseup = leave.bind(element);
        element.addEventListener("touchmove", move.bind(element));
        element.addEventListener("mousemove", move.bind(element));
    }
}

window.onselectstart = ()=>{return false;}

function start(e){
    if(this.style.top != "-100vh" && this.style.top != "100vh"){
        scroll = true;
        (e.touches ? y=e.touches[0].clientY : y=e.clientY);
        yStart = y;
    }
}

function move(e){
    e.preventDefault();
    if(scroll){
        if((e.touches && (e.touches[0].clientY < window.innerHeight-50 && e.touches[0].clientY > 50)) || (e.clientY < window.innerHeight-50 && e.clientY > 50)){
            let x = parseInt(this.id.replace("sec", ""));
            let sec1 = document.getElementById("sec" + x);

            if(!sec1.style.top) sec1.style.top = "0px";
            
            if(e.touches)
                sec1.style.top = (parseInt(sec1.style.top.replace("px", "")) + (e.touches[0].clientY - y)).toString() + "px";
            else
                sec1.style.top = (parseInt(sec1.style.top.replace("px", "")) + (e.clientY - y)).toString() + "px";
            (e.touches ? y=e.touches[0].clientY : y=e.clientY);
        }else{
            console.error("exit");
            y = 0;
            yStart = 0;
            this.ontouchend();
        }
    }
}

function leave(){
    console.log(this);
    scroll = false;
    let stop = false;
    let x = parseInt(this.id.replace("sec", ""));
    console.warn(x);
    var sec1 = document.getElementById("sec" + x);
    if(y-yStart < -100){
        var sec2 = document.getElementById("sec" + (x+1));
        if(sec2){
            sec1.style.top = "-100vh";
            sec2.style.top = "0px";
            sec1.style.transition = "top 1s cubic-bezier(0.075, 0.82, 0.165, 1)";
            sec2.style.transition = "top 1s cubic-bezier(0.075, 0.82, 0.165, 1)";
            if(x == 2){
                video.style.opacity = "1";
                video.play();
            }
            setTimeout(()=>{
                sec1.style.transition = "";
                sec2.style.transition = "";
            }, 1000);
        }else{
            stop = true;
        }
    }else if(y-yStart > 100){
        var sec2 = document.getElementById("sec" + (x-1));
        if(sec2){
            sec1.style.top = "100vh";
            sec2.style.top = "0px";
            sec1.style.transition = "top 1s cubic-bezier(0.075, 0.82, 0.165, 1)";
            sec2.style.transition = "top 1s cubic-bezier(0.075, 0.82, 0.165, 1)";
            setTimeout(()=>{
                sec1.style.transition = "";
                sec2.style.transition = "";
            }, 1000);
        }else{
            stop = true;
        }
    }else{
        stop = true;
    }

    if(stop){
        sec1.style.top = "0px";
        sec1.style.transition = "top 0.5s cubic-bezier(0.075, 0.82, 0.165, 1)";
        setTimeout(()=>{
            sec1.style.transition = "";  
        }, 500);
    }
}

async function ready(){
    load ++;
    console.log("load " + load);
    var l = document.getElementById("loading");
    if(load >= 2 && l){
        l.style.opacity = "0";
        init();
        await setTimeout(()=>{document.body.removeChild(l)}, 500);
    }
}