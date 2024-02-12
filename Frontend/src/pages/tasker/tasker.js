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

// Check for Visibilty in Drop Down List and aside List and the create task card
document.addEventListener("click", function (e) {
    if (!e.target.matches("#userBtn") && !dropdown.classList.contains("hidden")) {
        dropdown.classList.add("hidden")
    }
    if (!e.target.matches("#burger") && !e.target.matches("aside") && !asideList.classList.contains("-translate-x-80")) {
        asideList.classList.add("-translate-x-[50rem]")
    }
    if (!e.target.closest("#create-card") && !e.target.matches("#create-task") && !createTaskCard.classList.contains("hidden")) {
        createTaskCard.classList.add("hidden")
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


// Show The Tasks for the category
let section = document.createElement("section");
let main = document.querySelector("main");
let veryBigDiv = document.createElement("div");
veryBigDiv.className = "space-y-5"
section.classList.add("mt-5")
let h2 = document.createElement("h2");
h2.className = "text-3xl mx-auto sm:w-[600px] font-bold mb-6";
let token = localStorage.getItem("token");
let id = localStorage.getItem("id")

let list = document.querySelectorAll("aside ul li a");
try {
    fetch(`https://task-manager-api-fgcs.onrender.com/api/v1/users/${id}/tasks`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(async (data) => {
        location.hash = "#all_tasks"
        h2.innerHTML = "All Tasks";
        let userData = await data.json();
        let tasks = userData.data.docs;
        if (tasks.length === 0) {
            section.innerHTML = "No Tasks Found.";
            section.className = "text-center font-semibold mx-auto w-fit text-2xl mt-10";
            main.append(section)
        } else {
            section.innerHTML = '';
            section.className = '';
            h2.innerHTML = '';
            h2.className = '';
            veryBigDiv.innerHTML = '';
            for (let task of tasks) {
                // the div after the very big div contains all the task items
                let bigDiv = document.createElement("div");
                bigDiv.className = "flex items-center mx-auto bg-white px-3 shadow-md sm:w-[600px] w-full";
                // the div contains the span and label and input
                let mediumDiv = document.createElement("div");
                mediumDiv.className = "p-2 flex-grow";
                // the name of the category
                let spanInsideMediumDiv = document.createElement("span")
                spanInsideMediumDiv.className = "cursor-default";
                spanInsideMediumDiv.innerHTML = `${task.category}`;
                // contains the input and label
                let smallDiv = document.createElement("div");
                smallDiv.className = "flex items-center";
                // input checkbox
                let checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                checkBox.id = `${task.id}`;
                checkBox.className = "h-[2rem] w-[2rem] accent-black";
                // label for the task
                let taskText = document.createElement("label");
                taskText.setAttribute("for", `${task.id}`);
                taskText.className = "ml-2 py-3 w-full font-semibold text-xl"
                taskText.innerHTML = `${task.description}`;
                // Delete Button
                let deleteButton = document.createElement("i")
                deleteButton.className = "fas fa-times text-2xl cursor-pointer pt-[20px] ml-auto pt-4 text-gray-800 hover:text-black";
                deleteButton.id = `${task.id}-delete`;
                // Edit Button
                let editButton = document.createElement("i");
                editButton.className = "fas fa-edit ml-5 pt-4 cursor-pointer text-gray-800 hover:text-black text-2xl";
                editButton.id = `${task.id}-edit`
                section.prepend(h2);
                section.append(veryBigDiv);
                veryBigDiv.append(bigDiv)
                bigDiv.append(mediumDiv)
                mediumDiv.append(spanInsideMediumDiv);
                mediumDiv.append(smallDiv)
                smallDiv.append(checkBox)
                smallDiv.append(taskText)
                bigDiv.append(deleteButton)
                bigDiv.append(editButton)
                main.append(section)
            }
        }
    })
}
catch (err) {
    console.log(err)
}

for (let li of list) {
    li.addEventListener("click", function (e) {
        if (e.target.innerHTML === "All Tasks") {
            try {
                fetch(`https://task-manager-api-fgcs.onrender.com/api/v1/users/${id}/tasks`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(async (data) => {
                    location.hash = "#all_tasks"
                    h2.innerHTML = "All Tasks";
                    let userData = await data.json();
                    let tasks = userData.data.docs;

                    if (tasks.length === 0) {
                        section.innerHTML = "No Tasks Found.";
                        section.className = "text-center font-semibold mx-auto w-fit text-2xl mt-10";
                        main.append(section)

                    } else {
                        section.innerHTML = '';
                        section.className = '';
                        h2.innerHTML = '';
                        h2.className = '';
                        veryBigDiv.innerHTML = '';
                        for (let task of tasks) {
                            // the div after the very big div contains all the task items
                            let bigDiv = document.createElement("div");
                            bigDiv.className = "flex items-center mx-auto bg-white px-3 shadow-md sm:w-[600px] w-full";
                            // the div contains the span and label and input
                            let mediumDiv = document.createElement("div");
                            mediumDiv.className = "p-2 flex-grow";
                            // the name of the category
                            let spanInsideMediumDiv = document.createElement("span")
                            spanInsideMediumDiv.className = "cursor-default";
                            spanInsideMediumDiv.innerHTML = `${task.category}`;
                            // contains the input and label
                            let smallDiv = document.createElement("div");
                            smallDiv.className = "flex items-center";
                            // input checkbox
                            let checkBox = document.createElement("input");
                            checkBox.type = "checkbox";
                            checkBox.id = `${task.id}`;
                            checkBox.className = "h-[2rem] w-[2rem] accent-black";
                            // label for the task
                            let taskText = document.createElement("label");
                            taskText.setAttribute("for", `${task.id}`);
                            taskText.className = "ml-2 py-3 w-full font-semibold text-xl"
                            taskText.innerHTML = `${task.description}`;
                            // Delete Button
                            let deleteButton = document.createElement("i")
                            deleteButton.className = "fas fa-times text-2xl cursor-pointer pt-[20px] ml-auto pt-4 text-gray-800 hover:text-black";
                            deleteButton.id = `${task.id}-delete`;
                            // Edit Button
                            let editButton = document.createElement("i");
                            editButton.className = "fas fa-edit ml-5 pt-4 cursor-pointer text-gray-800 hover:text-black text-2xl";
                            editButton.id = `${task.id}-edit`
                            section.prepend(h2);
                            section.append(veryBigDiv);
                            veryBigDiv.append(bigDiv)
                            bigDiv.append(mediumDiv)
                            mediumDiv.append(spanInsideMediumDiv);
                            mediumDiv.append(smallDiv)
                            smallDiv.append(checkBox)
                            smallDiv.append(taskText)
                            bigDiv.append(deleteButton)
                            bigDiv.append(editButton)
                            main.append(section)
                        }
                    }
                })
            }
            catch (err) {
                console.log(err)
            }
        } else {
            try {
                fetch(`https://task-manager-api-fgcs.onrender.com/api/v1/users/${id}/tasks?category=${li.innerHTML}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(async (data) => {

                    location.hash = `#${li.innerHTML}`
                    h2.innerHTML = `${li.innerHTML}`;
                    let userData = await data.json();
                    let tasks = userData.data.docs;

                    if (tasks.length === 0) {
                        section.innerHTML = "No Tasks Found.";
                        section.className = "text-center font-semibold mx-auto w-fit text-2xl mt-10";
                        main.append(section)

                    } else {
                        section.innerHTML = '';
                        section.className = '';
                        h2.innerHTML = '';
                        h2.className = '';
                        veryBigDiv.innerHTML = '';
                        for (let task of tasks) {
                            // the div after the very big div contains all the task items
                            let bigDiv = document.createElement("div");
                            bigDiv.className = "flex items-center mx-auto bg-white px-3 shadow-md sm:w-[600px] w-full";
                            // the div contains the span and label and input
                            let mediumDiv = document.createElement("div");
                            mediumDiv.className = "p-2 flex-grow";
                            // the name of the category
                            let spanInsideMediumDiv = document.createElement("span")
                            spanInsideMediumDiv.className = "cursor-default";
                            spanInsideMediumDiv.innerHTML = `${task.category}`;
                            // contains the input and label
                            let smallDiv = document.createElement("div");
                            smallDiv.className = "flex items-center";
                            // input checkbox
                            let checkBox = document.createElement("input");
                            checkBox.type = "checkbox";
                            checkBox.id = `${task.id}`;
                            checkBox.className = "h-[2rem] w-[2rem] accent-black";
                            // label for the task
                            let taskText = document.createElement("label");
                            taskText.setAttribute("for", `${task.id}`);
                            taskText.className = "ml-2 py-3 w-full font-semibold text-xl"
                            taskText.innerHTML = `${task.description}`;
                            // Delete Button
                            let deleteButton = document.createElement("i")
                            deleteButton.className = "fas fa-times text-2xl cursor-pointer pt-[20px] ml-auto pt-4 text-gray-800 hover:text-black";
                            deleteButton.id = `${task.id}-delete`;
                            // Edit Button
                            let editButton = document.createElement("i");
                            editButton.className = "fas fa-edit ml-5 pt-4 cursor-pointer text-gray-800 hover:text-black text-2xl";
                            editButton.id = `${task.id}-edit`
                            section.prepend(h2);
                            section.append(veryBigDiv);
                            veryBigDiv.append(bigDiv)
                            bigDiv.append(mediumDiv)
                            mediumDiv.append(spanInsideMediumDiv);
                            mediumDiv.append(smallDiv)
                            smallDiv.append(checkBox)
                            smallDiv.append(taskText)
                            bigDiv.append(deleteButton)
                            bigDiv.append(editButton)
                            main.append(section)
                        }
                    }
                })
            }
            catch (err) {
                console.log(err)
            }
        }
    })
}


