window.addEventListener("load", () => {
    if (!localStorage.getItem("token")) {
        location.href = "../../../index.html"
    }
})
let token = localStorage.getItem("token")
let oldpassword = document.getElementById("password");
let newPassword = document.getElementById("new-password")
let form = document.forms[0];
let btn = document.querySelector("button")

form.addEventListener("submit", function (e) {
    e.preventDefault();
    try {
        fetch("https://task-manager-api-fgcs.onrender.com/api/v1/auth/update-password", {
            method: "PATCH",
            body: JSON.stringify({
                oldPassword: oldpassword.value,
                newPassword: newPassword.value,
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            }

        }).then((getJson) => getJson.json())
            .then((getData) => {
                localStorage.setItem("token", `${getData.data.token}`)
                token = getData.data.token
                location.href = '../tasker/tasker.html'
            })
    } catch (err) {
        console.log(err);
    }
})

