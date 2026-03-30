const problemSection = document.getElementById("problem_sec");
const pointsSection = document.getElementById("points_sec");
const imageSection = document.getElementById("image_sec");
const endSection = document.getElementById("end_sec");
const problemButton = document.getElementById("new_problem");
const timerText = document.getElementById("timer_text");
const timerDurationSec = 3;
let timerCountdown;
let gameOver = false;
let points = 0;

//preloads the images as on load takes too long for 2 second waiting period
const checkmarkImgPreload = new Image();
checkmarkImgPreload.src = "images/green_checkmark.png";

const xImgPreload = new Image();
xImgPreload.src = "images/red_x.png";


function create_problem(a, b){
    if(gameOver){
        return;
    }

    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.placeholder = "Enter answer here";
    inputBox.style.width = "200px";
    inputBox.id = "answer_box";

    const inputBoxLabel = document.createElement("label");
    inputBoxLabel.htmlFor = inputBox.id;
    inputBoxLabel.textContent = `${a} x ${b} = `;
    inputBoxLabel.id = "answer_box_label";

    timerText.textContent = `Time: ${timerDurationSec}`;

    const inputEvent = inputBox.addEventListener('keydown', (e) => {
        if(gameOver){
            inputBox.removeEventListener('keydown', inputEvent);
            return;
        }

        if(e.key == "Enter"){
            const answer = inputBox.value;
            const correct = check_answer(a, b, answer);

            if(correct){
                clearInterval(timerCountdown);
                points += 1;
                display_points();
                create_checkmark();
            }else{
                clearInterval(timerCountdown);
                create_x();
                inputBox.removeEventListener('keydown', inputEvent);
                endGame("answered a question incorrectly");
                return;
            }

            resetTimeout = setTimeout(reset_problem, 2000);//will wait 2 seconds and then execute reset_problem
        }
    });


    problemSection.append(inputBoxLabel, inputBox);
    inputBox.focus(); //put the user's cursor in the text box
    startTimer();
}

function create_checkmark(){
    const checkmarkImg = document.createElement("img");
    checkmarkImg.src = "images/green_checkmark.png";
    checkmarkImg.width = 30;
    checkmarkImg.height = 30;
    checkmarkImg.id = "checkmark_img";

    imageSection.append(checkmarkImg);
}

function create_x(){
    const xImg = document.createElement("img");
    xImg.src = "images/red_x.png";
    xImg.width = 30;
    xImg.height = 30;
    xImg.id = "x_img";

    imageSection.append(xImg);
}

function startTimer(){
    let tempDuration = timerDurationSec;

    timerCountdown = setInterval(() => {
        tempDuration--;

        if(tempDuration == -1){
            clearInterval(timerCountdown);
            endGame("ran out of time");
            return;
        }
        display_sec(tempDuration);
    }, 1000);
}

function display_sec(sec){
    timerText.textContent = `Time: ${sec}`;
}

function display_points(){
    const pointsText = document.getElementById("pointsText");
    pointsText.textContent = `Points: ${points}`;

}

function get_random_int(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function check_answer(a, b, ans){
    if(a*b == ans){
        return true;
    }else{
        return false;
    }
}

function reset_problem(){
    const inputBox = document.getElementById("answer_box");
    const inputBoxLabel = document.getElementById("answer_box_label");
    const checkmarkImg = document.getElementById("checkmark_img");
    const xImg = document.getElementById("x_img");

    inputBox?.remove();
    inputBoxLabel?.remove();

    //here, add ? so that it will only run if it is not null
    checkmarkImg?.remove();
    xImg?.remove();

    create_problem(get_random_int(0, 12), get_random_int(0, 12));
}

problemButton.addEventListener('click', () => {
    gameOver = false;
    points = 0;

    display_points();

    const failText = document.getElementById("fail_text");
    failText?.remove();

    reset_problem();
});

async function endGame(fail_message){
    gameOver = true;

    const failText = document.createElement("p");
    failText.textContent = `You ${fail_message} and the game has ended.`;
    failText.id = "fail_text"

    endSection.append(failText);
    try{
        await fetch("/submit_score", {
            method: "POST",
            body: JSON.stringify({
                score: points,
                game_id: 3
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    } catch (e){
        console.log(e);
    }

    failText.textContent = `You ${fail_message} and the game has ended. Your score has been recorded. Thank you for playing!`;
}
