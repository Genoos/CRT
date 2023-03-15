
const login_logout = document.querySelector('#login-logout')

const username = document.querySelector('#user-name')
const nusername = document.querySelector('#n-user-name')

function onLoad() {
    
    var new_loc = localStorage.getItem('location')
    let user_loc = document.getElementById("user_location")
    console.log(new_loc, user_loc)
    if (new_loc == null) {
        user_loc.innerText = "Select Location"
    } else {
        user_loc.innerText = new_loc
    }

    let name = localStorage.getItem("username")
    if (!name) {
        return
    }
    username.innerText = name
    nusername.innerText = name
    login_logout.innerText = "Logout"

}


window.onload = onLoad
window.onblur = onLoad
