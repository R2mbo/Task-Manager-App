window.addEventListener("load", () => {
    if (!localStorage.getItem("token")) {
        location.href = "../../../index.html"
    }
})
let h1 = document.querySelector("h1");
let username = document.getElementById("username")
let email = document.getElementById("email")
let passwordSection = document.getElementById("password-section")
let password = document.getElementById("password");
let editInfoButton = document.getElementById("editInfo")
let confirmEditButton = document.createElement("input");
confirmEditButton.className = "hidden bg-black w-fit text-white text-sm mt-2 cursor-pointer font-semibold px-5 py-2 rounded-lg"
confirmEditButton.value = "Done";
confirmEditButton.type = "submit";
passwordSection.before(confirmEditButton)
let cancelEditButton = document.createElement("button");
cancelEditButton.className = "hidden bg-black w-fit text-white text-sm mt-2 cursor-pointer font-semibold px-5 py-2 rounded-lg"
cancelEditButton.innerHTML = "Cancel";
passwordSection.before(cancelEditButton)

username.setAttribute("disabled", "")
email.setAttribute("disabled", "")
password.setAttribute("disabled", "")

// Adding Username and Email Data From the Api to The Text Boxes
let token = localStorage.getItem("token")

try {
    fetch("https://task-manager-api-fgcs.onrender.com/api/v1/users/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        }
    }).then((data) => data.json())
        .then((data) => {
            email.value = `${data.data.currentUser.email}`
            username.value = `${data.data.currentUser.username}`
            h1.innerHTML = `${data.data.currentUser.username}'s Profile`
        })
} catch (err) {
    console.log(err);
}
// Making The Buttons To Edit The Data
editInfoButton.addEventListener("click", function () {
    editInfoButton.className = "hidden bg-black w-fit text-white text-sm mt-4 cursor-pointer font-semibold px-5 py-2 rounded-lg"
    confirmEditButton.className = "bg-black w-fit text-white text-sm mt-2 mr-1 cursor-pointer font-semibold px-5 py-2 rounded-lg"
    cancelEditButton.className = "bg-black w-fit text-white text-sm mt-2 cursor-pointer font-semibold px-5 py-2 rounded-lg"
    username.removeAttribute("disabled")
    email.removeAttribute("disabled")
})
// Cancel Button Return To The Edit Info Button Again
cancelEditButton.addEventListener("click", function (e) {
    e.preventDefault();
    username.setAttribute("disabled", "")
    email.setAttribute("disabled", "")
    editInfoButton.className = "bg-black w-fit text-white text-sm mt-2 cursor-pointer font-semibold px-5 py-2 rounded-lg"
    confirmEditButton.className = "hidden bg-black w-fit text-white text-sm mt-2 mr-1 cursor-pointer font-semibold px-5 py-2 rounded-lg"
    cancelEditButton.className = "hidden bg-black w-fit text-white text-sm mt-2 cursor-pointer font-semibold px-5 py-2 rounded-lg"
})
// Done Button To Confirm The Edit

confirmEditButton.addEventListener("click", function (e) {
    e.preventDefault();
    try {
        fetch("https://task-manager-api-fgcs.onrender.com/api/v1/users/update-me", {
            method: "PATCH",
            body: JSON.stringify({
                username: username.value,
                email: email.value,
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            }
        }).then(() => location.href = './profile.html')
    } catch (err) {
        console.log(err)
    }
})