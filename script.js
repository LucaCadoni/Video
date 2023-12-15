
window.onload = async ()=>{
    var l = document.getElementById("loading");
    l.style.opacity = "0";
    await setTimeout(()=>{document.body.removeChild(l)}, 500);
    let btn = document.getElementsByClassName("arrow"); 
    for(let element of btn){
        element.addEventListener("click", function(){
            let x = parseInt(this.id.replace("btn", ""));
            document.getElementById("sec" + x).style.top = "-100vh";
            document.getElementById("sec" + (x+1)).style.top = "0vh";
        })
    }
}

window.onselectstart = ()=>{return false;}