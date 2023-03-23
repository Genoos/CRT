function view(car_no) {
    localStorage.setItem("car_no", car_no)
    location.href = "view.html"
}

function onLoad({ latitude, longitude, kms }) {
    /**
     * Ajax code here
     */
    let data = {
        latitude: latitude,
        longitude: longitude,
        kms: kms
    }
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/car/nearby",
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (result) {
            if (result.errno != undefined) {
                alert("No cars avaliable")
            } else {
                console.log(result)
                $("#6-seater").empty()
                $("#4-seater").empty()
                $("#2-seater").empty()
                for (const car of result) {
                    $(`#${car.seater_type}-seater`).append(`
                        <div class="row m-1">
                            <div class="col-3">
                                <img src="${car.car_picture}" alt="picture of ${car.company} ${car.model}" class="w-100" />
                            </div>
                            <div class="col-9">
                                <div style="display: flex; justify-content: space-around">
                                    <div style="display: flex; flex-direction: column; justify-content: center; height: 260px">
                                        <h5>Car No: ${car.car_no}</h5>
                                        <h5>Company: ${car.company}</h5>
                                        <h5>Model: ${car.model}</h5>
                                        <h5>Daily Price: ${car.price_per_day}</h5>
                                    </div>
                                    <div style="display: flex; flex-direction: column; justify-content: center; height: 260px">
                                        <h5><button onclick="view('${car.car_no}')" class="btn btn-primary">View</button></h5>
                                        <h5>Hourly Price: ${car.price_per_hour}</h5>
                                        <h5>Manifactured in: ${car.manifactured_year}</h5>
                                        <h5>Distance Driven: ${car.driven_distance}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)
                }
            }
        }
    })
}

function loadCars(value) {
    $('#display-km').text(value)
    navigator.geolocation
        .getCurrentPosition(function (data) {
            data.coords.kms = +value
            onLoad(data.coords)
        });
}

$(document).ready(function () {
    loadCars(5)
})
