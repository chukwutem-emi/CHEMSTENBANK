document.addEventListener("DOMContentLoaded", () => {
    const formDm = document.getElementById("loginFm");
    formDm.addEventListener("submit", handleLogin);
});
function handleLogin(event) {
    event.preventDefault();
    const formDm = document.getElementById("loginFm");
    const loginEdEl = formDm.querySelector(".loginEd").value;
    const loginPwEl = formDm.querySelector(".loginPw").value;
    const loginBtnEl = formDm.querySelector(".loginBtn");
    loginBtnEl.innerHTML = "processing, please wait!........";
    loginBtnEl.style.cursor = "wait";
    const loginErrorMsgEl = document.querySelector(".loginErrorMsg-container");
    const errorMsgEl = document.querySelector(".loginErrorMsg");
    
    const userData = {
        email_address:loginEdEl,
        password:loginPwEl
    }
    const loginUrl = "https://bank-web-application-1.onrender.com/login";
    fetch(loginUrl, {
        headers: {
            "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData)
    }).then((loginResponse) => {
        return loginResponse.json();
    }).then((loginResponseData) => {
        const responseMessage = loginResponseData.Token;
        localStorage.setItem("token", JSON.stringify(responseMessage));
        if (responseMessage) {
            alert("Successful login, please note that your session will expire after 60minutes. After 60minutes you can login again to have another access");
            loginBtnEl.style.cursor = "pointer";
            loginBtnEl.innerHTML = "submit";
            loginErrorMsgEl.classList.add("loginError-display");
            errorMsgEl.classList.add("errorMsg-display");    
            errorMsgEl.innerHTML = "Login successful!";
            errorMsgEl.style.background = "green";
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(() => {
                window.location.href = "user_profile.html";
            }, 5000);
        } else {
            alert("An error occurred!.Have you signed-up?, if not sign-up now to get access. And If you have signed-up and this error still occurs, that means there is an error in your email address or password");
            errorMsgEl.innerHTML = `login failed: "${loginResponseData.message}"`;
            errorMsgEl.style.background = "red";
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(() => {
                window.location.href = "index.html"; 
            }, 120000);
        }
    }).catch((error) => {
        loginBtnEl.style.cursor = "pointer";
        loginBtnEl.innerHTML = "submit";
        loginErrorMsgEl.classList.add("loginError-display");
        errorMsgEl.classList.add("errorMsg-display");    
        errorMsgEl.innerHTML = "An error occurred!, Please try again later", error;
        errorMsgEl.style.background = "red";
        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(() => {
            window.location.href = "index.html";  
        }, 4000);
    })
}
const cancelLoginMsgEl = document.querySelector(".cancelLoginMsg");
cancelLoginMsgEl.addEventListener("click", cancelLoginMessage);
function cancelLoginMessage() {
    document.querySelector(".loginErrorMsg-container").style.display = "none";
    location.reload();
}