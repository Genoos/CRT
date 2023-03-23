function PostData() {
    data = {}
    var user_data = localStorage.getItem("user_data")
    user_data = JSON.parse(user_data)
    data._id = user_data._id
    /**
     * Ajax code here
     */
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/user/cars",
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (result) {
            $(".your-cars").empty()
            console.log(result)
            if (result.errno != undefined) {
                alert("Invalid User")
            } else {
                // location.href = "login.html"
                for (const car of result) {
                    $(".your-cars").append(`
                        <div class="m-4">
                            <p>Car Number: </p>
                            <p>${car.car_no}</p>
                        </div>
                    `)
                }
            }
        }
    })
}

function onLoad() {
    var user_data = localStorage.getItem("user_data")
    if (!user_data) {
        location.href = "login.html"
        return
    }
    PostData()
}

$(document).ready(function () {
    onLoad()
    window.onload = onLoad()
    window.blur = onLoad()
})
