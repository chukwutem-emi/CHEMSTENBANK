function getProfileToken() {
    const profileTokenEl = JSON.parse(localStorage.getItem("token"));
    if (profileTokenEl) {
        console.log("profile token:", profileTokenEl);
        return profileTokenEl;
    } else {
        console.error("No token found!");
        return null;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const userProfileEl = document.querySelector(".userProfile");
    userProfileEl.addEventListener("click", handleUserProfile);
});
function handleUserProfile(event) {
    event.preventDefault();
    const userProfileEl = document.querySelector(".userProfile");
    const profileMsgConEl = document.querySelector(".profileMsg-container");
    const profileMsgEl = document.querySelector(".profileMsg");
    const profileEl = getProfileToken();
    const profileBodyEl = document.querySelector(".profileBody");
    userProfileEl.innerHTML = "Fetching your details, please wait....";
    userProfileEl.style.cursor = "wait";
    profileBodyEl.style.cursor = "wait"
    

    const profileUrl = "https://bank-web-application-1.onrender.com/user";
    fetch(profileUrl, {
        headers: {
            "content-type": "application/json",
            "A-access-token": `Bearer ${profileEl}`,
        },
        method: "GET"
    }).then((profileResponse) => {
        return profileResponse.json();
    }).then((profileResponseData) => {
        const messageEl = profileResponseData.user;
        localStorage.setItem("data", JSON.stringify(messageEl));
        console.log(messageEl);
        const getUserLocalStorage = JSON.parse(localStorage.getItem("data"));
        profileMsgEl.innerHTML = `USERNAME: ${getUserLocalStorage.username},<br> EMAIL ADDRESS: ${getUserLocalStorage.email_address},<br> PUBLIC ID: ${getUserLocalStorage.public_id},<br> ACCOUNT NUMBER: ${getUserLocalStorage.account_number},<br> ACCOUNT BALANCE: ${getUserLocalStorage.account_balance},<br> CREATED AT: ${getUserLocalStorage.created_at},<br> ADMIN: ${getUserLocalStorage.Admin}`;
        profileMsgEl.style.background = "";
        profileMsgConEl.classList.add("profile-display");
        userProfileEl.innerHTML = "successful!";
        setTimeout(() => {
            userProfileEl.innerHTML = "check your profile";
        }, 3000);
        setTimeout(() => {
           window.location.href = "index.html"; 
        }, 30000 );
        userProfileEl.style.cursor = "pointer";
        profileBodyEl.style.cursor = "pointer";
        window.scrollTo(0, document.body.scrollHeight);
    }).catch(()=> {
        profileMsgEl.innerHTML = "An error occurred! try again later or you can also login again because token normally expires after 60 minutes. Thank you!";
        profileMsgEl.style.color = "white";
        profileMsgConEl.classList.add("profile-display");
        userProfileEl.innerHTML = "check  profile";
        userProfileEl.style.cursor = "pointer";
        profileBodyEl.style.cursor = "pointer";
        profileMsgEl.style.background = "red";
        setTimeout(() => {
            window.location.href = "Login_form.html"; 
         }, 8000 );
         window.scrollTo(0, document.body.scrollHeight);
    })
    const cancelProfileEl = document.querySelector(".cancelProfile");
    cancelProfileEl.addEventListener("click", cancelProfileMsg);
    
    function cancelProfileMsg() {
        document.querySelector(".profileMsg-container").style.display = "none";
        location.reload();
    }
}

