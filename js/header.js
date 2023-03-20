
$(document).ready(function () {
    function onLoad() {
        var new_loc = localStorage.getItem('location')
        $("#user_location").text(new_loc ? new_loc : "Select Location")
        var user_data = localStorage.getItem("user_data")
        if (!user_data) {
            return
        }
        user_data = JSON.parse(user_data)
        $("#user-name").text(user_data.name)
        $("#n-user-name").text(user_data.name)
        $("#login-logout").text("Logout")
    }
    window.onload = onLoad()
    window.blur = onLoad()
    $("#login-logout").click(function () {
        localStorage.clear()
        location.href = "home.html"
    })
})

