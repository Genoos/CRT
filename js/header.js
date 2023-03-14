
const login_logout = document.querySelector('#login-logout')

const username = document.querySelector('#user-name')
const nusername = document.querySelector('#n-user-name')

function onLoad() {
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
