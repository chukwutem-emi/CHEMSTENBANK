function storedUserName() {
    const getLocalStorageUn = JSON.parse(localStorage.getItem("data"));
    if (getLocalStorageUn) {
        console.log("stored username:", getLocalStorageUn.username);
        return getLocalStorageUn.username;
    } else {
        console.error("username not found");
        return null;
    }
} 
function storedToken() {
    const getTokenStored = JSON.parse(localStorage.getItem("token"));
    if (getTokenStored) {
        console.log("stored token:", getTokenStored);
        return getTokenStored;
    } else {
        consol.error("Token not found!");
        return null;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const transferFormEl = document.querySelector(".transferForm");
    transferFormEl.addEventListener("submit", handleTransfer);
});
function handleTransfer(event) {
    event.preventDefault();
    const getUsernameEl = storedUserName();
    const localStorageTokenEl = storedToken();
    const transferFormEl = document.querySelector(".transferForm");
    const transferAccountNumberEl = transferFormEl.querySelector(".transferAccountNumber").value;
    const transferAmountEl = transferFormEl.querySelector(".transferAmount").value;
    const transferBtnEl = transferFormEl.querySelector(".transferBtn");
    transferBtnEl.innerHTML = "sending, please wait.......";
    transferBtnEl.style.cursor = "wait";
    const transferMsgEl = document.querySelector(".transferMsg");
    const transferCancelBtnEl = document.querySelector(".transferCancelBtn");

    const transferData = {
        username: getUsernameEl,
        account_number: transferAccountNumberEl,
        amount: transferAmountEl,
    }
    const transferUrl = "https://bank-web-application-1.onrender.com/transfer";
    fetch(transferUrl, {
        headers: {
            "content-type": "application/json",
            "A-access-token": `Bearer ${localStorageTokenEl}`,
        },
        method: "POST",
        body:JSON.stringify(transferData)
    }).then((transferResponse) => {
        if (!transferResponse) {
            if (transferResponse === 400) {
                throw new Error("Insufficient fund!");
            }
        }
        return transferResponse.json();
    }).then((transferResponseData) => {
        const transferMessage = transferResponseData.transfer;
        transferMsgEl.innerHTML = transferMessage;
        transferMsgEl.style.background = "green";
        transferBtnEl.innerHTML = "submit";
        transferBtnEl.style.cursor = "pointer";
        transferMsgEl.classList.add("transferMsg-display");
        transferCancelBtnEl.classList.add("transferCancelBtn-display");
        window.scrollTo(0, document.body.scrollHeight);
    }).catch(() => {
        transferMsgEl.innerHTML = "An error occurred!, try again later";
        transferMsgEl.style.background = "red";
        transferBtnEl.innerHTML = "submit";
        transferBtnEl.style.cursor = "pointer";
        transferMsgEl.classList.add("transferMsg-display");
        transferCancelBtnEl.classList.add("transferCancelBtn-display")
        window.scrollTo(0, document.body.scrollHeight);
    }) 
}

const tranCancelBtn = document.querySelector(".transferCancelBtn");
tranCancelBtn.addEventListener("click", cancelTransferMsg);

function cancelTransferMsg() {
    document.querySelector(".transferMsg").style.display = "none";
    location.reload();
}