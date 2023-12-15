var scroll = false;
var y;
var yStart;

window.onload = async ()=>{
    var l = document.getElementById("loading");
    l.style.opacity = "0";
    await setTimeout(()=>{document.body.removeChild(l)}, 500);
    let sec = document.querySelectorAll("section");

    for(var element of sec){
        element.addEventListener("mousedown", function(e){
            scroll = true;
            y = e.clientY;
            yStart = e.clientY;
        });

        element.onmouseup = leave.bind(element);

        element.addEventListener("mousemove", function(e){
            if(scroll){
                console.warn(window.innerHeight);
                console.log(e.clientY);
                if(e.clientY < window.innerHeight-50 && e.clientY > 50){
                    let x = parseInt(this.id.replace("sec", ""));
                    let sec1 = document.getElementById("sec" + x);
    
                    if(!sec1.style.top) sec1.style.top = "0px";
                    
                    sec1.style.top = (parseInt(sec1.style.top.replace("px", "")) + (e.clientY - y)).toString() + "px";
                    y = e.clientY;
                }else{
                    console.error("exit");
                    y = 0;
                    yStart = 0;
                    this.onmouseup();
                }
            }
        });
    }
}

window.onselectstart = ()=>{return false;}

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
                let video = document.querySelector("video");
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
            stop = true
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