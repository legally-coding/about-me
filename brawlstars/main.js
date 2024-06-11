var brawlers = ['dynamike', 'bea', 'piper', 'darryl'];
var currentBrawler = 0;
var nextBtn = document.querySelector('button');
var brawl = document.querySelector('.brawl');
animating = 0;


nextBtn.onclick = ()=>{
    if(animating)return;
    animating = 1;
    nextBrawler();
}

function nextBrawler(){
    brawl.classList.add("hide-brawl");
    currentBrawler++;
    setTimeout(()=>{
        brawl.children[0].src = `./images/${brawlers[currentBrawler % brawlers.length]}.jpg`;
        brawl.children[1].innerText = `${brawlers[currentBrawler % brawlers.length]}!!`;
    }, 500);

    setTimeout(()=>{
        animating = 0;
        brawl.classList.remove("hide-brawl");
    }, 2000);
}

