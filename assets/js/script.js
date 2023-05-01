var user;
var userScore = 0;
var cpu;
var cpuScore = 0;

var optionChoices = ["r", "s", "p"];

window.onload = function() {
    for (let i = 0; i < 3; i++) {
        let choice = document.createElement("img");
        choice.class = optionChoices[i];
        choice.src = optionChoices[i] + ".png";
        choice.addEventListener("click", selectChoice);
        document.getElementByClass("optionChoices").append(choice);
    }
}

function selectChoice() {
    user = this.class;
    document.getElementByClass("user-choice").src = user + ".png";

    //random for cpu
    cpu = optionChoices[Math.floor(Math.random() * 3)]; //0- .999999 * 3 = 0-2.99999
    document.getElementByClass("cpu-choice").src = cpu + ".png";

    //check for winner
    if (user == cpu) { 
        userScore += 1;
        cpuScore += 1;
    }
    else {
        if (you == "r") {
            if (cpu == "s") {
                userScore += 1;
            }
            else if (cpu == "p") {
                cpuScore += 1;
            }
        }
        else if (user == "s") {
            if (cpu == "p") {
                userScore += 1;
            }
            else if (cpu == "r") {
                cpuScore += 1;
            }
        }
        else if (user == "p") {
            if (cpu == "r") {
                userScore += 1;
            }
            else if (cpu == "s") {
                cpuScore += 1;
            }
        }
    }

    document.getElementByClass("user-score").innerText = userScore;
    document.getElementByClass("cpu-score").innerText = cpuScore;
}