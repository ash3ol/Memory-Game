let boxs = Array.from(document.querySelectorAll(".game-block"));
let boxsL = boxs.length;
let tries = document.querySelector(".tries span");

//opining
window.addEventListener("load", () => {
    document.getElementById("opining").play(); 
});


//start
document.querySelector(".start span").addEventListener("click" , ()=> {
    let prom = prompt("what's your name?");
    if(prom === null || prom === "") {
        document.querySelector(".name span").textContent = "Unknown";
        localStorage.setItem("Name","Unknown");
    } else {
        document.querySelector(".name span").textContent = prom;
        localStorage.setItem("Name",`${prom}`);
    };
    document.querySelector(".start").remove();
    boxs.forEach((box) => {
        box.classList.add("fliped");
        setTimeout(() => {
            box.classList.remove("fliped");
        }, duration);
    }, duration);
    document.querySelector(".score").remove();
    document.querySelector(".result").remove();
});


//making the random array

let orderIndex = Array.from(boxs.keys());
//the duration
let duration = 1000;

shuffle(orderIndex);
//making the current index of order = the random index with the loop
boxs.forEach((box , i) => {
    box.style.order = orderIndex[i];
    //add the fliped function in foEach
    box.addEventListener("click", ()=> {
        AddFlipped(box);
    });
});


//making the shuffle that makes the random array as a random one
function shuffle(Arr) {
    let current = boxsL,
    temp,
    random;
    while(current > 0) {
        random = Math.floor(Math.random() * current);
        current--
        //putting the current index in a storage
        temp = Arr[current];
        //making the current index = index of random
        Arr[current] = Arr[random];
        //Making the random index = the stored one
        Arr[random] = temp;
    } 
    return Arr;
};


//adding flipped active function
function AddFlipped(e) {
    e.classList.add("fliped");
    let allflippedBoxs = boxs.filter(e => e.classList.contains("fliped"));
    if(allflippedBoxs.length === 2) {
        stopClicking();
        chicking(allflippedBoxs[0], allflippedBoxs[1]);
    };
};
//stop the clicking function after reaching 2 boxs
function stopClicking() {
    document.querySelector(".tech-container").classList.add("stop-clicking");
    setTimeout(() => {
        document.querySelector(".tech-container").classList.remove("stop-clicking");
    }, duration);
};


function chicking(box1, box2) {
    if(box1.dataset.techno === box2.dataset.techno) {
        box1.classList.remove("fliped");
        box2.classList.remove("fliped");
        box1.classList.add("match");
        box2.classList.add("match");
        document.getElementById("success").play();
    } else {
        tries.innerHTML = `${parseInt(tries.textContent) + 1} / 20`
        if(tries.innerHTML === "20 / 20") {
            location.reload();
            localStorage.setItem("result", "Game Over");
        };
        document.getElementById("fail").play();
        setTimeout(() => {
            box1.classList.remove("fliped");
            box2.classList.remove("fliped");
        }, duration);
        localStorage.setItem("tries", `${tries.innerHTML}`);
    };
    match();
};

function match() {
    let match = boxs.filter((e) => e.classList.contains("match"));
    if(match.length === 20) {
        boxs.forEach((e) => {
            setTimeout(() => {
                location.reload();
                document.getElementById("opining").play();
                localStorage.setItem("result", "We Have A Winner");
            }, duration);
        });
    };
};


if(localStorage.getItem("Name") && localStorage.getItem("tries") && localStorage.getItem("result")){
    document.querySelector(".name-score").textContent = `Player Name: ${localStorage.getItem("Name")}`;
    document.querySelector(".tries-score").textContent = `Your wrong Tryings: ${localStorage.getItem("tries")}`;
    document.querySelector(".result").textContent = `${localStorage.getItem("result")}`
};

