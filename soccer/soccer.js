let cards = document.querySelector('.cards-container');
let cardOverlay = document.querySelector(".card-overlay");
let c = Array.from(cards.children);
var carouselPos = 0;
var isMouseDragging = false;
var lastPos;
var gap = 105;

var time = 0;
var changeX = 0;
var movementStopped = 1;
var movements = [];
var veloInterval;

changeCarouselPos(0, true);


cardOverlay.addEventListener("mousedown", (e) => {
    isMouseDragging = true;
    movements = [];
    clearInterval(veloInterval);
})
cardOverlay.addEventListener("mouseup", () => {
    isMouseDragging = false;
    lastPos = null;
});
cardOverlay.addEventListener("mouseout", ()=>{
    isMouseDragging = false;
});

cardOverlay.addEventListener("mousemove", (e) => {
    if (!isMouseDragging) return;
    changeCarouselPos(e.movementX);
    
    changeX += e.movementX;
});

setInterval(()=>{
    if(!isMouseDragging && !movementStopped)return (moveVelocity(movements[movements.length-1]), movements = [], movementStopped = 1);
    if(!isMouseDragging)return;

    movementStopped = 0;
    movements.push(changeX);
    changeX = 0;
    time+=50;
}, 50);

function moveVelocity(move){
    let vx = move;
    var count = 3;

    if(Math.abs(move) < 10)return;

    console.log(vx, carouselPos);

    veloInterval = setInterval(()=>{
        carouselPos += vx/(count**1.8);
        changeCarouselPos(0, true);
        
        count >= 30 ? clearInterval(veloInterval) : count++;
    }, 15);
}

var max = 0;
var min = 100;

function changeCarouselPos(mx, force) {
    if (!mx && !force) return;

    carouselPos += mx;

    for (let i = 0; i < c.length; i++) {
        var ok = ((gap * i) + carouselPos) % (gap * c.length);
        if (ok < -1) ok += gap * c.length;
        c[i].style.left = `${ok - 150}px`;

        
        c[i].style.setProperty(`--card-${i}-pos`, ok/(gap*c.length));

    }

}


var teamPrompts = ["<b>Seattle Sounders</b> are from Seattle. I have watched them since I was very young and they're the club I follow the most. I go to the matches when I can. Lifting many trophies in the past few years, they are one of the most successful North American teams playing in MLS.", "<b>Ballard FC</b> are a team from the Ballard neighborhood in Seattle. I have yet to go see a game in person, but I plan to this summer. They are a local amateur team playing in the USL2, the 4th divison of soccer in the United States. They were only founded in 2021, but last year they won the championship, competing against over 100 teams across the nation!", "<b>Chelsea FC</b> are a soccer club from West London in England. I became a fan of them because of Eden Hazard, a player with great dribbling skills. As of now, they are the only team from London to win the UEFA Champions League, a tournament in Europe between the top teams.", "<b>FC Barcelona</b> play in La Liga in Spain. I follow them from when Messi used to play there and because my family is from Barcelona. They are one of the most successful teams in Spain and one of the most famous academies, La Masia, where players are transformed into world renowned superstars.", "<b>Boca Juniors</b> are from Buenos Aires and play in the Argentinian league. My parents have followed Boca since they were born since they are both from Argentina. Regarded as one of the biggest clubs in all of the Americas, they are bitter enemies with River Plate, a rivalry whose games are known to be the most passionate and most dangerous sporting events to attend in the world."];
let teams = Array.from(document.querySelector(".teams").children)
teams.forEach((t, i)=>{
    t.addEventListener("mouseover", ()=>{changeTeamPrompt(teamPrompts[i])});
});

function changeTeamPrompt(prompt){
    document.querySelector("#info-box").innerHTML = prompt;
}

