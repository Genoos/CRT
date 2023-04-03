

function PostData(data) {
    console.log(data)
    for (const [k, v] of Object.entries(data)) {
        if (v == "") {
            window.alert("please fill " + k + " field")
            return
        }
    }
    /**
     * Ajax code here
     */
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/user/register",
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (result) {
            console.log(result)
            if (result.errno != undefined) {
                alert("Not Registered")
            } else {
                //location.href = "login.html"
            }
        }
    })
}


function submit() {
    const form = document.forms['register-form']
    const formData = new FormData(form)
    var data = {}
    for (const [k, v] of formData.entries()) {
        data[k] = v
    }
    /**
     * validate here 
     */
    PostData(data)
}


const button = document.querySelector("#submitRegister")

button.addEventListener('click', submit)

window.onload = () => localStorage.clear()
