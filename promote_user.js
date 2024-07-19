function adminToken() {
    const promotionToken = JSON.parse(localStorage.getItem("token"));
    if (promotionToken) {
        console.log("retrieve token:", promotionToken);
        return promotionToken;
    } else {
        console.error("Token not found!");
        return null;
    }
}
function getPublicId() {
    const adminPublicId = JSON.parse(localStorage.getItem("data"));
    if (adminPublicId) {
        console.log("Admin Public Id:", adminPublicId.public_id);
        return adminPublicId.public_id;
    } else {
        console.error("No Public Id!");
        return null;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const adminFormEl = document.querySelector(".adminForm");
    adminFormEl.addEventListener("submit", handleAdminUpdate);
});
function handleAdminUpdate(event) {
    event.preventDefault();
    const adminFormEl = document.querySelector(".adminForm");
    const adminUserNameEl = adminFormEl.querySelector(".adminUserName").value;
    const adminEmailAddressEl = adminFormEl.querySelector(".adminEmailAddress").value;
    const adminPasswordEl = adminFormEl.querySelector(".adminPassword").value;
    const adminTokenEl = adminToken();
    const publicIdEl = getPublicId();
    const adminBtnEl = adminFormEl.querySelector(".adminBtn");
    const responseMsgContainerEl = document.querySelector(".responseMsg-container");
    const responseMsgEl = document.querySelector(".responseMsg");
    adminBtnEl.innerHTML = "Processing, please wait!.....";
    adminBtnEl.style.cursor = "wait";

    const adminData = {
        username:adminUserNameEl,
        email_address:adminEmailAddressEl,
        password:adminPasswordEl,
    }

    const adminUrl = `https://bank-web-application-1.onrender.com/admin/${publicIdEl}`;
    fetch(adminUrl, {
        headers: {
            "content-type":"application/json",
            "A-access_token":`Bearer ${adminTokenEl}`,
        },
        method:"PUT",
        body:JSON.stringify(adminData)
    }).then((adminMsgResponse) => {
        if (!adminMsgResponse) {
            if(adminMsgResponse === 401) {
                responseMsgEl.innerHTML = "Unauthorized!";
            }
        }
        return adminMsgResponse.json();
    }).then((adminMsgResponseData) => {
        const adminMessage = adminMsgResponseData.message;
        if (adminMessage) {
            responseMsgEl.innerHTML = adminMessage;
            responseMsgEl.style.background = "green"
            setTimeout(() => {
                adminBtnEl.innerHTML = "Successful"; 
            }, 3000);
            alert(`${adminUserNameEl} promoted successfully!`);
            adminBtnEl.innerHTML = "Submit";
            adminBtnEl.style.cursor = "pointer";
            responseMsgContainerEl.classList.add("responseMsgContainer-display");
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(() => {
                window.location.href = "user_profile.html";
            }, 7000);
        } else {
            responseMsgEl.innerHTML = adminMsgResponseData.error;
            responseMsgEl.style.background = "red";
            adminBtnEl.innerHTML = "Submit";
            adminBtnEl.style.cursor = "pointer";
            responseMsgContainerEl.classList.add("responseMsgContainer-display");
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(() => {
                window.location.href = "Login_form.html";
            }, 7000);
        }
    }).catch(() => {
        responseMsgEl.innerHTML = "An error occurred!.Try again later";
        responseMsgEl.style.background = "red";
        adminBtnEl.innerHTML = "Submit";
        adminBtnEl.style.cursor = "pointer";
        responseMsgContainerEl.classList.add("responseMsgContainer-display");
        window.scrollTo(0, document.body.scrollHeight);
    })
}
const cancelResponseMsg = document.querySelector(".cancelResponseMsg");
cancelResponseMsg.addEventListener("click", cancelAdminResponse);

function cancelAdminResponse() {
    document.querySelector(".responseMsg-container").style.display = "none";
    window.location.reload();
}