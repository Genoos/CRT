
$(document).ready(function () {
    function onLoad() {
        var new_loc = localStorage.getItem('location')
        var name = localStorage.getItem("username")
        $("#user_location").text(new_loc ? new_loc : "Select Location")
        if (!name) {
            return
        }
        $("#user-name").text(name)
        $("#n-user-name").text(name)
        $("#login-logout").text("Logout")
    }
    window.onload = onLoad()
    window.blur = onLoad()
    $("#login-logout").click(function () {
        localStorage.clear()
        location.href = "home.html"
    })
})

