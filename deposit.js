function userName() {
    const userDetails = JSON.parse(localStorage.getItem("data"));
    if (userDetails) {
        console.log("Username retrieved:", userDetails.username);
        return userDetails.username;
    }
    console.error("No user found in the local storage");
    return null;
}
function userToken() {
    const userStoredToken = JSON.parse(localStorage.getItem("token"));
    if (userStoredToken) {
        console.log("Token retrieved:", userStoredToken);
        return userStoredToken;
    }
    console.error("No token found in the local storage");
    return null;
}
document.addEventListener("DOMContentLoaded", () => {
    const depositFormEl = document.getElementById("depositForm");
    depositFormEl.addEventListener("submit", handleDeposit);
});

function handleDeposit(event) {
    event.preventDefault();
    const depositFormEl = document.getElementById("depositForm");
    const depositTokenEl =  userToken();
    const depositUserNameEl = userName();
    const depositAmountEl = depositFormEl.querySelector(".depositAmount").value;
    const depositBtnEl = depositFormEl.querySelector(".depositBtn");
    depositBtnEl.innerHTML = "Sending, please wait!.....";
    depositBtnEl.style.cursor = "wait";
    const depositMsgDisplay = document.querySelector(".depositMsg");
    const depositMsgContainerEL = document.querySelector(".depositMsg-container")
    const depositData = {
        username:depositUserNameEl,
        amount:depositAmountEl,
    }
    const depositUrl = "https://bank-web-application-1.onrender.com/deposit";
    console.log("token being send:", `Bearer ${depositTokenEl}`);
    console.log("deposit data being send:", depositData);
    fetch(depositUrl, {
        headers: {
            "content-type":"application/json",
            "A-access-token": `Bearer ${depositTokenEl}`,
        },
        method:"POST",
        body: JSON.stringify(depositData),
    }).then((depositResponse) => {
        if (!depositResponse) {
            if (depositResponse === 401) {
                throw new Error("Unauthorized!.Please check your token");
            }
        }
        return depositResponse.json();
    }).then((depositResponseData) => {
        const depositMessage = depositResponseData;
        depositMsgDisplay.innerHTML = depositMessage.deposit;
        depositBtnEl.innerHTML = "submit";
        depositBtnEl.style.cursor = "pointer";
        depositMsgDisplay.style.background = "green"
        depositMsgContainerEL.classList.add("depositMsgCon-display");
        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(() => {
            window.location.href = "user_profile.html";
        }, 4000);
    }).catch(() => {
        depositBtnEl.innerHTML = "submit";
        depositBtnEl.style.cursor = "pointer";
        depositMsgDisplay.innerHTML ="An error occurred!. please try again";
        depositMsgDisplay.style.background = "red";
        depositMsgContainerEL.classList.add("depositMsgCon-display");
        window.scrollTo(0, document.body.scrollHeight);
    })
}
const depositMsgCancelEl = document.querySelector(".depositMsgCancel");
depositMsgCancelEl.addEventListener("click", cancelDepositMsg)
function cancelDepositMsg() {
    document.querySelector(".depositMsg-container").style.display = "none";
    location.reload();
}
// depositMessage.style.wordWrap = "break-word";
// depositMessage.style.whiteSpace = "normal",
// depositMessage.style.width = "100%";