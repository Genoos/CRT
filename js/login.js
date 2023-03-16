

function fetchData(data) {
    console.log(data)
    /**
     * Ajax code here
     */
    for (const [k, v] of Object.entries(data)) {
        if (v == "") {
            window.alert("please fill " + k + " field")
            return
        }
    }
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

localStorage.clear()

window.onload = () => localStorage.clear()
window.onblur = () => localStorage.clear()
