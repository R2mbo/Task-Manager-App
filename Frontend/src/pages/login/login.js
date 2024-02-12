let email = document.getElementById("email")
let password = document.getElementById("password")
let form = document.forms[0]

window.addEventListener('load', () => {
    if (localStorage.getItem('token')) {
        location.href = '../tasker/tasker.html'
    }
})
form.addEventListener("submit", function (e) {
    e.preventDefault();
    try {
        fetch("https://task-manager-api-fgcs.onrender.com/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: email.value,
                password: password.value
            }),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(async (data) => await data.json())
            .then((data) => {
                localStorage.setItem("token", `${data.data.token}`)
                localStorage.setItem("id", `${data.data.user._id}`)
                location.href = '../tasker/tasker.html'
            })
    } catch (err) {
        console.log(err)
    }
})