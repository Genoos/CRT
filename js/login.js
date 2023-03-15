

function fetchData(data) {
    console.log(data)
    /**
     * Ajax code here
     */
    localStorage.setItem("username", data["username"])
    location.href = "home.html"
}


function submit() {
    const form = document.forms['login-form']
    const formData = new FormData(form)
    var data = {}
    for (const [k, v] of formData.entries()) {
        data[k] = v
    }
    /**
     * validate here 
     */ 
    fetchData(data)
}


const button = document.querySelector("#submitlogin")

button.addEventListener('click', submit) 

window.onload = () => localStorage.clear()
