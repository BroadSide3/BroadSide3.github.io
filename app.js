const allBox = document.querySelectorAll(".box");
const resultContainer = document.getElementById("result");
const restartBtn = document.getElementById("restart");

const checkList = [];
let currentPlayer = "CROSS";
let winStatus = false;

function areEqual(one, two) {
    if (one === two) return one;
    return false;
}

function checkEquality(currentPlayer, array) {
    for (const item of array) {
        const a = checkList[item[0]];
        const b = checkList[item[1]];
        if (areEqual(a, b) == currentPlayer) {
            return [item[0], item[1]];
        }
    }
    return false;
}

function blinkTheBox(val) {
    if (val) {
        for (const i of val) {
            const box = document.querySelector(`[data-box-num="${i}"]`);
            box.classList.add("blink");
        }
        return true;
    }
    return false;
}

function isWin() {
    let val = false;
    if (checkList[0] == currentPlayer) {
        val = checkEquality(currentPlayer, [
            [1, 2],
            [3, 6],
            [4, 8],
        ]);
        if (val && blinkTheBox([0, ...val])) return true;
    }

    if (checkList[8] == currentPlayer) {
        val = checkEquality(currentPlayer, [
            [2, 5],
            [6, 7],
        ]);
        if (val && blinkTheBox([8, ...val])) return true;
    }

    if (checkList[4] == currentPlayer) {
        val = checkEquality(currentPlayer, [
            [1, 7],
            [3, 5],
            [2, 6],
        ]);
        if (val && blinkTheBox([4, ...val])) return true;
    }

    return val;
}

function checkWin(len) {
    if (len >= 3 && isWin()) {
        winStatus = true;
        if (currentPlayer == "CROSS") {
            resultContainer.innerText = "X Won the Match.";
        } else {
            resultContainer.innerText = "O Won the Match.";
        }
    } else if (len == 8) {
        winStatus = true;
        resultContainer.innerText = "= Match Draw.";
    }
    return winStatus;
}

function boxClick(targetBox, player, boxNum) {
    checkList[boxNum] = player;
    targetBox.classList.add(player.toLowerCase());
}

function handleBoxClick(e) {
    let len = checkList.filter(Boolean).length;
    const boxNum = parseInt(e.target.getAttribute("data-box-num"));
    let boxNumForBot;

    if (!winStatus && !checkList[boxNum]) {
        currentPlayer = "CROSS";
        boxClick(e.target, "CROSS", boxNum);

        if (checkWin(len) === false) {
            len = checkList.filter(Boolean).length;
            currentPlayer = "ZERO";
            while (len < 9) {
                boxNumForBot = Math.floor(Math.random() * 9);
                if (!checkList[boxNumForBot]) {
                    boxClick(allBox[boxNumForBot], "ZERO", boxNumForBot);
                    checkWin(len);
                    break;
                }
            }
        }
    }
}

restartBtn.addEventListener("click", function () {
    allBox.forEach((item) => {
        item.classList.remove("cross", "zero", "blink");
    });
    checkList.length = 0;
    currentPlayer = "CROSS";
    resultContainer.innerText = "";
    winStatus = false;
});

allBox.forEach((item) => {
    item.addEventListener("click", (e) => handleBoxClick(e));
});

let diceRollPlayer = 0;
let diceRollBot = 0;

document.getElementById("playerRoll").innerHTML = "0";
document.getElementById("botRoll").innerHTML = "0";
function letsRoll() {
     diceRollPlayer = Math.floor(Math.random() * 6)+1;
     diceRollBot = Math.floor(Math.random() * 6)+1;
    document.getElementById("playerRoll").innerHTML = diceRollPlayer;
    document.getElementById("botRoll").innerHTML = diceRollBot;

    if (diceRollPlayer > diceRollBot){
        document.getElementById("rollResult").innerHTML = "Player win first turn with " + diceRollPlayer + "!";
        document.getElementById('rollButton').style.display = 'none';

    } else if (diceRollPlayer == diceRollBot){
        letsRoll()
        // diceRollPlayer = Math.floor(Math.random() * 6);
        // diceRollBot = Math.floor(Math.random() * 6);
        // document.getElementById("rollResult").innerHTML = "Tie, Roll again!";
    }
    else {
        document.getElementById("rollResult").innerHTML = "Bot win first turn with " + diceRollBot + "!";
        let botFirst = Math.floor(Math.random() * 9);
            boxClick(allBox[botFirst], "ZERO", botFirst);
        document.getElementById('rollButton').style.display = 'none';
    }

}

function refreshPage(){
    window.location.reload();
}