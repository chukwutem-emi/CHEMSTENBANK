function getUserName() {
    const getUser = JSON.parse(localStorage.getItem("data"));
    if (getUser) {
        console.log("Stored username:", getUser.username);
        return getUser.username;
    }
    console.error("Username not found!");
    return null;
}
function getToken() {
    const getUserToken = JSON.parse(localStorage.getItem("token"));
    if (getUserToken) {
        console.log("Stored User Token:", getUserToken)
        return getUserToken;
    }
    console.error("Token not found!");
    return null;
}

document.addEventListener("DOMContentLoaded", () => {
    const withdrawFormEl = document.querySelector(".withdrawForm");
    withdrawFormEl.addEventListener("submit", handleWithdraw);
});
function handleWithdraw(event) {
    event.preventDefault();
    const withdrawFormEl = document.querySelector(".withdrawForm");
    const withdrawAmountEl = withdrawFormEl.querySelector(".withdrawAmount").value;
    const withdrawButtonEl = withdrawFormEl.querySelector(".withdrawButton");
    withdrawButtonEl.innerHTML = "sending, please wait.....";
    withdrawButtonEl.style.cursor = "wait";
    const withdrawMsgEl = document.querySelector(".withdrawMsg-hidden");
    const withdrawUserEl = getUserName();
    const withdrawTokenEl = getToken();
    const withdrawMsgShowEl = document.querySelector(".withdrawMsg");

    const withdrawData = {
        amount:withdrawAmountEl,
        username:withdrawUserEl,
    }
    const withdrawUrl = "https://bank-web-application-1.onrender.com/withdraw";
    fetch(withdrawUrl, {
        headers: {
            "content-type": "application/json",
            "A-access-token": `Bearer ${withdrawTokenEl}`,
        },
        method: "POST",
        body: JSON.stringify(withdrawData)
    }).then((withdrawResponse) => {
        if (!withdrawResponse) {
            if (withdrawResponse === 401) {
                throw new Error("Unauthorize, Invalid token provided!");
            }
        }
        return withdrawResponse.json();
    }).then((withdrawResponseData) => {
        const withdrawMessage = withdrawResponseData.withdraw;
        alert(`Hi ${withdrawUserEl}, Your transaction was successful!. Thanks for banking with us`);
        withdrawMsgShowEl.innerHTML = withdrawMessage;
        withdrawMsgShowEl.style.background = "green";
        withdrawButtonEl.innerHTML = "submit";
        withdrawButtonEl.style.cursor = "pointer";
        withdrawMsgEl.classList.add("withdrawMsg-display");
        window.scrollTo(0, document.body.scrollHeight);
    }).catch(() => {
        withdrawMsgShowEl.innerHTML = "An error occurred!.Please try again later";
        withdrawMsgShowEl.style.background = "red";
        withdrawButtonEl.innerHTML = "submit";
        withdrawButtonEl.style.cursor = "pointer";
        withdrawMsgEl.classList.add("withdrawMsg-display")
        window.scrollTo(0, document.body.scrollHeight);
    })
}
const withdrawCancelBtnEl = document.querySelector(".withdrawCancelBtn");
withdrawCancelBtnEl.addEventListener("click", cancelWithdrawMsg);

function cancelWithdrawMsg() {
    document.querySelector(".withdrawMsg-hidden").style.display = "none";
    window.location.reload();
}