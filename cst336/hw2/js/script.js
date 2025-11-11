//Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

//Global variables
var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ4Choices();
displayQ8Choices();

//Functions
function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
     for(let i=0; i < q4ChoicesArray.length; i++){
        document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}"
            value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}">${q4ChoicesArray[i]}</label> `;
    }
}

function displayQ8Choices(){
    let q8ChoicesArray = ["San Andreas", "Hayward", "Garlock"];
    q8ChoicesArray = _.shuffle(q8ChoicesArray);

    let container = document.querySelector("#q8Choices");
    container.innerHTML = "";

    for(let i = 0; i < q8ChoicesArray.length; i++) {
        let id = q8ChoicesArray[i].toLowerCase().replace(/\s/g, "_");
        let value = id;

        container.innerHTML +=`
            <input type="radio" name="q8" id="${id}" value="${value}">
            <label for="${id}">${q8ChoicesArray[i]}</label><br>`;
   }
}


function isFormValid() {
    let isValid = true;
    if(document.querySelector("#q1").value == "") {
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
    }
    return isValid;
}

function rightAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png'>"
    score += 10;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz() {
    console.log("Grading quiz...");
    document.querySelector("#validationFdbk").innerHTML = ""; //resets validation feedback
    if (!isFormValid()) {
        return;
    }

    //variables
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    let q5Response = document.querySelector("input[name=q5]:checked") ?.value?.toLowerCase() || "";
    let q6Response = document.querySelector("#q6").value.toLowerCase();
    let q7Response = document.querySelector("#q7").value;
    let q8Response = document.querySelector("input[name=q8]:checked")?.value?.toLowerCase() || "";
    let q9Response = document.querySelector("#q9").value.toLowerCase();
    let q10Response = document.querySelector("#q10").value;
    let congrats = document.querySelector("#congratsMessage");

    console.log(q1Response);

    //Grading question 1
    if(q1Response == "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);        
    }

    //Grading question 2
    if(q2Response == "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    //Grading question 3
    if(document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked){
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    //Grading question 4
    if(q4Response == "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    //Grading Question 5
    if(q5Response ==="true"){
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    //Grading question 6
    if(q6Response == "hawaii"){
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    //Grading question 7
    if(q7Response.toLowerCase() === "denali"){
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    //Grading question 8
    if(q8Response == "san_andreas"){
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }

    //Grading question 9
    if(q9Response == "yellowstone"){
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    //Grading question 10
    if(q10Response == "arizona"){
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    let totalScore = document.querySelector("#totalScore");
    totalScore.innerHTML = `Total Score: ${score}`;

    //Change color based on the score
    totalScore.style.color = score < 80 ? "red" : "green"; 

    congrats.innerHTML = score >= 80 ? "Congratulations!!!!": "";
    congrats.style.color = "green";

    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    localStorage.setItem("total_attempts", attempts);


}

