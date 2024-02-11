window.addEventListener("load", () => {
    if (localStorage.getItem("token")) {
        location.href = "../tasker/tasker.html"
    }
})