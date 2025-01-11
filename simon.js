let gameSequence = [];
let userSequenceIndex = 0; // Index at which we have to check user choice with actual one.
let isStarted = false; // Game started or not
let level = 0; // Current level

let colorBtn = ["cranberry","tangerine","pewterBlue","periwinkleBlue"]; // To generate random color

let highestScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress" , function(){
    if(!isStarted){
        isStarted = true;
        levelUp();
    }
});

function flash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    }, 250);
}

function levelUp(){

    userSequenceIndex = 0;
    level++;
    h2.innerText = `Level ${level}`;

    let colorIdx = Math.floor(Math.random()*4);
    let randomColor = colorBtn[colorIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSequence.push(randomColor);

    flash(randomBtn);
}

function btnPress(){
    let btn = this;
    flash(btn);

    let userColor = btn.getAttribute("id");
    if(gameSequence[userSequenceIndex] === userColor){
        userSequenceIndex++;
        if(gameSequence.length == userSequenceIndex){
            setTimeout(levelUp , 500);
        }
    } else{
        h2.innerHTML = `Game Over! Your score is <b>${level}</b>. <br>Press any key to start the game again.`;
        if(highestScore < level){
            highestScore = level;
        }
        let h3 = document.querySelector("h3");
        if(highestScore != 0){
            h3.innerHTML = `Highest Score: ${highestScore}`;
        }

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        isStarted = false;
        level = 0;
        gameSequence = [];
    }
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns){
    btn.addEventListener("click" , btnPress);
}