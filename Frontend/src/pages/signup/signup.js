window.addEventListener('load', () => {
    if (localStorage.getItem('token')) {
        location.href = '../tasker/tasker.html'
    }
})

let email = document.getElementById('email');
let username = document.getElementById('username');
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm_password");
let passwordSection = password.parentElement
let confirmPasswordSection = confirmPassword.parentElement
let form = document.forms[0]

form.addEventListener('submit', function (e) {
    e.preventDefault();
    try {
        fetch("https://task-manager-api-fgcs.onrender.com/api/v1/auth/signup", {
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value,
                passwordConfirm: confirmPassword.value
            }),
            headers: {
                "Content-type": "application/json"
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

