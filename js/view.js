var promocode = "abc123"
var promostatus = ""
var price_per_hour = 100
var price_per_day = 1600
var price = $("#price").text();

function getDate() {
    let today = new Date();
    return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
}

//Validation for date
var today = new Date().toISOString().split('T')[0];
$("#start_date").attr('min', today);
$("#end_date").attr('min', today);
today = new Date();
var maxDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()).toISOString().split('T')[0];
$("#start_date").attr('max', maxDate);
$("#end_date").attr('max', maxDate);
$("#start_date").attr('value', getDate());
$("#end_date").attr('value', getDate());


//Setting the price
$("#entercode").prop('disabled', true);

function generatePrice() {
    var start_date = new Date($("#start_date").val())
    var start_time = $("#start_time").val()
    var end_date = new Date($("#end_date").val())
    var end_time = $("#end_time").val()
    //validation
    if (start_date == "Invalid Date" || start_time == '' || end_date == 'Invalid Date' || end_time == '') {
        $('#errorStatus').empty();
        $('#errorStatus').append('<small class="data-invalid" style="color: rgb(199, 35, 35);">Please enter all fileds</small>')
        return
    }
    //combining into single object
    const start_data_time = new Date(`${start_date.toDateString()} ${start_time}`)
    const end_data_time = new Date(`${end_date.toDateString()} ${end_time}`)
    //difference in milliseconds
    let diffMs = start_data_time - end_data_time
    //convert the difference to hours
    let diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    //console.log(diffHours)
    if (diffHours <= -1) {
        diffHours = Math.abs(diffHours)
        const no_of_days = Math.floor(diffHours / 24)
        const no_of_hours = diffHours % 24
        const final_cost = (no_of_days * price_per_day) + (no_of_hours * price_per_hour)
        if (promostatus == "applied") {
            let price_change = final_cost - Math.ceil((final_cost * 50) / 100)
            $("#price").text("₹" + price_change);
            price = "₹" + price_change
        } else {
            $("#price").text("₹" + final_cost);
            price = "₹" + final_cost
        }
        $("#entercode").prop('disabled', false);
        $('#errorStatus').empty();
    } else {
        $('#errorStatus').empty();
        $('#errorStatus').append('<small class="date-invalid" style="color: rgb(199, 35, 35);">Invalid Date or Time</small>')
        $("#price").text("₹" + "--");
    }
}

$("#start_date").change(generatePrice);
$("#end_date").change(generatePrice);
$("#start_time").change(generatePrice);
$("#end_time").change(generatePrice);

// apply the discount
$("#button-addon2").click(function () {
    if (($("#entercode").prop("disabled") && $('#button-addon2').text() == 'Apply') || ($('#price').text() == "₹" + "--")) {
        return
    }
    if (promostatus == "") {
        var enteredPromocode = $("#entercode").val()
        if (promocode == enteredPromocode) {
            let actual_price = price;
            actual_price = actual_price.substring(1)
            actual_price = parseInt(actual_price)
            let discount_price = actual_price - Math.ceil((actual_price * 50) / 100)
            $("#price").text("₹" + discount_price)
            promostatus = "applied"
            promocode = ""
            //Change the button to remove promo
            $('#button-addon2').css({
                'background-color': 'rgb(199, 35, 35)',
            });
            $("#button-addon2").text("Remove")
            //promo status
            $('#promocodestatus').empty();
            $("#promocodestatus").append('<small class="promo-valid" style="color:#7AB730;">Promo Sucessfully Applied</small>')
            $("#entercode").prop('disabled', true);
        } else {
            $('#promocodestatus').empty();
            $("#promocodestatus").append('<small class="promo-invalid" style="color: rgb(199, 35, 35);">Promo invalid</small>')
        }
    } else {
        $("#entercode").prop('disabled', false);
        $("#entercode").val(null)
        $("#price").text(price);
        $('#button-addon2').css({
            'background-color': '#7AB730',
        });
        $("#button-addon2").text("Apply")
        promocode = "abc123"
        promostatus = ""
        $('#promocodestatus').empty();
        $("#promocodestatus").append('<small class="promo-invalid" style="color: #7AB730;">Promo Removed</small>')
        $("#priceGenerator").click()
    }
})

console.log(localStorage.getItem("car_no"))

function onLoad({ car_no }) {
    /**
     * Ajax code here
     */
    let data = {
        car_no: car_no
    }
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/car/view",
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (result) {
            if (result.errno != undefined) {
                alert("No cars avaliable")
            } else {
                console.log(result)
                $("#car-picture").attr("src", result.car_picture)
                price_per_hour = result.price_per_hour
                price_per_day = result.price_per_day
                localStorage.setItem("car", JSON.stringify(result))
            }
        }
    })
}

onLoad({ car_no: localStorage.getItem("car_no") })

function bookCar({car_no, email, from_date, from_time, to_date, to_time }) {
    /**
     * Ajax code here
     */
    let data = {
        car_no: car_no,
        email: email,
        from_date: from_date,
        from_time: from_time,
        to_date: to_date,
        to_time: to_time
    }
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/user/bookcar",
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (result) {
            console.log(result)
            if (result.errno != undefined) {
                alert("cars not avaliable")
            } else {
                console.log("result")
            }
        }
    })
}

function submit() {
    const form = document.forms['time-form']
    const formData = new FormData(form)
    var data = {}
    for (const [k, v] of formData.entries()) {
        data[k] = v
    }
    console.log(data)
    /**
     * validate here 
     */
    data.price = $('#price').text()
    data.price = data.price.slice(1)
    data.car_no = localStorage.getItem("car_no")
    let user_data = localStorage.getItem("user_data")
    user_data = JSON.parse(user_data)
    data.email = user_data.email
    for (const [k, v] of Object.entries(data)) {
        if (v == "") {
            window.alert("please fill " + k + " field")
            return
        }
    }
    console.log(data)
    bookCar(data)
}
