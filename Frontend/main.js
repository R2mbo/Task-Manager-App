window.addEventListener("load", function () {
    if (this.localStorage.getItem('token')) {
        this.location.href = './src/pages/tasker/tasker.html'
    }
})