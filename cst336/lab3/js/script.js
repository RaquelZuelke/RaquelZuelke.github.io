//event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCountries);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
});
document.querySelector("#password").addEventListener("focus", showSuggestedPassword);

window.onload = loadStates;
//functions
//Displaying city from Web API after entering a zip code
async function displayCity(){
    let zipCode = document.querySelector("#zip").value;
    //alert(document.querySelector("#zip").value)
    //console.log(zipCode);
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();

    if(!data.city){
        document.querySelector("#city").innerHTML = "Zip code not found";
        document.querySelector("#latitude").innerHTML = "";
        document.querySelector("#longitude").innerHTML = "";
        return;
    }
    //console.log(data);
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
}

//displaying countries form web API based on the two-letter abbreviation of a state
async function displayCountries(){
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for (let i of data) {
        countyList.innerHTML += `<option> ${i.county} </option>`;
    }
}

async function loadStates() {
    let url = `https://csumb.space/api/allStatesAPI.php`;
    let response = await fetch(url);
    let data = await response.json();

    let stateSelect = document.querySelector("#state");
    stateSelect.innerHTML = "<option value=''>Select One</option>";

    for(let i of data){
        stateSelect.innerHTML += `<option value="${i.usps}">${i.state}</option>`;
    }
}

async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError")
    if(data.available) {
        usernameError.innerHTML = " Username available!";
        usernameError.style.color = "green";
    } else {
        usernameError.innerHTML = " Username taken";
        usernameError.style.color = "red";
    }
}
//validating form data
function validateForm(e){
    let isValid = true;
    let username = document.querySelector("#username").value;
    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username Required!";
        isValid = false;
    }

    let pwd = document.querySelector("#password").value;
    let retype = document.querySelector("#retypePassword").value;
    let pwdError = document.querySelector("#passwordError");

    pwdError.innerHTML = "";

    if(pwd.length < 6) {
        pwdError.innerHTML = "Password must be at least 6 characters long.";
        pwdError.style.color = "red";
        isValid = false;
    }

    if(pwd !== retype) {
        pwdError.innerHTML += " Passwords do not match.";
        pwdError.style.color = "red";
        isValid = false;
    }

    if(!isValid){
        e.preventDefault();
    }
}

async function showSuggestedPassword() {
    let response = await fetch(`https://csumb.space/api/suggestedPassword.php?length=8`);
    let data = await response.json();

    document.querySelector("#suggestedPwd").innerHTML = "Suggested Password: " + data.password;
    document.querySelector("#suggestedPwd").style.color = "blue";
}
