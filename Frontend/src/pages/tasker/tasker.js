window.FontAwesomeConfig = { autoReplaceSvg: false };
let userButton = document.getElementById("userBtn");
let dropdown = document.getElementsByClassName("drop-down")[0];
let logoutButton = document.getElementById("log-out");
let burgerButton = document.getElementById("burger");
let asideList = document.querySelector("aside");
// For Aside List
burgerButton.addEventListener("click", function () {
    asideList.classList.toggle("-translate-x-[50rem]")
})
// drop down menu hide and view
userButton.addEventListener("click", function () {
    dropdown.classList.toggle("hidden")
})
// Check for Visibilty in Drop Down List and aside List
document.addEventListener("click", function (e) {
    if (!e.target.matches("#userBtn") && !dropdown.classList.contains("hidden")) {
        dropdown.classList.add("hidden")
    }
    if (!e.target.matches("#burger") && !e.target.matches("aside") && !asideList.classList.contains("-translate-x-80")) {
        asideList.classList.add("-translate-x-[50rem]")
    }
})

// Dynamic Welcome Text
window.addEventListener("load", function () {
    if (localStorage.getItem("token")) {
        let token = this.localStorage.getItem("token");
        try {
            fetch("https://task-manager-api-fgcs.onrender.com/api/v1/users/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then((obj) => obj.json())
                .then((data) => {
                    this.localStorage.setItem('id', `${data.data.currentUser._id}`)
                    userButton.innerHTML = `Welcome ${data.data.currentUser.username}`
                })
        } catch (err) {
            console.log(err)
        }
    } else {
        this.location.href = '../../../index.html'
    }
})

//  LogOut
logoutButton.addEventListener('click', function () {
    let token = localStorage.getItem("token");
    try {
        fetch('https://task-manager-api-fgcs.onrender.com/api/v1/auth/logout', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(() => {
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            location.href = '../../../index.html'
        })
    } catch (err) {
        console.log(err)
    }
})
// Create New Task Button

let createTaskButton = document.getElementById("create-task");
let createTaskCard = document.getElementById("create-card")
let closeCard = document.getElementById("close-create-card")
createTaskButton.addEventListener("click", function () {
    createTaskCard.classList.remove("hidden")
})

closeCard.addEventListener("click", function () {
    createTaskCard.classList.add("hidden")
})
