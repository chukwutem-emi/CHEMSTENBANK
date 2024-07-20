document.addEventListener("DOMContentLoaded", () => {
    const formEl = document.getElementById("sign-up-form");
    formEl.addEventListener("submit", handleSignUp);
});
function handleSignUp(event) {
    event.preventDefault()
    const formEl = document.getElementById("sign-up-form");
    const userNameEl = formEl.querySelector(".username").value;
    const emailAddressEl = formEl.querySelector(".email-address").value;
    const passwordEl = formEl.querySelector(".password").value;
    const button = formEl.querySelector(".btn");
    button.innerHTML = "Processing.......";
    button.style.cursor = "progress";
    const dpMsgEl = document.querySelector(".rmMsg");
    const messageDisplayEl = document.querySelector(".msg-hidden")

        
    const data = {
        username: userNameEl,
        email_address: emailAddressEl,
        password: passwordEl,
    }

    const url = "https://bank-web-application-1.onrender.com/register";
    fetch(url, {
        headers: {
            "content-Type":"application/json",
        },
        method: "POST",
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json();
    }).then((responseData) => {
        const message = responseData.message;
        messageDisplayEl.innerHTML = message;
        messageDisplayEl.style.background = "green";
        alert("Account created successfully!");
        dpMsgEl.classList.add("dpMsg");
        window.scrollTo(0, document.body.scrollHeight);
        console.log(message);
        button.style.cursor = "pointer";
        button.innerHTML = "submit";
        setTimeout(() => {
            window.location.href = "Login_form.html";
        }, 4000);
        
    }).catch((error) => {
        button.innerHTML = "submit";
        button.style.cursor = "pointer";
        messageDisplayEl.innerHTML = "An error occurred in the course of your sign-up, please try again!", error;
        messageDisplayEl.style.background = "red";
        dpMsgEl.classList.add("dpMsg");
        window.scrollTo(0, document.body.scrollHeight);
    })
    
}
const btsEl = document.querySelector(".bts");
btsEl.addEventListener("click", removeRespMsg);

function removeRespMsg() {
    document.querySelector(".rmMsg").style.display = "none";
    location.reload()
}