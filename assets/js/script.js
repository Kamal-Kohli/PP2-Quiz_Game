var you;
var yourScore = 0;
var opponent;
var opponentScore = 0;

var choices = ["R", "S", "P"];

window.onload = function() {
    for (let i = 0; i < 3; i++) {
        // <img id="r" src="R.png">
        let choice = document.createElement("img");
        choice.id = choices[i];
        choice.src = choices[i] + ".png";
        choice.addEventListener("click", selectChoice);
        document.getElementByClass("choices").append(choice);
    }
}
