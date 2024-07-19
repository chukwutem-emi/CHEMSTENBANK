function retrieveToken() {
    const getMyToken = JSON.parse(localStorage.getItem("token"));
    if (getMyToken) {
        console.log("My token:", getMyToken);
        return getMyToken;
    } else if (!getMyToken) {
        console.log("There is no token!");
        return null;
    } else {
        console.error("An error occurred!");
        return null;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const updateFormEl = document.querySelector(".updateForm");
    updateFormEl.addEventListener("submit", handleUpdate);
});
function handleUpdate(event) {
    event.preventDefault();
    const updateFormEl = document.querySelector(".updateForm");
    const updateUserNameEl = updateFormEl.querySelector(".updateUserName").value;
    const updateEmailAddressEl = updateFormEl.querySelector(".updateEmailAddress").value;
    const updatePasswordEl = updateFormEl.querySelector(".updatePassword").value;
    const updateBtnEl = updateFormEl.querySelector(".updateBtn");
    const updateContainerEl = document.querySelector(".updateContainer");
    const updateMsgEl = document.querySelector(".updateMsg");
    updateBtnEl.innerHTML = "Updating profile, please wait.....";
    updateBtnEl.style.cursor = "wait";
    const myTokenEl = retrieveToken();

    const updateData = {
        username:updateUserNameEl,
        email_address:updateEmailAddressEl,
        password:updatePasswordEl,
    }
    const updateUrl = "https://bank-web-application-1.onrender.com/update";

    fetch(updateUrl, {
        headers: {
            "content-type": "application/json",
            "A-access-token": `Bearer ${myTokenEl}`,
        },
        method: "PUT",
        body:JSON.stringify(updateData)
    }).then((updateResponse) =>{
        if (!myTokenEl || myTokenEl === 401) {
            updateMsgEl.innerHTML = "Unauthorized!, token is missing";
            updateMsgEl.style.background = "red";
            updateBtnEl.style.cursor = "not-allowed";
            window.location.href = "Login_form.html";
        }
        return updateResponse.json();
    }).then((updateResponseData) => {
        const updateMessage = updateResponseData.update;
        if (updateResponseData) {
            updateBtnEl.style.cursor = "pointer";
            updateBtnEl.innerHTML = "Successful!"
            setTimeout(() => {
                updateBtnEl.innerHTML = "Submit";
            }, 3000);
            updateContainerEl.classList.add("updateContainer-display");
            updateMsgEl.innerHTML = updateMessage;
            updateMsgEl.style.background = "green";
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(() => {
                window.location.href = "user_profile.html";
            }, 4000);
        } else {
            updateContainerEl.classList.add("updateContainer-display");
            updateMsgEl.innerHTML = `Update failed ${updateResponseData.error}`;
            updateMsgEl.style.background = "red";
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(() => {
                window.location.href = "Login_form.html";
            }, 5000);
        }
    }).catch(() => {
        updateBtnEl.style.cursor = "pointer";
        updateBtnEl.innerHTML = "Failed!"
        updateBtnEl.style.background = "red";
        window.scrollTo(0, document.body.scrollHeight);
        updateContainerEl.classList.add("updateContainer-display");
        updateMsgEl.innerHTML = "An error occurred!, try again later or can you can re-login to get a new access. Thank you!";
        setTimeout(() => {
            updateBtnEl.innerHTML = "Submit";
            updateBtnEl.style.background = "darkblue";
        }, 3000);
        setTimeout(() => {
            window.location.href = "Login_form.html"; 
        }, 4000);
    })
}
const cancelUpdateBtnEl = document.querySelector(".cancelMsgBtn");
cancelUpdateBtnEl.addEventListener("click", cancelUpdateBtn);
function cancelUpdateBtn() {
    document.querySelector(".updateContainer").style.display = "none";
    window.location.reload();
}